import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { WelcomeHeader } from '@/components/WelcomeHeader';
import { HabitStats } from '@/components/HabitStats';
import { HabitCard, Habit } from '@/components/HabitCard';
import { TaskManager } from '@/components/TaskManager';
import { PomodoroTimer } from '@/components/PomodoroTimer';
import { Settings } from '@/components/Settings';
import { Button } from '@/components/ui/button';
import { Plus, Target, CheckSquare, Timer, Settings as SettingsIcon, Dumbbell, Book, Droplets, Moon, Brain, Goal } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';

export default function MainApp() {
  const { t, language, updateHabitStats, playTabSwitchSound } = useApp();
  const [isAddHabitOpen, setIsAddHabitOpen] = useState(false);
  const [newHabit, setNewHabit] = useState({
    title: '',
    description: '',
    category: 'health'
  });

  const habitIcons = {
    health: <Dumbbell size={20} />,
    learning: <Book size={20} />,
    lifestyle: <Droplets size={20} />,
    mindfulness: <Brain size={20} />,
    productivity: <Goal size={20} />
  };

  const habitColors = {
    health: "from-red-500 to-red-600",
    learning: "from-green-500 to-green-600",
    lifestyle: "from-blue-500 to-blue-600",
    mindfulness: "from-purple-500 to-purple-600",
    productivity: "from-orange-500 to-orange-600"
  };
  const [habits, setHabits] = useState<Habit[]>([
    {
      id: "1",
      title: t('daily_exercise'),
      description: t('exercise_desc'),
      icon: <Dumbbell size={20} />,
      color: "from-blue-500 to-blue-600",
      streak: 7,
      completed: true,
      targetDays: 30
    },
    {
      id: "2",
      title: t('read_book'),
      description: t('read_desc'),
      icon: <Book size={20} />,
      color: "from-green-500 to-green-600",
      streak: 12,
      completed: false,
      targetDays: 30
    },
    {
      id: "3",
      title: t('drink_water'),
      description: t('water_desc'),
      icon: <Droplets size={20} />,
      color: "from-cyan-500 to-cyan-600",
      streak: 4,
      completed: true,
      targetDays: 30
    },
    {
      id: "4",
      title: t('meditation'),
      description: t('meditation_desc'),
      icon: <Brain size={20} />,
      color: "from-purple-500 to-purple-600",
      streak: 15,
      completed: true,
      targetDays: 30
    },
    {
      id: "5",
      title: t('sleep_early'),
      description: t('sleep_desc'),
      icon: <Moon size={20} />,
      color: "from-indigo-500 to-indigo-600",
      streak: 3,
      completed: false,
      targetDays: 30
    }
  ]);

  // Update habit titles and descriptions when language changes
  useEffect(() => {
    setHabits(prev => prev.map(habit => {
      const updatedHabit = { ...habit };
      
      switch (habit.id) {
        case "1":
          updatedHabit.title = t('daily_exercise');
          updatedHabit.description = t('exercise_desc');
          break;
        case "2":
          updatedHabit.title = t('read_book');
          updatedHabit.description = t('read_desc');
          break;
        case "3":
          updatedHabit.title = t('drink_water');
          updatedHabit.description = t('water_desc');
          break;
        case "4":
          updatedHabit.title = t('meditation');
          updatedHabit.description = t('meditation_desc');
          break;
        case "5":
          updatedHabit.title = t('sleep_early');
          updatedHabit.description = t('sleep_desc');
          break;
        default:
          break;
      }
      
      return updatedHabit;
    }));
  }, [language, t]);

  const toggleHabit = (id: string) => {
    setHabits(prev => prev.map(habit => {
      if (habit.id === id) {
        const newCompleted = !habit.completed;
        
        // Update global stats when habit is completed
        if (newCompleted) {
          updateHabitStats(true);
        }
        
        return {
          ...habit,
          completed: newCompleted,
          streak: newCompleted ? habit.streak + 1 : Math.max(0, habit.streak - 1)
        };
      }
      return habit;
    }));
  };

  const addNewHabit = () => {
    if (newHabit.title.trim()) {
      const habit: Habit = {
        id: Date.now().toString(),
        title: newHabit.title,
        description: newHabit.description,
        icon: habitIcons[newHabit.category as keyof typeof habitIcons],
        color: habitColors[newHabit.category as keyof typeof habitColors],
        streak: 0,
        completed: false,
        targetDays: 30
      };
      setHabits(prev => [...prev, habit]);
      setNewHabit({ title: '', description: '', category: 'health' });
      setIsAddHabitOpen(false);
    }
  };

  const deleteHabit = (habitId: string) => {
    setHabits(prev => prev.filter(habit => habit.id !== habitId));
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <WelcomeHeader />
        
        <Tabs defaultValue="habits" className="space-y-6" onValueChange={playTabSwitchSound}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="habits" className="gap-2">
              <Target size={16} />
              {t('habits')}
            </TabsTrigger>
            <TabsTrigger value="tasks" className="gap-2">
              <CheckSquare size={16} />
              {t('tasks')}
            </TabsTrigger>
            <TabsTrigger value="pomodoro" className="gap-2">
              <Timer size={16} />
              {t('pomodoro')}
            </TabsTrigger>
            <TabsTrigger value="settings" className="gap-2">
              <SettingsIcon size={16} />
              {t('settings')}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="habits" className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-6">{t('your_stats_today')}</h2>
              <HabitStats habits={habits} />
            </section>
            
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground">{t('daily_habits')}</h2>
                <Dialog open={isAddHabitOpen} onOpenChange={setIsAddHabitOpen}>
                  <DialogTrigger asChild>
                    <Button variant="default" className="gap-2">
                      <Plus size={20} />
                      {t('add_new_habit')}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>{t('add_new_habit')}</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="title">
                          {language === 'ar' ? 'اسم العادة' : 'Habit Name'}
                        </Label>
                        <Input
                          id="title"
                          value={newHabit.title}
                          onChange={(e) => setNewHabit(prev => ({ ...prev, title: e.target.value }))}
                          placeholder={language === 'ar' ? 'مثال: شرب الماء' : 'Example: Drink Water'}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="description">
                          {language === 'ar' ? 'الوصف' : 'Description'}
                        </Label>
                        <Textarea
                          id="description"
                          value={newHabit.description}
                          onChange={(e) => setNewHabit(prev => ({ ...prev, description: e.target.value }))}
                          placeholder={language === 'ar' ? 'وصف العادة...' : 'Describe your habit...'}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="category">
                          {language === 'ar' ? 'الفئة' : 'Category'}
                        </Label>
                        <select
                          id="category"
                          value={newHabit.category}
                          onChange={(e) => setNewHabit(prev => ({ ...prev, category: e.target.value }))}
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <option value="health">{language === 'ar' ? 'صحة' : 'Health'}</option>
                          <option value="learning">{language === 'ar' ? 'تعلم' : 'Learning'}</option>
                          <option value="lifestyle">{language === 'ar' ? 'نمط حياة' : 'Lifestyle'}</option>
                          <option value="mindfulness">{language === 'ar' ? 'تأمل' : 'Mindfulness'}</option>
                          <option value="productivity">{language === 'ar' ? 'إنتاجية' : 'Productivity'}</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={addNewHabit} className="flex-1">
                        {language === 'ar' ? 'إضافة العادة' : 'Add Habit'}
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          setIsAddHabitOpen(false);
                          setNewHabit({ title: '', description: '', category: 'health' });
                        }}
                      >
                        {language === 'ar' ? 'إلغاء' : 'Cancel'}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {habits.map(habit => (
                  <HabitCard
                    key={habit.id}
                    habit={habit}
                    onToggle={toggleHabit}
                    onDelete={deleteHabit}
                  />
                ))}
              </div>
            </section>
          </TabsContent>

          <TabsContent value="tasks">
            <TaskManager />
          </TabsContent>

          <TabsContent value="pomodoro">
            <PomodoroTimer />
          </TabsContent>

          <TabsContent value="settings">
            <Settings />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
