'use client';

import { useState } from 'react';
import { ChatInterface } from '@/components/chat-interface';
import { Logo } from '@/components/icons';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

type LlmModule = 'default' | 'advanced' | 'creative';

export default function Home() {
  const [llmModule, setLlmModule] = useState<LlmModule>('default');
  const [useStt, setUseStt] = useState(false);
  const [useTts, setUseTts] = useState(false);

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <Logo className="size-8 text-primary" />
            <h1 className="text-xl font-semibold font-headline">
              Chatbot Benchmarker
            </h1>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Settings</SidebarGroupLabel>
            <div className="space-y-6 p-2">
              <div className="space-y-2">
                <Label htmlFor="llm-module">Chatbot Model</Label>
                <Select
                  value={llmModule}
                  onValueChange={(value: LlmModule) => setLlmModule(value)}
                >
                  <SelectTrigger id="llm-module">
                    <SelectValue placeholder="Select a model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                    <SelectItem value="creative">Creative</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                <div className='space-y-0.5'>
                  <Label htmlFor="stt-switch">Speech-to-Text</Label>
                  <p className="text-xs text-muted-foreground">
                    Enable voice input (mock).
                  </p>
                </div>
                <Switch id="stt-switch" checked={useStt} onCheckedChange={setUseStt} />
              </div>
              <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                <div className='space-y-0.5'>
                  <Label htmlFor="tts-switch">Text-to-Speech</Label>
                   <p className="text-xs text-muted-foreground">
                    Enable voice output.
                  </p>
                </div>
                <Switch id="tts-switch" checked={useTts} onCheckedChange={setUseTts} />
              </div>
            </div>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="flex items-center justify-between p-4 border-b bg-card/80 backdrop-blur-sm sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="md:hidden" />
            <h2 className="text-lg font-semibold font-headline">Conversation</h2>
          </div>
        </header>
        <ChatInterface
          llmModule={llmModule}
          useTts={useTts}
          useStt={useStt}
        />
      </SidebarInset>
    </SidebarProvider>
  );
}
