import { useState, useEffect } from 'react';
import { WelcomeScreen } from '@/components/WelcomeScreen';
import MainApp from './MainApp';

const Index = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const [hasSeenWelcome, setHasSeenWelcome] = useState(false);

  useEffect(() => {
    // Clear welcome screen flag for testing - user wants to see welcome interface
    localStorage.removeItem('nisba-welcome-seen');
    
    // Check if user has seen welcome screen before
    const hasSeenBefore = localStorage.getItem('nisba-welcome-seen');
    if (hasSeenBefore) {
      setShowWelcome(false);
      setHasSeenWelcome(true);
    }
  }, []);

  const handleWelcomeComplete = () => {
    // Mark as seen in localStorage
    localStorage.setItem('nisba-welcome-seen', 'true');
    setShowWelcome(false);
    setHasSeenWelcome(true);
  };

  // Show welcome screen for first-time users
  if (showWelcome) {
    return <WelcomeScreen onComplete={handleWelcomeComplete} />;
  }

  // Show main app for returning users
  return <MainApp />;
};

export default Index;