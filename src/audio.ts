// src/audio.ts

// Singleton AudioContext
let audioCtx: AudioContext | null = null;
let bgmOsc: OscillatorNode | null = null;
let bgmOsc2: OscillatorNode | null = null;
let bgmLfo: OscillatorNode | null = null;
let bgmGain: GainNode | null = null;
let isBgmPlaying = false;

export const initAudio = () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
};

export const startBGM = () => {
  if (isBgmPlaying) return;
  initAudio();
  if (!audioCtx) return;
  
  bgmGain = audioCtx.createGain();
  bgmGain.gain.value = 0; // fade in
  bgmGain.connect(audioCtx.destination);
  
  // Lush ambient Cmaj9 chord drone for a musical, soothing EDM pad feel
  const frequencies = [261.63, 329.63, 392.00, 493.88, 587.33]; // C4, E4, G4, B4, D5
  
  frequencies.forEach((freq, index) => {
    const osc = audioCtx!.createOscillator();
    osc.type = index % 2 === 0 ? 'sine' : 'triangle';
    osc.frequency.value = freq;
    
    // Slight detune for that thick EDM pad chorus effect
    const oscDetune = audioCtx!.createOscillator();
    oscDetune.type = 'sine';
    oscDetune.frequency.value = freq * 1.005;
    
    const mixGain = audioCtx!.createGain();
    mixGain.gain.value = 0.15; // lower individual volume
    
    osc.connect(mixGain);
    oscDetune.connect(mixGain);
    mixGain.connect(bgmGain!);
    
    osc.start();
    oscDetune.start();
  });
  
  // Global slow LFO for a pulsing, swelling ambient effect
  bgmLfo = audioCtx.createOscillator();
  bgmLfo.type = 'sine';
  bgmLfo.frequency.value = 0.15; // ~6.5 second cycle
  
  const lfoGain = audioCtx.createGain();
  lfoGain.gain.value = 0.03; // Modulation depth
  bgmLfo.connect(lfoGain);
  lfoGain.connect(bgmGain.gain);
  bgmLfo.start();
  
  // Fade in smoothly
  bgmGain.gain.linearRampToValueAtTime(0.12, audioCtx.currentTime + 5);
  isBgmPlaying = true;
};

// Pentatonic Scale (E major: E, F#, G#, B, C#)
const scale = [329.63, 369.99, 415.30, 493.88, 554.37, 659.25, 739.99];

export const playInteractionSound = (type: 'type' | 'click' | 'success' | 'hover' | 'laser') => {
  initAudio();
  if (!audioCtx) return;

  const t = audioCtx.currentTime;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  
  if (type === 'type') {
    // Guitar/Pluck sound
    const freq = scale[Math.floor(Math.random() * scale.length)];
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, t);
    
    gain.gain.setValueAtTime(0.03, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
    
    osc.start(t);
    osc.stop(t + 0.15);
  } else if (type === 'hover') {
    // Flute/Pad sound
    const freq = scale[Math.floor(Math.random() * scale.length)] * 0.5; // lower octave
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, t);
    
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(0.02, t + 0.1);
    gain.gain.linearRampToValueAtTime(0, t + 0.4);
    
    osc.start(t);
    osc.stop(t + 0.4);
  } else if (type === 'click') {
    // Piano/Bell sound
    const freq = scale[Math.floor(Math.random() * scale.length)];
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, t);
    
    gain.gain.setValueAtTime(0.05, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.5);
    
    osc.start(t);
    osc.stop(t + 0.5);
  } else if (type === 'laser') {
    // Laser/Run sound
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(800, t);
    osc.frequency.exponentialRampToValueAtTime(100, t + 0.3);
    gain.gain.setValueAtTime(0.06, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.3);
    osc.start(t);
    osc.stop(t + 0.3);
  } else if (type === 'success') {
    // Triumphant chord (E major arpeggio)
    [329.63, 415.30, 493.88, 659.25].forEach((freq, i) => {
      const sOsc = audioCtx!.createOscillator();
      const sGain = audioCtx!.createGain();
      sOsc.type = 'sine';
      sOsc.frequency.setValueAtTime(freq, t + i * 0.1);
      
      sOsc.connect(sGain);
      sGain.connect(audioCtx!.destination);
      
      sGain.gain.setValueAtTime(0.04, t + i * 0.1);
      sGain.gain.linearRampToValueAtTime(0, t + i * 0.1 + 1.5);
      
      sOsc.start(t + i * 0.1);
      sOsc.stop(t + i * 0.1 + 1.5);
    });
  }
};
