import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useApp } from '@/contexts/AppContext';
import { Target, Sparkles, Zap, Heart, Star, Rocket, ArrowRight } from 'lucide-react';

interface WelcomeScreenProps {
  onComplete: () => void;
}

export function WelcomeScreen({ onComplete }: WelcomeScreenProps) {
  const { language, playButtonClickSound } = useApp();
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  
  const features = [
    {
      icon: <Target className="w-8 h-8" />,
      title: { ar: 'تتبع العادات', en: 'Track Habits' },
      description: { ar: 'بناء عادات إيجابية وتتبع تقدمك', en: 'Build positive habits and track your progress' }
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: { ar: 'تقنية البومودورو', en: 'Pomodoro Technique' },
      description: { ar: 'تحسين التركيز والإنتاجية', en: 'Improve focus and productivity' }
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: { ar: 'إدارة المهام', en: 'Task Management' },
      description: { ar: 'تنظيم مهامك بذكاء', en: 'Organize your tasks smartly' }
    }
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % features.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 500);
    return () => clearTimeout(timer);
  }, [currentStep]);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Interactive mouse follower */}
      <div 
        className="absolute w-96 h-96 rounded-full bg-gradient-to-br from-pink-500/10 to-purple-500/10 blur-3xl pointer-events-none transition-all duration-300 ease-out"
        style={{
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
          transform: `scale(${isHovering ? 1.5 : 1})`
        }}
      />
      
      {/* Enhanced animated background particles */}
      <div className="absolute inset-0">
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full opacity-10 animate-float"
            style={{
              width: `${Math.random() * 12 + 2}px`,
              height: `${Math.random() * 12 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${3 + Math.random() * 6}s`
            }}
          />
        ))}
      </div>

      {/* Animated gradient waves */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute w-full h-32 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-y-2 animate-pulse" style={{ top: '20%', animationDuration: '4s' }} />
          <div className="absolute w-full h-24 bg-gradient-to-r from-transparent via-blue-300/10 to-transparent transform skew-y-1 animate-pulse" style={{ top: '60%', animationDuration: '6s', animationDelay: '2s' }} />
          <div className="absolute w-full h-20 bg-gradient-to-r from-transparent via-purple-300/10 to-transparent transform -skew-y-1 animate-pulse" style={{ top: '80%', animationDuration: '5s', animationDelay: '1s' }} />
        </div>
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
      
      {/* Floating shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-pink-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-cyan-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/4 right-1/4 w-48 h-48 bg-gradient-to-br from-green-400/15 to-emerald-600/15 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '3s' }} />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-orange-400/15 to-red-600/15 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '4s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-br from-yellow-400/10 to-orange-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8 text-center">
        
        {/* Enhanced Logo and title */}
        <div className="mb-12 opacity-0 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
          <div className="relative mb-6">
            <div className="w-28 h-28 mx-auto bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl animate-float hover:animate-glow cursor-pointer transition-all duration-300 hover:scale-110">
              <Sparkles className="w-14 h-14 text-white animate-pulse" />
            </div>
            <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full animate-ping" />
            <div className="absolute -bottom-3 -left-3 w-6 h-6 bg-gradient-to-br from-red-400 to-pink-500 rounded-full animate-bounce" />
            <div className="absolute top-1/2 -right-6 w-4 h-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
            <div className="absolute top-1/4 -left-4 w-3 h-3 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }} />
          </div>
          
          <h1 className="text-7xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent mb-4 opacity-0 animate-slideUp hover:animate-shimmer cursor-default" style={{ animationDelay: '0.4s' }}>
            Nisba+
          </h1>
          
          <p className="text-2xl text-blue-100 font-medium opacity-0 animate-slideUp" style={{ animationDelay: '0.6s' }}>
            {language === 'ar' 
              ? 'رحلتك نحو حياة أفضل تبدأ هنا' 
              : 'Your journey to a better life starts here'
            }
          </p>
        </div>

        {/* Enhanced Features showcase */}
        <div className="mb-12 w-full max-w-md opacity-0 animate-slideUp" style={{ animationDelay: '0.8s' }}>
          <div 
            className={`transform transition-all duration-700 hover:scale-105 ${isAnimating ? 'scale-110' : 'scale-100'}`}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl hover:shadow-3xl hover:border-white/30 transition-all duration-500 relative overflow-hidden">
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
              
              <div className="flex justify-center mb-6">
                <div className="p-5 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110">
                  {features[currentStep].icon}
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4 transition-all duration-300">
                {features[currentStep].title[language]}
              </h3>
              
              <p className="text-blue-100 leading-relaxed text-lg">
                {features[currentStep].description[language]}
              </p>
            </div>
          </div>

          {/* Enhanced Feature indicators */}
          <div className="flex justify-center mt-8 gap-3">
            {features.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentStep(index)}
                className={`w-4 h-4 rounded-full transition-all duration-500 hover:scale-125 ${
                  index === currentStep 
                    ? 'bg-white shadow-lg scale-110' 
                    : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Enhanced Call to action */}
        <div className="space-y-6 opacity-0 animate-slideUp" style={{ animationDelay: '1s' }}>
          <Button
            onClick={() => {
              playButtonClickSound();
              onComplete();
            }}
            size="lg"
            className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 text-white font-bold py-5 px-12 rounded-2xl shadow-2xl transform hover:scale-110 transition-all duration-300 border-0 hover:shadow-pink-500/25 group relative overflow-hidden"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {/* Button shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-shimmer" />
            <Rocket className="w-6 h-6 mr-3 group-hover:scale-105 transition-transform duration-500" />
            <span className="relative z-10">{language === 'ar' ? 'ابدأ الآن' : 'Get Started'}</span>
            <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform duration-500" />
          </Button>
        </div>

        {/* Enhanced Decorative elements */}
        <div className="absolute top-10 left-10 opacity-0 animate-fadeIn" style={{ animationDelay: '1.2s' }}>
          <Star className="w-8 h-8 text-yellow-300 hover:scale-110 transition-transform duration-700 cursor-pointer" style={{ animation: 'float 6s ease-in-out infinite' }} />
        </div>
        <div className="absolute top-20 right-20 opacity-0 animate-fadeIn" style={{ animationDelay: '1.4s' }}>
          <Star className="w-6 h-6 text-pink-300 hover:scale-110 transition-transform duration-700 cursor-pointer" style={{ animation: 'float 7s ease-in-out infinite 1s' }} />
        </div>
        <div className="absolute bottom-32 left-16 opacity-0 animate-fadeIn" style={{ animationDelay: '1.6s' }}>
          <Star className="w-7 h-7 text-blue-300 hover:scale-110 transition-transform duration-700 cursor-pointer" style={{ animation: 'float 8s ease-in-out infinite 0.5s' }} />
        </div>
        <div className="absolute top-1/3 left-8 opacity-0 animate-fadeIn" style={{ animationDelay: '1.8s' }}>
          <Sparkles className="w-6 h-6 text-purple-300 hover:scale-110 transition-transform duration-700 cursor-pointer" style={{ animation: 'float 9s ease-in-out infinite 2s' }} />
        </div>
        <div className="absolute bottom-1/3 right-12 opacity-0 animate-fadeIn" style={{ animationDelay: '2s' }}>
          <Sparkles className="w-5 h-5 text-cyan-300 hover:scale-110 transition-transform duration-700 cursor-pointer" style={{ animation: 'float 6.5s ease-in-out infinite 1.5s' }} />
        </div>
        <div className="absolute top-1/4 right-1/4 opacity-0 animate-fadeIn" style={{ animationDelay: '2.2s' }}>
          <Heart className="w-5 h-5 text-red-300 hover:scale-110 transition-transform duration-700 cursor-pointer" style={{ animation: 'float 7.5s ease-in-out infinite 0.8s' }} />
        </div>
        <div className="absolute bottom-1/4 left-1/3 opacity-0 animate-fadeIn" style={{ animationDelay: '2.4s' }}>
          <Target className="w-6 h-6 text-green-300 hover:scale-110 transition-transform duration-700 cursor-pointer" style={{ animation: 'float 8.5s ease-in-out infinite 1.2s' }} />
        </div>
      </div>
    </div>
  );
}