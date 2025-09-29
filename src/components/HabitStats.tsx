import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Flame, Target, TrendingUp } from "lucide-react";
import { Habit } from "./HabitCard";
import { useApp } from "@/contexts/AppContext";

interface HabitStatsProps {
  habits: Habit[];
}

export function HabitStats({ habits }: HabitStatsProps) {
  const { t, language, habitStats } = useApp();
  
  const completedToday = habits.filter(h => h.completed).length;
  const totalHabits = habits.length;
  
  // Use real statistics from context
  const today = new Date().toISOString().split('T')[0];
  const todayCompletions = habitStats.completionHistory[today] || 0;
  const realAverageStreak = habitStats.totalCompletions > 0 
    ? Math.round(Object.keys(habitStats.completionHistory).length / Math.max(1, Object.keys(habitStats.completionHistory).length))
    : 0;
  
  const completionRate = totalHabits > 0 ? (completedToday / totalHabits) * 100 : 0;

  const stats = [
    {
      title: t('today'),
      value: `${completedToday}/${totalHabits}`,
      description: t('completed_habits'),
      icon: <Calendar size={20} />,
      color: "from-primary to-primary-glow"
    },
    {
      title: t('longest_streak'),
      value: habitStats.longestStreak,
      description: t('consecutive_days'),
      icon: <Flame size={20} />,
      color: "from-warning to-warning/80"
    },
    {
      title: t('average'),
      value: realAverageStreak,
      description: t('average_days'),
      icon: <TrendingUp size={20} />,
      color: "from-accent to-accent/80"
    },
    {
      title: t('completion_rate'),
      value: `${Math.round(completionRate)}%`,
      description: t('today'),
      icon: <Target size={20} />,
      color: completionRate >= 80 
        ? "from-success to-success/80" 
        : completionRate >= 60 
        ? "from-warning to-warning/80"
        : "from-destructive to-destructive/80"
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="habit-card p-6 text-center group hover:scale-[1.02] transition-[var(--transition-bounce)]">
          <div className={`inline-flex p-3 rounded-2xl bg-gradient-to-br ${stat.color} text-white mb-4 shadow-[var(--shadow-soft)] group-hover:shadow-[var(--shadow-medium)]`}>
            {stat.icon}
          </div>
          
          <div className="space-y-1">
            <p className="text-2xl font-bold text-foreground">
              {stat.value}
            </p>
            <p className="text-sm font-medium text-muted-foreground">
              {stat.description}
            </p>
            <Badge variant="secondary" className="text-xs">
              {stat.title}
            </Badge>
          </div>
        </Card>
      ))}
    </div>
  );
}