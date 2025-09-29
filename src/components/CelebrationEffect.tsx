import { useState, useEffect } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Sparkles, Star, Heart, Trophy, Target } from 'lucide-react';

interface CelebrationEffectProps {
  show: boolean;
  onComplete?: () => void;
  type?: 'task' | 'habit' | 'achievement';
  message?: string;
}

export function CelebrationEffect({ show, onComplete, type = 'task', message }: CelebrationEffectProps) {
  const { language, playCelebrationSound } = useApp();
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number; duration: number }>>([]);
  
  const messages = {
    task: {
      ar: '🎉 أحسنت! تم إنجاز المهمة بنجاح',
      en: '🎉 Well Done! Task Completed Successfully'
    },
    habit: {
      ar: '⭐ رائع! عادة جديدة تم إنجازها',
      en: '⭐ Awesome! Habit Completed'
    },
    achievement: {
      ar: '🏆 تهانينا! إنجاز رائع',
      en: '🏆 Congratulations! Great Achievement'
    }
  };

  const icons = [
    <Sparkles key="sparkles" className="w-6 h-6" />,
    <Star key="star" className="w-6 h-6" />,
    <Heart key="heart" className="w-6 h-6" />,
    <Trophy key="trophy" className="w-6 h-6" />,
    <Target key="target" className="w-6 h-6" />
  ];

  useEffect(() => {
    if (show) {
      // Play celebration sound
      playCelebrationSound();
      
      // Generate floating particles
      const newParticles = Array.from({ length: 25 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 2,
        duration: 3 + Math.random() * 2
      }));
      setParticles(newParticles);

      // Auto close after 3.5 seconds
      const timer = setTimeout(() => {
        onComplete?.();
      }, 3500);

      return () => clearTimeout(timer);
    }
  }, [show, playCelebrationSound, onComplete]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute animate-bounce opacity-80"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`
            }}
          >
            <div className="text-yellow-400 animate-pulse">
              {icons[particle.id % icons.length]}
            </div>
          </div>
        ))}
      </div>

      {/* Celebration fireworks */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-4 h-4 rounded-full animate-ping"
            style={{
              left: `${20 + i * 10}%`,
              top: `${20 + (i % 3) * 20}%`,
              backgroundColor: ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8'][i],
              animationDelay: `${i * 0.2}s`,
              animationDuration: `${2 + i * 0.1}s`
            }}
          />
        ))}
      </div>

      {/* Main celebration card */}
      <div className="relative z-10">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-2xl border border-border/20 max-w-md mx-4 animate-in fade-in-0 zoom-in-95 duration-500">
          <div className="text-center space-y-6">
            {/* Animated icon */}
            <div className="relative">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-2xl animate-pulse">
                <div className="animate-bounce">
                  {type === 'task' && <Target className="w-10 h-10 text-white" />}
                  {type === 'habit' && <Star className="w-10 h-10 text-white" />}
                  {type === 'achievement' && <Trophy className="w-10 h-10 text-white" />}
                </div>
              </div>
              
              {/* Sparkle effects around icon */}
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-3 h-3 bg-yellow-400 rounded-full animate-ping"
                  style={{
                    top: `${20 + Math.sin(i * 60 * Math.PI / 180) * 40}%`,
                    left: `${50 + Math.cos(i * 60 * Math.PI / 180) * 40}%`,
                    animationDelay: `${i * 0.3}s`,
                    animationDuration: '1.5s'
                  }}
                />
              ))}
            </div>

            {/* Celebration message */}
            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-foreground animate-in slide-in-from-bottom-4 duration-700">
                {message || messages[type][language]}
              </h2>
              
              <p className="text-muted-foreground animate-in slide-in-from-bottom-4 duration-700 delay-200">
                {language === 'ar' 
                  ? 'استمر في التقدم نحو أهدافك!'
                  : 'Keep up the great progress!'
                }
              </p>
            </div>

            {/* Animated progress bar */}
            <div className="space-y-2 animate-in slide-in-from-bottom-4 duration-700 delay-400">
              <div className="flex justify-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <div 
                    key={i}
                    className="w-2 h-8 bg-gradient-to-t from-blue-400 to-purple-500 rounded-full animate-pulse"
                    style={{
                      animationDelay: `${i * 0.1}s`,
                      animationDuration: '1s'
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Motivational quote */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-800 animate-in slide-in-from-bottom-4 duration-700 delay-600">
              <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
                {language === 'ar' 
                  ? '✨ "كل إنجاز صغير يقربك من حلمك الكبير"'
                  : '✨ "Every small achievement brings you closer to your big dream"'
                }
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating hearts animation */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute text-red-400 animate-float opacity-70"
            style={{
              left: `${-30 + i * 10}px`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: '3s'
            }}
          >
            <Heart className="w-5 h-5 fill-current" />
          </div>
        ))}
      </div>
    </div>
  );
}