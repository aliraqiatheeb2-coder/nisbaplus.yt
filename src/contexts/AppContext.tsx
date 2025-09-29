import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { soundEffects } from '@/utils/soundEffects';

export type Language = 'ar' | 'en';
export type Theme = 'light' | 'dark';

interface HabitStats {
  totalCompletions: number;
  currentStreak: number;
  longestStreak: number;
  completionHistory: { [date: string]: number }; // date -> number of habits completed
  lastCompletionDate: string;
}

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  pomodoroTime: number;
  setPomodoroTime: (time: number) => void;
  pomodoroSound: string;
  setPomodoroSound: (sound: string) => void;
  soundVolume: number;
  setSoundVolume: (volume: number) => void;
  autoBreak: boolean;
  setAutoBreak: (autoBreak: boolean) => void;
  habitStats: HabitStats;
  updateHabitStats: (completed: boolean) => void;
  t: (key: string) => string;
  uiSoundsEnabled: boolean;
  setUiSoundsEnabled: (enabled: boolean) => void;
  uiSoundVolume: number;
  setUiSoundVolume: (volume: number) => void;
  playTaskCompleteSound: () => void;
  playHabitCompleteSound: () => void;
  playTabSwitchSound: () => void;
  playButtonClickSound: () => void;
  playNavigationSound: () => void;
  playCelebrationSound: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const translations = {
  ar: {
    // Navigation
    'habits': 'العادات',
    'tasks': 'المهام',
    'pomodoro': 'بومودورو',
    'settings': 'الإعدادات',
    'statistics': 'الإحصائيات',
    
    // Greetings
    'good_morning': 'صباح الخير',
    'good_afternoon': 'مساء الخير', 
    'good_evening': 'مساء الخير',
    'good_night': 'ليلة سعيدة',
    
    // Habits
    'daily_exercise': 'تمرين يومي',
    'exercise_desc': 'ممارسة الرياضة لمدة 30 دقيقة على الأقل',
    'read_book': 'قراءة كتاب',
    'read_desc': 'قراءة 20 صفحة على الأقل من كتاب مفيد',
    'drink_water': 'شرب الماء',
    'water_desc': 'شرب 8 أكواب من الماء يومياً',
    'sleep_early': 'نوم مبكر',
    'sleep_desc': 'النوم قبل الساعة 11 مساءً',
    'meditation': 'التأمل',
    'meditation_desc': 'ممارسة التأمل لمدة 10 دقائق',
    'review_goals': 'مراجعة الأهداف',
    'goals_desc': 'مراجعة وتخطيط أهداف اليوم التالي',
    
    // Stats
    'today': 'اليوم',
    'completed_habits': 'العادات المكتملة',
    'longest_streak': 'أطول سلسلة',
    'consecutive_days': 'يوم متتالي',
    'average': 'المتوسط',
    'average_days': 'متوسط الأيام',
    'completion_rate': 'معدل الإنجاز',
    'your_stats_today': 'إحصائياتك اليوم',
    'daily_habits': 'عاداتك اليومية',
    'add_new_habit': 'إضافة عادة جديدة',
    
    // Tasks
    'add_task': 'إضافة مهمة',
    'task_title': 'عنوان المهمة',
    'task_description': 'وصف المهمة',
    'priority': 'الأولوية',
    'high': 'عالية',
    'medium': 'متوسطة',
    'low': 'منخفضة',
    'due_date': 'تاريخ الاستحقاق',
    'create_task': 'إنشاء مهمة',
    'my_tasks': 'مهامي',
    'completed': 'مكتمل',
    'pending': 'معلق',
    'overdue': 'متأخر',
    
    // Pomodoro
    'work_session': 'جلسة عمل',
    'break_time': 'وقت الاستراحة',
    'start': 'بدء',
    'pause': 'إيقاف مؤقت',
    'reset': 'إعادة تعيين',
    'session_complete': 'انتهت الجلسة!',
    'break_complete': 'انتهت الاستراحة!',
    'focus_time': 'وقت التركيز',
    'short_break': 'استراحة قصيرة',
    'long_break': 'استراحة طويلة',
    
    // Settings
    'general_settings': 'الإعدادات العامة',
    'appearance': 'المظهر',
    'language_setting': 'اللغة',
    'theme_setting': 'السمة',
    'light_mode': 'الوضع النهاري',
    'dark_mode': 'الوضع الليلي',
    'pomodoro_settings': 'إعدادات البومودورو',
    'work_duration': 'مدة العمل (دقيقة)',
    'break_duration': 'مدة الاستراحة (دقيقة)',
    'sound_effects': 'المؤثرات الصوتية',
    'volume': 'مستوى الصوت',
    'ui_sounds': 'أصوات الواجهة',
    'ui_sound_volume': 'مستوى أصوات الواجهة',
    'enable_ui_sounds': 'تفعيل أصوات الواجهة',
    'forest': 'غابة',
    'birds': 'عصافير',
    'rain': 'مطر',
    'support': 'الدعم',
    'contact_support': 'تواصل مع الدعم',
    'support_email': 'البريد الإلكتروني للدعم',
    
    // Actions
    'save': 'حفظ',
    'cancel': 'إلغاء',
    'delete': 'حذف',
    'edit': 'تعديل',
    'complete': 'إكمال',
    'mark_complete': 'تعيين كمكتمل',
    'mark_incomplete': 'تعيين كغير مكتمل',
    
    // Quick Actions
    'break': 'استراحة',
    'social': 'اجتماعي',
    'learn': 'تعلم',
    'health': 'صحة'
  },
  en: {
    // Navigation
    'habits': 'Habits',
    'tasks': 'Tasks', 
    'pomodoro': 'Pomodoro',
    'settings': 'Settings',
    'statistics': 'Statistics',
    
    // Greetings
    'good_morning': 'Good Morning',
    'good_afternoon': 'Good Afternoon',
    'good_evening': 'Good Evening', 
    'good_night': 'Good Night',
    
    // Habits
    'daily_exercise': 'Daily Exercise',
    'exercise_desc': 'Exercise for at least 30 minutes',
    'read_book': 'Read Book',
    'read_desc': 'Read at least 20 pages of a useful book',
    'drink_water': 'Drink Water',
    'water_desc': 'Drink 8 glasses of water daily',
    'sleep_early': 'Sleep Early',
    'sleep_desc': 'Go to bed before 11 PM',
    'meditation': 'Meditation',
    'meditation_desc': 'Practice meditation for 10 minutes',
    'review_goals': 'Review Goals',
    'goals_desc': 'Review and plan goals for the next day',
    
    // Stats
    'today': 'Today',
    'completed_habits': 'Completed Habits',
    'longest_streak': 'Longest Streak',
    'consecutive_days': 'Consecutive Days',
    'average': 'Average',
    'average_days': 'Average Days',
    'completion_rate': 'Completion Rate',
    'your_stats_today': 'Your Stats Today',
    'daily_habits': 'Your Daily Habits',
    'add_new_habit': 'Add New Habit',
    
    // Tasks
    'add_task': 'Add Task',
    'task_title': 'Task Title',
    'task_description': 'Task Description',
    'priority': 'Priority',
    'high': 'High',
    'medium': 'Medium',
    'low': 'Low',
    'due_date': 'Due Date',
    'create_task': 'Create Task',
    'my_tasks': 'My Tasks',
    'completed': 'Completed',
    'pending': 'Pending',
    'overdue': 'Overdue',
    
    // Pomodoro
    'work_session': 'Work Session',
    'break_time': 'Break Time',
    'start': 'Start',
    'pause': 'Pause',
    'reset': 'Reset',
    'session_complete': 'Session Complete!',
    'break_complete': 'Break Complete!',
    'focus_time': 'Focus Time',
    'short_break': 'Short Break',
    'long_break': 'Long Break',
    
    // Settings
    'general_settings': 'General Settings',
    'appearance': 'Appearance',
    'language_setting': 'Language',
    'theme_setting': 'Theme',
    'light_mode': 'Light Mode',
    'dark_mode': 'Dark Mode',
    'pomodoro_settings': 'Pomodoro Settings',
    'work_duration': 'Work Duration (minutes)',
    'break_duration': 'Break Duration (minutes)',
    'sound_effects': 'Sound Effects',
    'volume': 'Volume',
    'ui_sounds': 'UI Sounds',
    'ui_sound_volume': 'UI Sound Volume',
    'enable_ui_sounds': 'Enable UI Sounds',
    'forest': 'Forest',
    'birds': 'Birds',
    'rain': 'Rain',
    'support': 'Support',
    'contact_support': 'Contact Support',
    'support_email': 'Support Email',
    
    // Actions
    'save': 'Save',
    'cancel': 'Cancel',
    'delete': 'Delete',
    'edit': 'Edit',
    'complete': 'Complete',
    'mark_complete': 'Mark Complete',
    'mark_incomplete': 'Mark Incomplete',
    
    // Quick Actions
    'break': 'Break',
    'social': 'Social',
    'learn': 'Learn',
    'health': 'Health'
  }
};

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const [language, setLanguage] = useState<Language>('ar');
  const [theme, setTheme] = useState<Theme>('light');
  const [pomodoroTime, setPomodoroTime] = useState(25);
  const [pomodoroSound, setPomodoroSound] = useState('forest');
  const [soundVolume, setSoundVolume] = useState(50);
  const [autoBreak, setAutoBreak] = useState(false);
  const [uiSoundsEnabled, setUiSoundsEnabled] = useState(true);
  const [uiSoundVolume, setUiSoundVolume] = useState(40); // Gentle default volume
  const [habitStats, setHabitStats] = useState<HabitStats>({
    totalCompletions: 0,
    currentStreak: 0,
    longestStreak: 0,
    completionHistory: {},
    lastCompletionDate: ''
  });

  // Load saved preferences
  useEffect(() => {
    const savedLang = localStorage.getItem('app-language') as Language;
    const savedTheme = localStorage.getItem('app-theme') as Theme;
    const savedPomodoroTime = localStorage.getItem('pomodoro-time');
    const savedSound = localStorage.getItem('pomodoro-sound');
    const savedVolume = localStorage.getItem('sound-volume');
    const savedAutoBreak = localStorage.getItem('auto-break');
    const savedUiSounds = localStorage.getItem('ui-sounds-enabled');
    const savedUiVolume = localStorage.getItem('ui-sound-volume');
    const savedHabitStats = localStorage.getItem('habit-stats');

    if (savedLang) setLanguage(savedLang);
    if (savedTheme) setTheme(savedTheme);
    if (savedPomodoroTime) setPomodoroTime(parseInt(savedPomodoroTime));
    if (savedSound) setPomodoroSound(savedSound);
    if (savedVolume) setSoundVolume(parseInt(savedVolume));
    if (savedAutoBreak) setAutoBreak(savedAutoBreak === 'true');
    if (savedUiSounds) setUiSoundsEnabled(savedUiSounds === 'true');
    if (savedUiVolume) setUiSoundVolume(parseInt(savedUiVolume));
    if (savedHabitStats) {
      try {
        setHabitStats(JSON.parse(savedHabitStats));
      } catch (e) {
        console.error('Error parsing saved habit stats:', e);
      }
    }
  }, []);

  // Save preferences and apply theme
  useEffect(() => {
    localStorage.setItem('app-language', language);
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  useEffect(() => {
    localStorage.setItem('app-theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('pomodoro-time', pomodoroTime.toString());
  }, [pomodoroTime]);

  useEffect(() => {
    localStorage.setItem('pomodoro-sound', pomodoroSound);
  }, [pomodoroSound]);

  useEffect(() => {
    localStorage.setItem('sound-volume', soundVolume.toString());
  }, [soundVolume]);

  useEffect(() => {
    localStorage.setItem('auto-break', autoBreak.toString());
  }, [autoBreak]);

  useEffect(() => {
    localStorage.setItem('ui-sounds-enabled', uiSoundsEnabled.toString());
    soundEffects.setEnabled(uiSoundsEnabled);
  }, [uiSoundsEnabled]);

  useEffect(() => {
    localStorage.setItem('ui-sound-volume', uiSoundVolume.toString());
    soundEffects.setVolume(uiSoundVolume / 100);
  }, [uiSoundVolume]);

  useEffect(() => {
    localStorage.setItem('habit-stats', JSON.stringify(habitStats));
  }, [habitStats]);

  // UI Sound functions
  const playTaskCompleteSound = () => {
    if (uiSoundsEnabled) {
      soundEffects.playTaskComplete();
    }
  };

  const playHabitCompleteSound = () => {
    if (uiSoundsEnabled) {
      soundEffects.playHabitComplete();
    }
  };

  const playTabSwitchSound = () => {
    if (uiSoundsEnabled) {
      soundEffects.playTabSwitch();
    }
  };

  const playButtonClickSound = () => {
    if (uiSoundsEnabled) {
      soundEffects.playButtonClick();
    }
  };

  const playNavigationSound = () => {
    if (uiSoundsEnabled) {
      soundEffects.playNavigation();
    }
  };

  const playCelebrationSound = () => {
    if (uiSoundsEnabled) {
      soundEffects.playAchievement();
    }
  };

  const updateHabitStats = (completed: boolean) => {
    const today = new Date().toISOString().split('T')[0];
    
    setHabitStats(prev => {
      const newStats = { ...prev };
      
      if (completed) {
        newStats.totalCompletions += 1;
        newStats.completionHistory[today] = (newStats.completionHistory[today] || 0) + 1;
        
        // Update streak
        if (prev.lastCompletionDate === today) {
          // Same day, don't change streak
        } else if (prev.lastCompletionDate === new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0]) {
          // Yesterday, continue streak
          newStats.currentStreak += 1;
        } else {
          // Reset streak
          newStats.currentStreak = 1;
        }
        
        newStats.longestStreak = Math.max(newStats.longestStreak, newStats.currentStreak);
        newStats.lastCompletionDate = today;
      }
      
      return newStats;
    });
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <AppContext.Provider
      value={{
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
        habitStats,
        updateHabitStats,
        t,
        uiSoundsEnabled,
        setUiSoundsEnabled,
        uiSoundVolume,
        setUiSoundVolume,
        playTaskCompleteSound,
        playHabitCompleteSound,
        playTabSwitchSound,
        playButtonClickSound,
        playNavigationSound,
        playCelebrationSound,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}