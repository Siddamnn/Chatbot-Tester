'use client';
import { toast } from '@/hooks/use-toast';

export const speak = (text: string) => {
  if (typeof window === 'undefined' || !window.speechSynthesis) {
    toast({
      variant: 'destructive',
      title: 'TTS Error',
      description: 'Text-to-Speech is not supported in this browser.',
    });
    return;
  }

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  utterance.rate = 1;
  utterance.pitch = 1;

  // Cancel any previous speech to avoid overlap
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
};
