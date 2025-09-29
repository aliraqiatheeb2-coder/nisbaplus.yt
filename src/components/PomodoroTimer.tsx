import { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Play, Pause, RotateCcw, Volume2, Settings } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';

type SessionType = 'work' | 'shortBreak' | 'longBreak';

export function PomodoroTimer() {
  const { t, pomodoroTime, setPomodoroTime, pomodoroSound, setPomodoroSound, soundVolume, setSoundVolume, autoBreak, language } = useApp();
  
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(pomodoroTime * 60);
  const [sessionType, setSessionType] = useState<SessionType>('work');
  const [completedSessions, setCompletedSessions] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Sound effects mapping with localized names
  const soundOptions = {
    forest: {
      ar: 'غابة',
      en: 'Forest',
      url: '/sounds/forest.mp3'
    },
    rain: {
      ar: 'مطر', 
      en: 'Rain',
      url: '/sounds/rain.mp3'
    },
    jazz: {
      ar: 'جاز',
      en: 'Jazz', 
      url: '/sounds/jazz.mp3'
    },
    cafe: {
      ar: 'مقهى',
      en: 'Café',
      url: '/sounds/cafe.mp3'
    }
  };

  // Initialize and play audio
  const playAudio = () => {
    try {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      
      const selectedSound = soundOptions[pomodoroSound as keyof typeof soundOptions];
      if (selectedSound) {
        audioRef.current = new Audio(selectedSound.url);
        audioRef.current.loop = true;
        audioRef.current.volume = soundVolume / 100;
        audioRef.current.preload = 'auto';
        
        // Ensure high quality audio settings
        audioRef.current.crossOrigin = 'anonymous';
        
        // Handle audio events for better quality
        audioRef.current.addEventListener('canplaythrough', () => {
          console.log('Audio ready for high-quality playback');
        });
        
        audioRef.current.addEventListener('error', (e) => {
          console.error('Audio error:', e);
        });
        
        // Use more reliable play method with user interaction check
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              console.log('Audio playback started successfully');
            })
            .catch(error => {
              console.log('Audio play failed (user interaction may be required):', error);
              // Fallback: Try to enable audio on next user interaction
              document.addEventListener('click', () => {
                if (audioRef.current && isRunning) {
                  audioRef.current.play().catch(e => console.log('Retry failed:', e));
                }
              }, { once: true });
            });
        }
      }
    } catch (error) {
      console.log('Audio initialization failed:', error);
    }
  };

  // Stop audio
  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  // Update audio volume when volume setting changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = soundVolume / 100;
    }
  }, [soundVolume]);

  // Update audio when sound selection changes
  useEffect(() => {
    if (isRunning) {
      stopAudio();
      playAudio();
    }
  }, [pomodoroSound]);

  // Cleanup audio on component unmount
  useEffect(() => {
    return () => {
      stopAudio();
    };
  }, []);

  // Reset timer when pomodoro time changes
  useEffect(() => {
    if (!isRunning) {
      setTimeLeft(getSessionDuration(sessionType) * 60);
    }
  }, [pomodoroTime, sessionType, isRunning]);

  // Timer logic
  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleSessionComplete();
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeLeft]);

  const getSessionDuration = (type: SessionType): number => {
    switch (type) {
      case 'work': return pomodoroTime;
      case 'shortBreak': return Math.round(pomodoroTime * 0.2); // 20% of work time
      case 'longBreak': return Math.round(pomodoroTime * 0.6); // 60% of work time
      default: return pomodoroTime;
    }
  };

  const handleSessionComplete = () => {
    setIsRunning(false);
    stopAudio();
    playNotificationSound();
    
    if (sessionType === 'work') {
      setCompletedSessions(prev => prev + 1);
      // After 4 work sessions, take long break
      const nextSession = (completedSessions + 1) % 4 === 0 ? 'longBreak' : 'shortBreak';
      setSessionType(nextSession);
      
      // Auto-start break if setting is enabled
      if (autoBreak) {
        setTimeout(() => {
          setTimeLeft(getSessionDuration(nextSession) * 60);
          setIsRunning(true);
          playAudio();
        }, 1000);
      }
    } else {
      setSessionType('work');
      // Auto-start work session if setting is enabled
      if (autoBreak) {
        setTimeout(() => {
          setTimeLeft(getSessionDuration('work') * 60);
          setIsRunning(true);
          playAudio();
        }, 1000);
      }
    }
    
    if (!autoBreak) {
      setTimeLeft(getSessionDuration(sessionType === 'work' ? 'shortBreak' : 'work') * 60);
    }
  };

  const playNotificationSound = () => {
    // In a real app, you would have actual sound files
    // For now, we'll use the Web Audio API to create a simple beep
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(soundVolume / 100, audioContext.currentTime + 0.1);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 1);
  };

  const toggleTimer = () => {
    if (!isRunning) {
      // Starting timer
      setIsRunning(true);
      playAudio();
    } else {
      // Pausing timer
      setIsRunning(false);
      stopAudio();
    }
  };

  const resetTimer = () => {
    setIsRunning(false);
    stopAudio();
    setTimeLeft(getSessionDuration(sessionType) * 60);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getSessionTitle = () => {
    switch (sessionType) {
      case 'work': return t('work_session');
      case 'shortBreak': return t('short_break');
      case 'longBreak': return t('long_break');
      default: return t('work_session');
    }
  };

  const getSessionColor = () => {
    switch (sessionType) {
      case 'work': return 'from-primary to-primary-glow';
      case 'shortBreak': return 'from-success to-success/80';
      case 'longBreak': return 'from-accent to-accent/80';
      default: return 'from-primary to-primary-glow';
    }
  };

  const totalSeconds = getSessionDuration(sessionType) * 60;
  const progress = ((totalSeconds - timeLeft) / totalSeconds) * 100;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Main Timer Card */}
      <Card className="habit-card p-8 text-center">
        <div className="space-y-6">
          {/* Session Info */}
          <div className="space-y-2">
            <Badge variant="secondary" className="text-lg px-4 py-2">
              {getSessionTitle()}
            </Badge>
            <div className="flex items-center justify-center gap-4">
              <div className="text-sm text-muted-foreground">
                {t('completed')}: {completedSessions}
              </div>
              <div className="text-sm text-muted-foreground">
                {Math.floor(completedSessions / 4)} {t('long_break')}s
              </div>
            </div>
          </div>

          {/* Timer Display */}
          <div className="space-y-4">
            <div className={`w-40 h-40 mx-auto rounded-2xl bg-gradient-to-br ${getSessionColor()} flex items-center justify-center shadow-[var(--shadow-strong)]`}>
              <div className="text-5xl font-bold text-white">
                {formatTime(timeLeft)}
              </div>
            </div>
            
            <Progress value={progress} className="w-full max-w-md mx-auto h-2" />
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4">
            <Button
              onClick={toggleTimer}
              size="lg"
              className="gap-2 px-8"
              variant={isRunning ? "secondary" : "default"}
            >
              {isRunning ? <Pause size={20} /> : <Play size={20} />}
              {isRunning ? t('pause') : t('start')}
            </Button>
            
            <Button onClick={resetTimer} variant="outline" size="lg" className="gap-2">
              <RotateCcw size={20} />
              {t('reset')}
            </Button>
          </div>
        </div>
      </Card>

      {/* Settings Card */}
      <Card className="habit-card p-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">{t('pomodoro_settings')}</h3>
            <Button 
              variant="outline"
              onClick={() => setShowSettings(!showSettings)}
              className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20 hover:from-primary/20 hover:to-accent/20 transition-all duration-300"
            >
              <Settings className="w-4 h-4 mr-2" />
              {showSettings ? t('cancel') : (
                <span className="font-medium bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Settings
                </span>
              )}
            </Button>
          </div>

          {showSettings && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Work Duration */}
              <div className="space-y-3">
                <label className="text-sm font-medium">{t('work_duration')}</label>
                <div className="space-y-2">
                  <Slider
                    value={[pomodoroTime]}
                    onValueChange={(value) => setPomodoroTime(value[0])}
                    max={60}
                    min={5}
                    step={5}
                    className="w-full"
                  />
                  <div className="text-sm text-muted-foreground text-center">
                    {pomodoroTime} {language === 'ar' ? 'دقيقة' : 'minutes'}
                  </div>
                </div>
              </div>

              {/* Sound Selection */}
              <div className="space-y-3">
                <label className="text-sm font-medium">{t('sound_effects')}</label>
                <div className="flex gap-2">
                  <Select value={pomodoroSound} onValueChange={setPomodoroSound}>
                    <SelectTrigger className="flex-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(soundOptions).map(([key, sound]) => (
                        <SelectItem key={key} value={key}>
                          {sound[language]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      // Preview sound for 3 seconds
                      const testAudio = new Audio(soundOptions[pomodoroSound as keyof typeof soundOptions].url);
                      testAudio.volume = soundVolume / 100;
                      testAudio.play().catch(e => console.log('Test audio failed:', e));
                      setTimeout(() => {
                        testAudio.pause();
                        testAudio.currentTime = 0;
                      }, 3000);
                    }}
                  >
                    {language === 'ar' ? 'تجربة' : 'Test'}
                  </Button>
                </div>
              </div>

              {/* Volume Control */}
              <div className="space-y-3 md:col-span-2">
                <div className="flex items-center gap-2">
                  <Volume2 size={16} />
                  <label className="text-sm font-medium">{t('volume')}</label>
                </div>
                <div className="space-y-2">
                  <Slider
                    value={[soundVolume]}
                    onValueChange={(value) => setSoundVolume(value[0])}
                    max={100}
                    min={0}
                    step={5}
                    className="w-full"
                  />
                  <div className="text-sm text-muted-foreground text-center">
                    {soundVolume}%
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Quick Session Buttons */}
      <div className="grid grid-cols-3 gap-4">
        {(['work', 'shortBreak', 'longBreak'] as SessionType[]).map((type) => (
          <Button
            key={type}
            variant={sessionType === type ? "default" : "outline"}
            onClick={() => {
              setSessionType(type);
              setTimeLeft(getSessionDuration(type) * 60);
              setIsRunning(false);
            }}
            className="p-4 h-auto flex-col gap-2"
          >
            <div className="font-medium">
              {type === 'work' && t('focus_time')}
              {type === 'shortBreak' && t('short_break')}
              {type === 'longBreak' && t('long_break')}
            </div>
            <div className="text-sm text-muted-foreground">
              {getSessionDuration(type)} {language === 'ar' ? 'دقيقة' : 'min'}
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
}