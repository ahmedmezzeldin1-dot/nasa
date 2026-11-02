import { Language } from './types';

class SpeechManager {
  private synth: SpeechSynthesis | null = null;
  private voices: SpeechSynthesisVoice[] = [];
  private isMuted: boolean = false;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private lastSpokenText: string = '';
  private lastSpokenLang: Language = 'en';
  private onSpeakingChangeCallbacks: Set<(isSpeaking: boolean) => void> = new Set();
  public isSpeaking: boolean = false;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.loadVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.loadVoices();
      }
    }
  }

  private loadVoices() {
    if (!this.synth) return;
    this.voices = this.synth.getVoices();
  }

  public subscribeSpeaking(callback: (isSpeaking: boolean) => void) {
    this.onSpeakingChangeCallbacks.add(callback);
    callback(this.isSpeaking);
    return () => {
      this.onSpeakingChangeCallbacks.delete(callback);
    };
  }

  private setSpeaking(speaking: boolean) {
    this.isSpeaking = speaking;
    this.onSpeakingChangeCallbacks.forEach((cb) => cb(speaking));
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted) {
      this.cancel();
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public toggleMute(): boolean {
    this.setMuted(!this.isMuted);
    return this.isMuted;
  }

  public getVoice(lang: Language): SpeechSynthesisVoice | null {
    if (!this.synth || this.voices.length === 0) {
      this.loadVoices();
    }

    if (lang === 'ar') {
      const arEg = this.voices.find(
        (v) => v.lang.toLowerCase() === 'ar-eg' || v.lang.toLowerCase().startsWith('ar-eg')
      );
      if (arEg) return arEg;

      const anyAr = this.voices.find(
        (v) => v.lang.toLowerCase().startsWith('ar') || v.name.toLowerCase().includes('arabic')
      );
      if (anyAr) return anyAr;
    } else {
      const enUs = this.voices.find(
        (v) => v.lang.toLowerCase() === 'en-us'
      );
      if (enUs) return enUs;

      const anyEn = this.voices.find((v) => v.lang.toLowerCase().startsWith('en'));
      if (anyEn) return anyEn;
    }

    return null;
  }

  public speak(
    text: string,
    lang: Language,
    onStart?: () => void,
    onEnd?: () => void
  ) {
    if (!this.synth) return;
    this.cancel();

    if (this.isMuted) return;

    this.lastSpokenText = text;
    this.lastSpokenLang = lang;

    const cleanText = text.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '');

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = lang === 'ar' ? 'ar-EG' : 'en-US';

    const voice = this.getVoice(lang);
    if (voice) {
      utterance.voice = voice;
    }

    utterance.rate = lang === 'ar' ? 0.95 : 1.0;
    utterance.pitch = 1.05;

    utterance.onstart = () => {
      this.setSpeaking(true);
      if (onStart) onStart();
    };

    utterance.onend = () => {
      this.setSpeaking(false);
      this.currentUtterance = null;
      if (onEnd) onEnd();
    };

    utterance.onerror = () => {
      this.setSpeaking(false);
      this.currentUtterance = null;
      if (onEnd) onEnd();
    };

    this.currentUtterance = utterance;
    try {
      this.synth.speak(utterance);
    } catch {
      this.setSpeaking(false);
    }
  }

  public replay() {
    if (this.lastSpokenText) {
      this.speak(this.lastSpokenText, this.lastSpokenLang);
    }
  }

  public cancel() {
    if (this.synth) {
      try {
        this.synth.cancel();
      } catch {
        // ignore
      }
    }
    this.setSpeaking(false);
    this.currentUtterance = null;
  }
}

export const speechManager = new SpeechManager();
