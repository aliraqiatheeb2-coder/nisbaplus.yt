import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Plus, Calendar as CalendarIcon, Clock, AlertCircle, CheckCircle, Trash2, PartyPopper } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { CelebrationEffect } from '@/components/CelebrationEffect';
import { format } from 'date-fns';
import { ar, enUS } from 'date-fns/locale';

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  dueDate?: Date;
  completed: boolean;
  createdAt: Date;
  completedAt?: Date;
}

export function TaskManager() {
  const { t, language, playTaskCompleteSound } = useApp();
  const [taskCelebration, setTaskCelebration] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  
  // Create initial tasks that update with language
  const getInitialTasks = () => [
    {
      id: '1',
      title: t('work_report_task') || (language === 'ar' ? 'إنهاء تقرير العمل' : 'Complete work report'),
      description: t('work_report_desc') || (language === 'ar' ? 'مراجعة وإنهاء التقرير الشهري' : 'Review and complete monthly report'),
      priority: 'high' as const,
      dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      completed: false,
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000)
    },
    {
      id: '2', 
      title: t('grocery_task') || (language === 'ar' ? 'تسوق البقالة' : 'Grocery shopping'),
      description: t('grocery_desc') || (language === 'ar' ? 'شراء الخضروات والفواكه' : 'Buy vegetables and fruits'),
      priority: 'medium' as const,
      dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
      completed: true,
      createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000),
      completedAt: new Date()
    }
  ];
  
  const [tasks, setTasks] = useState<Task[]>(getInitialTasks);
  
  // Update tasks when language changes
  useEffect(() => {
    setTasks(prev => prev.map(task => {
      if (task.id === '1') {
        return {
          ...task,
          title: t('work_report_task') || (language === 'ar' ? 'إنهاء تقرير العمل' : 'Complete work report'),
          description: t('work_report_desc') || (language === 'ar' ? 'مراجعة وإنهاء التقرير الشهري' : 'Review and complete monthly report')
        };
      } else if (task.id === '2') {
        return {
          ...task,
          title: t('grocery_task') || (language === 'ar' ? 'تسوق البقالة' : 'Grocery shopping'),
          description: t('grocery_desc') || (language === 'ar' ? 'شراء الخضروات والفواكه' : 'Buy vegetables and fruits')
        };
      }
      return task;
    }));
  }, [language, t]);

  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium' as Task['priority'],
    dueDate: undefined as Date | undefined
  });

  const [filter, setFilter] = useState<'all' | 'pending' | 'completed' | 'overdue'>('all');

  const createTask = () => {
    if (!newTask.title.trim()) return;

    const task: Task = {
      id: Date.now().toString(),
      title: newTask.title,
      description: newTask.description,
      priority: newTask.priority,
      dueDate: newTask.dueDate,
      completed: false,
      createdAt: new Date()
    };

    setTasks(prev => [task, ...prev]);
    setNewTask({ title: '', description: '', priority: 'medium', dueDate: undefined });
    setShowAddDialog(false);
  };

  const toggleTask = (taskId: string) => {
    setTasks(prev => {
      const updated = prev.map(task => {
        if (task.id === taskId) {
          const newCompleted = !task.completed;
          
          // Play sound effect and show celebration when completing a task
          if (!task.completed) {
            playTaskCompleteSound();
            setTaskCelebration(true);
            
            // Hide celebration after delay
            setTimeout(() => {
              setTaskCelebration(false);
            }, 3500);
          }
          
          return {
            ...task, 
            completed: newCompleted,
            completedAt: newCompleted ? new Date() : undefined
          };
        }
        return task;
      });
      
      // Check if all tasks are completed
      const pendingTasks = updated.filter(task => !task.completed);
      if (pendingTasks.length === 0 && updated.length > 0) {
        setShowCelebration(true);
        setTimeout(() => setShowCelebration(false), 3000);
      }
      
      return updated;
    });
  };

  const deleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };

  const getFilteredTasks = () => {
    const now = new Date();
    return tasks.filter(task => {
      switch (filter) {
        case 'completed':
          return task.completed;
        case 'pending':
          return !task.completed;
        case 'overdue':
          return !task.completed && task.dueDate && task.dueDate < now;
        default:
          return true;
      }
    });
  };

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high': return 'from-destructive to-destructive/80';
      case 'medium': return 'from-warning to-warning/80';
      case 'low': return 'from-success to-success/80';
    }
  };

  const getPriorityText = (priority: Task['priority']) => {
    switch (priority) {
      case 'high': return t('high');
      case 'medium': return t('medium');
      case 'low': return t('low');
    }
  };

  const isOverdue = (task: Task) => {
    return !task.completed && task.dueDate && task.dueDate < new Date();
  };

  const getTaskStats = () => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const pending = tasks.filter(t => !t.completed).length;
    const overdue = tasks.filter(t => isOverdue(t)).length;
    
    return { total, completed, pending, overdue };
  };

  const stats = getTaskStats();
  const filteredTasks = getFilteredTasks();

  return (
    <div className="max-w-4xl mx-auto space-y-6 relative">
      {/* Celebration Animation */}
      {showCelebration && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-md">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-2xl border border-border/20 max-w-md mx-4 animate-in fade-in-0 zoom-in-95 duration-300">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center animate-pulse">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-2 text-foreground">
                {language === 'ar' ? 'أحسنت!' : 'Well Done!'}
              </h2>
              <p className="text-muted-foreground mb-4">
                {language === 'ar' 
                  ? 'لقد أنجزت جميع مهامك بنجاح'
                  : 'You have successfully completed all your tasks'
                }
              </p>
              <div className="flex justify-center gap-2">
                {[0, 1, 2, 3, 4].map((i) => (
                  <div 
                    key={i}
                    className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-bounce"
                    style={{animationDelay: `${i * 0.1}s`}}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: language === 'ar' ? 'إجمالي' : 'Total', value: stats.total, color: 'from-primary to-primary-glow', filter: 'all' },
          { label: t('completed'), value: stats.completed, color: 'from-success to-success/80', filter: 'completed' },
          { label: t('pending'), value: stats.pending, color: 'from-warning to-warning/80', filter: 'pending' }, 
          { label: t('overdue'), value: stats.overdue, color: 'from-destructive to-destructive/80', filter: 'overdue' }
        ].map((stat, index) => (
          <Card 
            key={index}
            className={`habit-card p-4 text-center cursor-pointer transition-all hover:scale-[1.02] ${
              filter === stat.filter ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => setFilter(stat.filter as any)}
          >
            <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${stat.color} text-white mb-2`}>
              {stat.filter === 'completed' && <CheckCircle size={20} />}
              {stat.filter === 'pending' && <Clock size={20} />}
              {stat.filter === 'overdue' && <AlertCircle size={20} />}
              {stat.filter === 'all' && <CalendarIcon size={20} />}
            </div>
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </Card>
        ))}
      </div>

      {/* Header with Add Button */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{t('my_tasks')}</h2>
        
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus size={20} />
              {t('add_task')}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{t('add_task')}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">{t('task_title')}</label>
                <Input
                  value={newTask.title}
                  onChange={(e) => setNewTask(prev => ({ ...prev, title: e.target.value }))}
                  placeholder={t('task_title')}
                />
              </div>
              
              <div>
                <label className="text-sm font-medium">{t('task_description')}</label>
                <Textarea
                  value={newTask.description}
                  onChange={(e) => setNewTask(prev => ({ ...prev, description: e.target.value }))}
                  placeholder={t('task_description')}
                  rows={3}
                />
              </div>
              
              <div>
                <label className="text-sm font-medium">{t('priority')}</label>
                <Select value={newTask.priority} onValueChange={(value: Task['priority']) => 
                  setNewTask(prev => ({ ...prev, priority: value }))
                }>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">{t('high')}</SelectItem>
                    <SelectItem value="medium">{t('medium')}</SelectItem>
                    <SelectItem value="low">{t('low')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium">{t('due_date')}</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {newTask.dueDate ? format(newTask.dueDate, 'PPP', { 
                        locale: language === 'ar' ? ar : enUS 
                      }) : t('due_date')}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={newTask.dueDate}
                      onSelect={(date) => setNewTask(prev => ({ ...prev, dueDate: date }))}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="flex gap-2">
                <Button onClick={createTask} className="flex-1">
                  {t('create_task')}
                </Button>
                <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                  {t('cancel')}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Tasks List */}
      <div className="space-y-4">
        {filteredTasks.length === 0 ? (
          <Card className="habit-card p-8 text-center">
            <p className="text-muted-foreground">
              {filter === 'all' && (language === 'ar' ? 'لا توجد مهام بعد' : 'No tasks yet')}
              {filter === 'completed' && (language === 'ar' ? 'لا توجد مهام مكتملة' : 'No completed tasks')}
              {filter === 'pending' && (language === 'ar' ? 'لا توجد مهام معلقة' : 'No pending tasks')}
              {filter === 'overdue' && (language === 'ar' ? 'لا توجد مهام متأخرة' : 'No overdue tasks')}
            </p>
          </Card>
        ) : (
          filteredTasks.map(task => (
            <Card key={task.id} className={`habit-card p-4 ${task.completed ? 'opacity-75' : ''}`}>
              <div className="flex items-start gap-4">
                <Checkbox
                  checked={task.completed}
                  onCheckedChange={() => toggleTask(task.id)}
                  className="mt-1"
                />
                
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className={`font-medium ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                      {task.title}
                    </h3>
                    <Badge 
                      variant="secondary" 
                      className={`bg-gradient-to-r ${getPriorityColor(task.priority)} text-white`}
                    >
                      {getPriorityText(task.priority)}
                    </Badge>
                    {isOverdue(task) && (
                      <Badge variant="destructive" className="gap-1">
                        <AlertCircle size={12} />
                        {language === 'ar' ? 'متأخر' : 'Overdue'}
                      </Badge>
                    )}
                  </div>
                  
                  {task.description && (
                    <p className="text-sm text-muted-foreground">
                      {task.description}
                    </p>
                  )}
                  
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    {task.dueDate && (
                      <div className="flex items-center gap-1">
                        <CalendarIcon size={12} />
                        {format(task.dueDate, 'MMM d, yyyy', {
                          locale: language === 'ar' ? ar : enUS
                        })}
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <Clock size={12} />
                      {language === 'ar' ? 'أُنشئت' : 'Created'} {format(task.createdAt, 'MMM d', {
                        locale: language === 'ar' ? ar : enUS
                      })}
                    </div>
                    {task.completedAt && (
                      <div className="flex items-center gap-1">
                        <CheckCircle size={12} />
                        {language === 'ar' ? 'اكتملت' : 'Completed'} {format(task.completedAt, 'MMM d', {
                          locale: language === 'ar' ? ar : enUS
                        })}
                      </div>
                    )}
                  </div>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteTask(task.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            </Card>
          ))
        )}
      </div>
      {/* Task Celebration Effect */}
      <CelebrationEffect 
        show={taskCelebration} 
        type="task"
        onComplete={() => setTaskCelebration(false)}
      />
    </div>
  );
}
