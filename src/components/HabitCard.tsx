import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Circle, RotateCcw, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useApp } from "@/contexts/AppContext";
import { CelebrationEffect } from "@/components/CelebrationEffect";

export interface Habit {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  streak: number;
  completed: boolean;
  targetDays?: number;
}

interface HabitCardProps {
  habit: Habit;
  onToggle: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function HabitCard({ habit, onToggle, onDelete }: HabitCardProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const { language, playHabitCompleteSound } = useApp();

  const handleToggle = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
    
    // Play sound effect and show celebration when completing a habit
    if (!habit.completed) {
      playHabitCompleteSound();
      setShowCelebration(true);
      
      // Hide celebration after delay
      setTimeout(() => {
        setShowCelebration(false);
      }, 3500);
    }
    
    onToggle(habit.id);
  };

  return (
    <>
      <Card className={cn(
        "habit-card p-6 group cursor-pointer",
        habit.completed && "habit-card-completed",
        isAnimating && "pulse-glow"
      )}>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4 flex-1">
          <div className={cn(
            "p-3 rounded-2xl transition-[var(--transition-smooth)]",
            habit.completed 
              ? `bg-success/20 text-success border border-success/30` 
              : `bg-gradient-to-br ${habit.color} text-white shadow-[var(--shadow-soft)]`
          )}>
            {habit.icon}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-lg text-foreground truncate">
                {habit.title}
              </h3>
              {habit.completed && (
                <Badge variant="secondary" className="bg-success/10 text-success border-success/30">
                  {language === 'ar' ? 'مكتمل' : 'Completed'}
                </Badge>
              )}
            </div>
            <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
              {habit.description}
            </p>
            
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1 text-primary">
                <Circle size={4} className="fill-current" />
                <span className="font-medium">
                  {habit.streak} {language === 'ar' ? 'يوم متتالي' : 'consecutive days'}
                </span>
              </div>
              
              {habit.targetDays && (
                <div className="flex items-center gap-1 text-muted-foreground">
                  <span>
                    {language === 'ar' 
                      ? `الهدف: ${habit.targetDays} يوم`
                      : `Target: ${habit.targetDays} days`
                    }
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant={habit.completed ? "habit-completed" : "habit"}
            size="icon"
            onClick={handleToggle}
            className="shrink-0"
          >
            {habit.completed ? (
              <Check size={20} />
            ) : (
              <Circle size={20} />
            )}
          </Button>
          
          {habit.completed && onDelete && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(habit.id)}
              className="shrink-0 text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <Trash2 size={16} />
            </Button>
          )}
        </div>
      </div>
      
      {/* Progress Bar */}
      {habit.targetDays && (
        <div className="mt-4 pt-4 border-t border-border/30">
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
            <span>{language === 'ar' ? 'التقدم' : 'Progress'}</span>
            <span>{Math.min(habit.streak, habit.targetDays)} / {habit.targetDays}</span>
          </div>
          <div className="w-full bg-muted/50 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-primary to-primary-glow h-full transition-all duration-700 ease-out rounded-full"
              style={{ 
                width: `${Math.min((habit.streak / habit.targetDays) * 100, 100)}%` 
              }}
            />
          </div>
        </div>
      )}
    </Card>
    
    {/* Celebration Effect */}
    <CelebrationEffect 
      show={showCelebration} 
      type="habit"
      onComplete={() => setShowCelebration(false)}
    />
    </>
  );
}