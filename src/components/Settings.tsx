import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { 
  Settings as SettingsIcon, 
  Globe, 
  Moon, 
  Sun, 
  Timer, 
  Volume2, 
  Mail, 
  ExternalLink,
  Palette,
  Languages
} from 'lucide-react';
import { useApp } from '@/contexts/AppContext';

export function Settings() {
  const { 
    t, 
    language, 
    setLanguage, 
    theme, 
    setTheme, 
    pomodoroTime, 
    setPomodoroTime,
    pomodoroSound,
    setPomodoroSound,
    soundVolume,
    setSoundVolume,
    autoBreak,
    setAutoBreak,
    uiSoundsEnabled,
    setUiSoundsEnabled,
    uiSoundVolume,
    setUiSoundVolume,
    playButtonClickSound
  } = useApp();

  const soundOptions = {
    forest: { ar: 'غابة', en: 'Forest' },
    rain: { ar: 'مطر', en: 'Rain' },
    jazz: { ar: 'جاز', en: 'Jazz' },
    cafe: { ar: 'مقهى', en: 'Café' }
  };

  const handleSupportEmail = () => {
    const subject = language === 'ar' 
      ? 'طلب دعم تطبيق Nisba+'
      : 'Nisba+ App Support Request';
    
    const body = language === 'ar'
      ? 'مرحباً،\n\nأحتاج المساعدة في...\n\nشكراً لكم'
      : 'Hello,\n\nI need help with...\n\nThank you';
    
    const mailtoLink = `mailto:gymbro24@hotmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    try {
      // Try to open email client
      window.location.href = mailtoLink;
    } catch (error) {
      // Fallback: copy email to clipboard
      navigator.clipboard.writeText('gymbro24@hotmail.com').then(() => {
        alert(language === 'ar' 
          ? 'تم نسخ البريد الإلكتروني للحافظة: gymbro24@hotmail.com'
          : 'Email copied to clipboard: gymbro24@hotmail.com'
        );
      }).catch(() => {
        alert(language === 'ar'
          ? 'البريد الإلكتروني للدعم: gymbro24@hotmail.com'
          : 'Support email: gymbro24@hotmail.com'
        );
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 rounded-2xl bg-gradient-to-br from-primary to-primary-glow text-white">
          <SettingsIcon size={24} />
        </div>
        <div>
          <h1 className="text-3xl font-bold">{t('settings')}</h1>
          <p className="text-muted-foreground">
            {language === 'ar' ? 'خصص تجربتك في التطبيق' : 'Customize your app experience'}
          </p>
        </div>
      </div>

      {/* General Settings */}
      <Card className="habit-card p-6">
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <SettingsIcon size={20} />
            <h2 className="text-xl font-semibold">{t('general_settings')}</h2>
          </div>
          
          <Separator />
          
          <div className="space-y-6">
            {/* Language Setting */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-accent to-accent/80 text-accent-foreground">
                  <Languages size={16} />
                </div>
                <div>
                  <p className="font-medium">{t('language_setting')}</p>
                  <p className="text-sm text-muted-foreground">
                    {language === 'ar' ? 'اختر لغة التطبيق' : 'Choose app language'}
                  </p>
                </div>
              </div>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ar">العربية</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Theme Setting */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-warning to-warning/80 text-white">
                  <Palette size={16} />
                </div>
                <div>
                  <p className="font-medium">{t('appearance')}</p>
                  <p className="text-sm text-muted-foreground">
                    {language === 'ar' ? 'اختر سمة التطبيق' : 'Choose app theme'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Sun size={16} className={theme === 'light' ? 'text-warning' : 'text-muted-foreground'} />
                <Switch
                  checked={theme === 'dark'}
                  onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
                />
                <Moon size={16} className={theme === 'dark' ? 'text-primary' : 'text-muted-foreground'} />
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Pomodoro Settings */}
      <Card className="habit-card p-6">
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Timer size={20} />
            <h2 className="text-xl font-semibold">{t('pomodoro_settings')}</h2>
          </div>
          
          <Separator />
          
          <div className="space-y-6">
            {/* Work Duration */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{t('work_duration')}</p>
                  <p className="text-sm text-muted-foreground">
                    {language === 'ar' ? 'مدة جلسة العمل بالدقائق' : 'Work session duration in minutes'}
                  </p>
                </div>
                <Badge variant="secondary" className="text-lg px-3 py-1">
                  {pomodoroTime} {language === 'ar' ? 'د' : 'min'}
                </Badge>
              </div>
              <Slider
                value={[pomodoroTime]}
                onValueChange={(value) => setPomodoroTime(value[0])}
                max={60}
                min={5}
                step={5}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>5 {language === 'ar' ? 'دقائق' : 'min'}</span>
                <span>60 {language === 'ar' ? 'دقيقة' : 'min'}</span>
              </div>
            </div>

            {/* Sound Effects */}
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{t('sound_effects')}</p>
                <p className="text-sm text-muted-foreground">
                  {language === 'ar' ? 'اختر صوت الإشعارات' : 'Choose notification sound'}
                </p>
              </div>
              <div className="flex gap-2">
                <Select value={pomodoroSound} onValueChange={setPomodoroSound}>
                  <SelectTrigger className="w-32">
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
                    const testAudio = new Audio(`/sounds/${pomodoroSound}.mp3`);
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
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Volume2 size={16} />
                  <div>
                    <p className="font-medium">{t('volume')}</p>
                    <p className="text-sm text-muted-foreground">
                      {language === 'ar' ? 'مستوى صوت الإشعارات' : 'Notification volume level'}
                    </p>
                  </div>
                </div>
                <Badge variant="secondary" className="px-3 py-1">
                  {soundVolume}%
                </Badge>
              </div>
              <Slider
                value={[soundVolume]}
                onValueChange={(value) => setSoundVolume(value[0])}
                max={100}
                min={0}
                step={5}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0%</span>
                <span>100%</span>
              </div>
            </div>

            {/* UI Sounds Toggle */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Volume2 size={16} />
                <div>
                  <p className="font-medium">{t('ui_sounds')}</p>
                  <p className="text-sm text-muted-foreground">
                    {language === 'ar' ? 'أصوات اللمس والتنقل' : 'Touch and navigation sounds'}
                  </p>
                </div>
              </div>
              <Switch
                checked={uiSoundsEnabled}
                onCheckedChange={(checked) => {
                  setUiSoundsEnabled(checked);
                  if (checked) playButtonClickSound();
                }}
              />
            </div>

            {/* UI Sound Volume */}
            {uiSoundsEnabled && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 pl-6">
                    <div>
                      <p className="font-medium text-sm">{t('ui_sound_volume')}</p>
                      <p className="text-xs text-muted-foreground">
                        {language === 'ar' ? 'مستوى أصوات الواجهة' : 'Interface sound volume'}
                      </p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="px-3 py-1">
                    {uiSoundVolume}%
                  </Badge>
                </div>
                <div className="pl-6">
                  <Slider
                    value={[uiSoundVolume]}
                    onValueChange={(value) => setUiSoundVolume(value[0])}
                    max={100}
                    min={0}
                    step={5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>0%</span>
                    <span>100%</span>
                  </div>
                </div>
              </div>
            )}

            {/* Auto Break */}
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">
                  {language === 'ar' ? 'الاستراحة التلقائية' : 'Auto Break'}
                </p>
                <p className="text-sm text-muted-foreground">
                  {language === 'ar' 
                    ? 'بدء الاستراحة تلقائياً عند انتهاء جلسة العمل'
                    : 'Automatically start break when work session ends'
                  }
                </p>
              </div>
              <Switch
                checked={autoBreak}
                onCheckedChange={setAutoBreak}
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Support */}
      <Card className="habit-card p-6">
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Mail size={20} />
            <h2 className="text-xl font-semibold">{t('support')}</h2>
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <div>
              <p className="font-medium mb-2">{t('contact_support')}</p>
              <p className="text-sm text-muted-foreground mb-4">
                {language === 'ar' 
                  ? 'هل تحتاج مساعدة؟ تواصل معنا عبر البريد الإلكتروني'
                  : 'Need help? Contact us via email'
                }
              </p>
              
              <Button 
                onClick={handleSupportEmail}
                variant="outline" 
                className="gap-2 w-full sm:w-auto"
              >
                <Mail size={16} />
                gymbro24@hotmail.com
                <ExternalLink size={14} />
              </Button>
            </div>
            
            <div className="p-4 rounded-lg bg-muted/50 border-l-4 border-primary">
              <p className="text-sm">
                {language === 'ar' 
                  ? '💡 نصيحة: عند الكتابة، أذكر رقم إصدار التطبيق ووصف المشكلة بالتفصيل'
                  : '💡 Tip: When writing, mention the app version and describe the issue in detail'
                }
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* App Info */}
      <Card className="habit-card p-6">
        <div className="text-center space-y-4">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Nisba+</h3>
            <p className="text-sm text-muted-foreground">
              {language === 'ar' 
                ? 'تطبيق إدارة العادات والمهام - الإصدار 1.0.0'
                : 'Habit & Task Management App - Version 1.0.0'
              }
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}