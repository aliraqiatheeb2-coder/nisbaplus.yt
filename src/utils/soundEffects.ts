// Modern UI Sound Effects for Nisba+ App
// High-quality audio feedback for enhanced user experience

export class SoundEffects {
  private static instance: SoundEffects;
  private audioContext: AudioContext | null = null;
  private isEnabled: boolean = true;
  private volume: number = 0.3; // Reduced default volume for calmer sounds

  private constructor() {
    this.initAudioContext();
  }

  public static getInstance(): SoundEffects {
    if (!SoundEffects.instance) {
      SoundEffects.instance = new SoundEffects();
    }
    return SoundEffects.instance;
  }

  private initAudioContext() {
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    } catch (error) {
      console.warn('Audio context not supported:', error);
    }
  }

  public setVolume(volume: number) {
    this.volume = Math.max(0, Math.min(1, volume));
  }

  public setEnabled(enabled: boolean) {
    this.isEnabled = enabled;
  }

  // Generate calm, encouraging task completion sound
  public async playTaskComplete() {
    if (!this.isEnabled || !this.audioContext) return;

    try {
      await this.audioContext.resume();
      
      const now = this.audioContext.currentTime;
      const masterGain = this.audioContext.createGain();
      masterGain.connect(this.audioContext.destination);
      
      // Gentle, warm chord progression - soft and encouraging
      const frequencies = [523.25, 659.25, 783.99]; // C5, E5, G5 - Major chord (warm and positive)
      
      frequencies.forEach((freq, index) => {
        // Main oscillator with gentle sine wave
        const oscillator = this.audioContext!.createOscillator();
        const noteGain = this.audioContext!.createGain();
        const filter = this.audioContext!.createBiquadFilter();
        
        oscillator.connect(filter);
        filter.connect(noteGain);
        noteGain.connect(masterGain);
        
        // Soft sine wave for gentle sound
        oscillator.frequency.setValueAtTime(freq, now);
        oscillator.type = 'sine';
        
        // Warm, gentle low-pass filter
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(freq * 1.5, now); // Less harsh filtering
        filter.Q.setValueAtTime(0.7, now); // Gentle resonance
        
        // Soft, encouraging envelope
        const startTime = now + index * 0.15; // Slower, more relaxed timing
        noteGain.gain.setValueAtTime(0, startTime);
        noteGain.gain.linearRampToValueAtTime(this.volume * 0.25, startTime + 0.08); // Gentler attack
        noteGain.gain.exponentialRampToValueAtTime(this.volume * 0.15, startTime + 0.4); // Longer sustain
        noteGain.gain.exponentialRampToValueAtTime(0.001, startTime + 1.5); // Extended, peaceful fade
        
        oscillator.start(startTime);
        oscillator.stop(startTime + 2);
        
        // Add subtle harmonic for warmth (very gentle)
        const harmonicOsc = this.audioContext!.createOscillator();
        const harmonicGain = this.audioContext!.createGain();
        
        harmonicOsc.connect(harmonicGain);
        harmonicGain.connect(masterGain);
        
        harmonicOsc.frequency.setValueAtTime(freq * 1.5, now); // Gentler harmonic
        harmonicOsc.type = 'sine';
        
        harmonicGain.gain.setValueAtTime(0, startTime);
        harmonicGain.gain.linearRampToValueAtTime(this.volume * 0.08, startTime + 0.1); // Very subtle
        harmonicGain.gain.exponentialRampToValueAtTime(0.001, startTime + 1.2);
        
        harmonicOsc.start(startTime);
        harmonicOsc.stop(startTime + 1.5);
      });
      
    } catch (error) {
      console.warn('Failed to play task complete sound:', error);
    }
  }

  // Generate gentle, encouraging habit completion sound
  public async playHabitComplete() {
    if (!this.isEnabled || !this.audioContext) return;

    try {
      await this.audioContext.resume();
      
      const now = this.audioContext.currentTime;
      const masterGain = this.audioContext.createGain();
      masterGain.connect(this.audioContext.destination);
      
      // Gentle ascending melody - soft and motivating
      const melody = [
        { freq: 523.25, time: 0, duration: 0.6 },      // C5
        { freq: 587.33, time: 0.2, duration: 0.6 },    // D5
        { freq: 659.25, time: 0.4, duration: 0.6 },    // E5
        { freq: 783.99, time: 0.6, duration: 0.8 },    // G5
      ];
      
      melody.forEach((note, index) => {
        // Main note with gentle synthesis
        const oscillator = this.audioContext!.createOscillator();
        const noteGain = this.audioContext!.createGain();
        const filter = this.audioContext!.createBiquadFilter();
        
        oscillator.connect(filter);
        filter.connect(noteGain);
        noteGain.connect(masterGain);
        
        // Soft sine wave for gentle, warm sound
        oscillator.frequency.setValueAtTime(note.freq, now);
        oscillator.type = 'sine';
        
        // Gentle filter for warmth
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(note.freq * 2, now + note.time);
        filter.Q.setValueAtTime(0.5, now); // Very gentle resonance
        
        const startTime = now + note.time;
        noteGain.gain.setValueAtTime(0, startTime);
        noteGain.gain.linearRampToValueAtTime(this.volume * 0.3, startTime + 0.1); // Gentle attack
        noteGain.gain.exponentialRampToValueAtTime(this.volume * 0.15, startTime + note.duration * 0.7);
        noteGain.gain.exponentialRampToValueAtTime(0.001, startTime + note.duration);
        
        oscillator.start(startTime);
        oscillator.stop(startTime + note.duration);
        
        // Add subtle sparkle only for the last two notes (gentle celebration)
        if (index >= 2) {
          const sparkleOsc = this.audioContext!.createOscillator();
          const sparkleGain = this.audioContext!.createGain();
          
          sparkleOsc.connect(sparkleGain);
          sparkleGain.connect(masterGain);
          
          sparkleOsc.frequency.setValueAtTime(note.freq * 2, now);
          sparkleOsc.type = 'sine';
          
          sparkleGain.gain.setValueAtTime(0, startTime);
          sparkleGain.gain.linearRampToValueAtTime(this.volume * 0.1, startTime + 0.05); // Very subtle
          sparkleGain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.4);
          
          sparkleOsc.start(startTime);
          sparkleOsc.stop(startTime + 0.5);
        }
      });
      
    } catch (error) {
      console.warn('Failed to play habit complete sound:', error);
    }
  }

  // Generate gentle tab switch sound
  public async playTabSwitch() {
    if (!this.isEnabled || !this.audioContext) return;

    try {
      await this.audioContext.resume();
      
      const now = this.audioContext.currentTime;
      const masterGain = this.audioContext.createGain();
      masterGain.connect(this.audioContext.destination);
      
      // Soft, gentle navigation sound
      const oscillator = this.audioContext.createOscillator();
      const gain = this.audioContext.createGain();
      const filter = this.audioContext.createBiquadFilter();
      
      oscillator.connect(filter);
      filter.connect(gain);
      gain.connect(masterGain);
      
      // Gentle sine wave with soft frequency sweep
      oscillator.frequency.setValueAtTime(600, now); // Lower, calmer frequency
      oscillator.frequency.exponentialRampToValueAtTime(800, now + 0.15); // Gentle sweep
      oscillator.type = 'sine';
      
      // Warm filter for gentle sound
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1200, now);
      filter.Q.setValueAtTime(0.5, now);
      
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(this.volume * 0.15, now + 0.05); // Very gentle volume
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      
      oscillator.start(now);
      oscillator.stop(now + 0.25);
      
    } catch (error) {
      console.warn('Failed to play tab switch sound:', error);
    }
  }

  // Generate soft, gentle button click sound
  public async playButtonClick() {
    if (!this.isEnabled || !this.audioContext) return;

    try {
      await this.audioContext.resume();
      
      const now = this.audioContext.currentTime;
      const masterGain = this.audioContext.createGain();
      masterGain.connect(this.audioContext.destination);
      
      // Gentle, soft click sound
      const oscillator = this.audioContext.createOscillator();
      const gain = this.audioContext.createGain();
      const filter = this.audioContext.createBiquadFilter();
      
      oscillator.connect(filter);
      filter.connect(gain);
      gain.connect(masterGain);
      
      // Soft sine wave for gentle feedback
      oscillator.frequency.setValueAtTime(800, now); // Lower, calmer frequency
      oscillator.type = 'sine';
      
      // Warm filter for soft sound
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1200, now);
      filter.Q.setValueAtTime(0.3, now); // Very gentle resonance
      
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(this.volume * 0.12, now + 0.01); // Very gentle volume
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      
      oscillator.start(now);
      oscillator.stop(now + 0.1);
      
    } catch (error) {
      console.warn('Failed to play button click sound:', error);
    }
  }

  // Generate gentle navigation sound
  public async playNavigation() {
    if (!this.isEnabled || !this.audioContext) return;

    try {
      await this.audioContext.resume();
      
      const now = this.audioContext.currentTime;
      const masterGain = this.audioContext.createGain();
      masterGain.connect(this.audioContext.destination);
      
      // Soft two-tone navigation sound
      const frequencies = [600, 750]; // Lower, gentler frequencies
      
      frequencies.forEach((freq, index) => {
        const oscillator = this.audioContext!.createOscillator();
        const noteGain = this.audioContext!.createGain();
        const filter = this.audioContext!.createBiquadFilter();
        
        oscillator.connect(filter);
        filter.connect(noteGain);
        noteGain.connect(masterGain);
        
        oscillator.frequency.setValueAtTime(freq, now);
        oscillator.type = 'sine';
        
        // Warm filter for gentle sound
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(freq * 2, now);
        filter.Q.setValueAtTime(0.3, now);
        
        const startTime = now + index * 0.08; // Slower, more relaxed timing
        noteGain.gain.setValueAtTime(0, startTime);
        noteGain.gain.linearRampToValueAtTime(this.volume * 0.12, startTime + 0.02); // Very gentle
        noteGain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.15);
        
        oscillator.start(startTime);
        oscillator.stop(startTime + 0.2);
      });
      
    } catch (error) {
      console.warn('Failed to play navigation sound:', error);
    }
  }

  // Generate gentle, encouraging achievement sound
  public async playAchievement() {
    if (!this.isEnabled || !this.audioContext) return;

    try {
      await this.audioContext.resume();
      
      const now = this.audioContext.currentTime;
      const masterGain = this.audioContext.createGain();
      masterGain.connect(this.audioContext.destination);
      
      // Gentle, encouraging celebration sequence
      const celebration = [
        { freq: 523.25, time: 0, duration: 0.5 },     // C5
        { freq: 659.25, time: 0.2, duration: 0.5 },   // E5
        { freq: 783.99, time: 0.4, duration: 0.5 },   // G5
        { freq: 1046.5, time: 0.6, duration: 0.6 },   // C6
      ];
      
      celebration.forEach((note, index) => {
        // Main celebration tone - gentle and warm
        const oscillator = this.audioContext!.createOscillator();
        const noteGain = this.audioContext!.createGain();
        const filter = this.audioContext!.createBiquadFilter();
        
        oscillator.connect(filter);
        filter.connect(noteGain);
        noteGain.connect(masterGain);
        
        // Warm sine wave for gentle celebration
        oscillator.frequency.setValueAtTime(note.freq, now);
        oscillator.type = 'sine';
        
        // Gentle, warm filter
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(note.freq * 2, now + note.time);
        filter.Q.setValueAtTime(0.7, now);
        
        const startTime = now + note.time;
        noteGain.gain.setValueAtTime(0, startTime);
        noteGain.gain.linearRampToValueAtTime(this.volume * 0.3, startTime + 0.1); // Gentle attack
        noteGain.gain.exponentialRampToValueAtTime(this.volume * 0.15, startTime + note.duration * 0.7);
        noteGain.gain.exponentialRampToValueAtTime(0.001, startTime + note.duration);
        
        oscillator.start(startTime);
        oscillator.stop(startTime + note.duration);
        
        // Add gentle sparkles only for the last two notes
        if (index >= 2) {
          const sparkleOsc = this.audioContext!.createOscillator();
          const sparkleGain = this.audioContext!.createGain();
          
          sparkleOsc.connect(sparkleGain);
          sparkleGain.connect(masterGain);
          
          sparkleOsc.frequency.setValueAtTime(note.freq * 1.5, now);
          sparkleOsc.type = 'sine';
          
          sparkleGain.gain.setValueAtTime(0, startTime);
          sparkleGain.gain.linearRampToValueAtTime(this.volume * 0.08, startTime + 0.05); // Very subtle
          sparkleGain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.3);
          
          sparkleOsc.start(startTime);
          sparkleOsc.stop(startTime + 0.4);
        }
      });
      
    } catch (error) {
      console.warn('Failed to play achievement sound:', error);
    }
  }
}

// Export singleton instance
export const soundEffects = SoundEffects.getInstance();