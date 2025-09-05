'use client';
import { useState, useRef, useEffect, type FormEvent } from 'react';
import { getChatbotResponse } from '@/app/actions';
import { speak } from '@/lib/tts';
import { startListening } from '@/lib/stt';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Loader2, Mic, Send, Volume2 } from 'lucide-react';
import { ChatMessage } from './chat-message';
import { useToast } from '@/hooks/use-toast';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  metrics?: {
    responseTime: number;
    wordCount: number;
  };
}

interface ChatInterfaceProps {
  llmModule: string;
  useTts: boolean;
  useStt: boolean;
}

const initialMessages: Message[] = [
  {
    id: 'init-1',
    role: 'assistant',
    content: "Hello! I'm the Chatbot Benchmarker. Adjust the settings on the left and send a message to test me out.",
  }
];

export function ChatInterface({ llmModule, useTts, useStt }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleStt = () => {
    if (isListening) return;
    setIsListening(true);
    startListening(
      (transcript) => setInput(prev => prev + transcript),
      () => setIsListening(false)
    )(); // Immediately call the returned stop function for mock behavior
    setIsListening(false);
  };

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    const userInput = input;
    if (!userInput.trim() || isLoading) return;

    setIsLoading(true);
    setInput('');

    const userMessage: Message = { id: Date.now().toString(), role: 'user', content: userInput };
    const loadingMessage: Message = { id: (Date.now() + 1).toString(), role: 'assistant', content: '...' };
    setMessages(prev => [...prev, userMessage, loadingMessage]);

    const response = await getChatbotResponse({ request: userInput, llmModule });

    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: response.response,
      metrics: {
        responseTime: response.responseTime,
        wordCount: response.wordCount,
      },
    };

    setMessages(prev => [...prev.slice(0, -1), botMessage]);

    if (useTts) {
      speak(response.response);
    }
    setIsLoading(false);
  };

  const handlePlayAudio = (text: string) => {
    if (!useTts) {
      toast({
        title: 'Text-to-Speech Disabled',
        description: 'Enable Text-to-Speech in the settings to use this feature.',
      });
    }
    speak(text);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-65px)]">
      <div ref={scrollAreaRef} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} onPlayAudio={handlePlayAudio} />
        ))}
      </div>
      <div className="p-4 border-t bg-card/80 backdrop-blur-sm">
        <form onSubmit={handleSendMessage} className="relative">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message here..."
            className="pr-24 min-h-[52px] resize-none"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage(e);
              }
            }}
            rows={1}
            disabled={isLoading}
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-2">
            {useStt && (
              <Button type="button" variant="ghost" size="icon" onClick={handleStt} disabled={isListening || isLoading} aria-label="Use microphone">
                {isListening ? <Loader2 className="animate-spin" /> : <Mic />}
              </Button>
            )}
            <Button type="submit" size="icon" disabled={!input.trim() || isLoading} aria-label="Send message">
              {isLoading ? <Loader2 className="animate-spin" /> : <Send />}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
