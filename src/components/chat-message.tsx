'use client';
import type { Message } from './chat-interface';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter } from './ui/card';
import { Skeleton } from './ui/skeleton';
import { Clock, Pilcrow, Volume2 } from 'lucide-react';
import { Logo } from './icons';

interface ChatMessageProps {
  message: Message;
  onPlayAudio: (text: string) => void;
}

export function ChatMessage({ message, onPlayAudio }: ChatMessageProps) {
  if (message.role === 'user') {
    return (
      <div className="flex justify-end group">
        <div className="bg-primary text-primary-foreground rounded-xl rounded-br-none p-3 max-w-md shadow-md">
          <p className="whitespace-pre-wrap">{message.content}</p>
        </div>
      </div>
    );
  }

  if (message.role === 'assistant') {
    return (
      <div className="flex items-start gap-3 group">
        <Avatar className="shadow-sm">
          <AvatarFallback className="bg-card text-primary">
            <Logo className="size-5" />
          </AvatarFallback>
        </Avatar>
        <Card className="flex-1 max-w-md shadow-sm">
          <CardContent className="p-3">
            {message.content === '...' ? (
              <div className="space-y-2">
                <Skeleton className="h-4 w-4/5" />
                <Skeleton className="h-4 w-3/5" />
              </div>
            ) : (
              <p className="whitespace-pre-wrap">{message.content}</p>
            )}
          </CardContent>
          {message.metrics && (
            <CardFooter className="p-2 border-t justify-between text-xs text-muted-foreground items-center">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1" title="Response Time">
                  <Clock size={14} /> {message.metrics.responseTime} ms
                </div>
                <div className="flex items-center gap-1" title="Word Count">
                  <Pilcrow size={14} /> {message.metrics.wordCount} words
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-muted-foreground hover:text-foreground"
                onClick={() => onPlayAudio(message.content)}
                aria-label="Play audio"
              >
                <Volume2 size={14} />
              </Button>
            </CardFooter>
          )}
        </Card>
      </div>
    );
  }

  return null;
}
