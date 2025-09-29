import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sun, Moon, Sunrise, Sunset, Clock } from "lucide-react";
import { useApp } from "@/contexts/AppContext";
import { getDailyQuote } from "@/data/quotes";
import { toZonedTime } from 'date-fns-tz';

// Helper function to convert Gregorian to Hijri date
function gregorianToHijri(date: Date) {
  // Simplified Hijri conversion (approximate)
  const gregorianYear = date.getFullYear();
  const gregorianMonth = date.getMonth() + 1;
  const gregorianDay = date.getDate();
  
  // Approximate conversion formula
  const hijriYear = Math.floor((gregorianYear - 622) * 1.030684);
  const hijriMonths = [
    'Muharram', 'Safar', 'Rabi\' al-awwal', 'Rabi\' al-thani',
    'Jumada al-awwal', 'Jumada al-thani', 'Rajab', 'Sha\'ban',
    'Ramadan', 'Shawwal', 'Dhu al-Qi\'dah', 'Dhu al-Hijjah'
  ];
  
  // Simple approximation for the month
  const hijriMonth = ((gregorianMonth + 10) % 12);
  const hijriDay = Math.max(1, gregorianDay - 10);
  
  return {
    year: hijriYear,
    month: hijriMonths[hijriMonth],
    day: hijriDay
  };
}

export function WelcomeHeader() {
  const { t, language } = useApp();
  const [currentTime, setCurrentTime] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => {
      // Get Baghdad time (UTC+3)
      const baghdadTime = toZonedTime(new Date(), 'Asia/Baghdad');
      setCurrentTime(baghdadTime);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    
    const greetings = {
      ar: {
        night: "ليلة سعيدة",
        morning: "صباح الخير", 
        afternoon: "مساء الخير",
        evening: "مساء الخير"
      },
      en: {
        night: "Good Night",
        morning: "Good Morning",
        afternoon: "Good Afternoon", 
        evening: "Good Evening"
      }
    };
    
    // Morning: Sun icon (6-12)
    if (hour >= 6 && hour < 12) return { text: greetings[language].morning, icon: <Sun size={24} />, gradient: "from-orange-300 to-yellow-400" };
    // Afternoon: Sun icon (12-17) 
    if (hour >= 12 && hour < 17) return { text: greetings[language].afternoon, icon: <Sun size={24} />, gradient: "from-blue-400 to-cyan-400" };
    // Evening: Moon icon (17-21)
    if (hour >= 17 && hour < 21) return { text: greetings[language].evening, icon: <Moon size={24} />, gradient: "from-orange-400 to-red-400" };
    // Night: Moon icon (21-6)
    return { text: greetings[language].night, icon: <Moon size={24} />, gradient: "from-indigo-400 to-purple-500" };
  };

  const greeting = getGreeting();
  
  // Always show Gregorian date - real and current
  const formattedDate = currentTime.toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  // Get daily philosophical quote
  const dailyQuote = getDailyQuote(language);

  return (
    <Card className="habit-card p-8 mb-8 relative overflow-hidden">
      {/* Background gradient animation */}
      <div className="absolute inset-0 bg-gradient-to-r opacity-5 floating-animation" 
           style={{
             background: `linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))`
           }} 
      />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className={`p-4 rounded-2xl bg-gradient-to-br ${greeting.gradient} text-white shadow-[var(--shadow-medium)]`}>
              {greeting.icon}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-1 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {greeting.text}
              </h1>
              <p className="text-sm text-muted-foreground font-medium">
                {formattedDate}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-gradient-to-br from-accent to-accent/80 text-white shadow-md">
              <Clock size={12} />
            </div>
            <Badge variant="secondary" className="text-sm px-3 py-1 font-medium bg-gradient-to-r from-background to-muted border border-border/30">
              {currentTime.toLocaleTimeString(language === 'ar' ? 'ar-SA' : 'en-US', { 
                hour: '2-digit', 
                minute: '2-digit',
                hour12: language === 'en'
              })}
            </Badge>
          </div>
        </div>
        
        <div className="text-center py-6 border-t border-border/30">
          <blockquote className="text-xl font-medium text-foreground italic">
            "{dailyQuote.text}"
          </blockquote>
          <p className="text-sm text-muted-foreground mt-2">- {dailyQuote.author}</p>
        </div>
      </div>
    </Card>
  );
}