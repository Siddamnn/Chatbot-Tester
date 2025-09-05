# 🤖 SpeakGenie Chatbot Tester

A modern, AI-powered chatbot testing application built with Next.js 15, featuring speech-to-text and text-to-speech capabilities. Test and benchmark different AI models with real-time performance metrics.

![Next.js](https://img.shields.io/badge/Next.js-15.3.3-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-38B2AC)
![Google Genkit](https://img.shields.io/badge/Google_Genkit-1.14.1-4285F4)

## ✨ Features

- 🧠 **AI-Powered Conversations** - Integrated with Google Gemini 2.5 Flash via Genkit
- 🎤 **Speech-to-Text** - Voice input capabilities (mock implementation ready for real STT)
- 🔊 **Text-to-Speech** - Audio output using Web Speech API
- 📊 **Performance Metrics** - Real-time response time and word count tracking
- 🎛️ **Model Selection** - Switch between different chatbot models (Default, Advanced, Creative)
- 📱 **Responsive Design** - Modern UI with Tailwind CSS and Radix UI components
- 🎨 **Dark/Light Mode** - Adaptive theming support
- ⚡ **Real-time Updates** - Live chat interface with loading states
- 🔧 **Modular Architecture** - Easy to extend and modify AI vendors

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Google AI API key (for Gemini)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/TheUnofficialGod/SpeakGenie-Chatbot-Tester.git
   cd SpeakGenie-Chatbot-Tester
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   GOOGLE_GENAI_API_KEY=your_google_ai_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Start the Genkit development server** (in a separate terminal)
   ```bash
   npm run genkit:dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:9002](http://localhost:9002)

## 🛠️ Available Scripts

- `npm run dev` - Start Next.js development server (port 9002)
- `npm run genkit:dev` - Start Genkit development server
- `npm run genkit:watch` - Start Genkit in watch mode
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint for code quality
- `npm run typecheck` - Run TypeScript type checking

## 📁 Project Structure

```
src/
├── ai/                          # AI integration and flows
│   ├── genkit.ts               # Genkit configuration
│   ├── dev.ts                  # Development entry point
│   └── flows/                  # AI flow definitions
│       ├── modular-llm-injection.ts  # Main LLM flow
│       └── select-llm.ts       # LLM selection logic
├── app/                        # Next.js app directory
│   ├── actions.ts             # Server actions
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Main page component
│   └── globals.css            # Global styles
├── components/                 # React components
│   ├── chat-interface.tsx     # Main chat component
│   ├── chat-message.tsx       # Message display component
│   ├── icons.tsx              # Custom icons
│   └── ui/                    # Reusable UI components
├── hooks/                     # Custom React hooks
│   ├── use-mobile.tsx         # Mobile detection
│   └── use-toast.ts           # Toast notifications
└── lib/                       # Utility libraries
    ├── stt.ts                 # Speech-to-Text utilities
    ├── tts.ts                 # Text-to-Speech utilities
    └── utils.ts               # General utilities
```

## 🎯 Usage

### Basic Chat

1. Open the application in your browser
2. Type a message in the chat input
3. Press Enter or click Send
4. View the AI response with performance metrics

### Speech Features

1. **Text-to-Speech**: Click the volume icon on any bot message to hear it spoken
2. **Speech-to-Text**: Enable STT in the sidebar and click the microphone button (currently mock)

### Model Selection

Use the sidebar to switch between different chatbot models:
- **Default**: Google Gemini 2.5 Flash (fast, efficient)
- **Advanced**: Configured for more complex reasoning
- **Creative**: Optimized for creative responses

## 🔧 Customization

### Adding New AI Providers

1. **Install the provider plugin**:
   ```bash
   npm install @genkit-ai/openai  # Example for OpenAI
   ```

2. **Update the Genkit configuration** in `src/ai/genkit.ts`:
   ```typescript
   import { openAI } from '@genkit-ai/openai';
   
   export const ai = genkit({
     plugins: [googleAI(), openAI()],
     model: 'googleai/gemini-2.5-flash',
   });
   ```

3. **Modify the flow** in `src/ai/flows/modular-llm-injection.ts` to use different models based on selection.

### Implementing Real STT

Replace the mock implementation in `src/lib/stt.ts`:

```typescript
export const startListening = (onResult: (text: string) => void, onEnd: () => void) => {
  const recognition = new webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.onresult = (event) => {
    const transcript = event.results[event.results.length - 1][0].transcript;
    onResult(transcript);
  };
  recognition.onend = onEnd;
  recognition.start();
  return () => recognition.stop();
};
```

### Customizing TTS

Enhance the TTS implementation in `src/lib/tts.ts`:

```typescript
export const speak = (text: string, options?: { voice?: string; rate?: number }) => {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = options?.rate || 0.9;
  
  if (options?.voice) {
    const voices = speechSynthesis.getVoices();
    const voice = voices.find(v => v.name.includes(options.voice));
    if (voice) utterance.voice = voice;
  }
  
  speechSynthesis.speak(utterance);
};
```

## 🌐 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Add environment variables in the Vercel dashboard
4. Deploy automatically on every push

### Firebase Hosting

```bash
npm run build
npm install -g firebase-tools
firebase login
firebase init
firebase deploy
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🔒 Environment Variables

Create a `.env.local` file with:

```env
# Required
GOOGLE_GENAI_API_KEY=your_google_ai_api_key

# Optional (for additional providers)
OPENAI_API_KEY=your_openai_api_key
ANTHROPIC_API_KEY=your_anthropic_api_key
ELEVENLABS_API_KEY=your_elevenlabs_api_key
```

## 📊 Performance Metrics

The application tracks:
- **Response Time**: Milliseconds from request to response
- **Word Count**: Number of words in the AI response
- **Model Used**: Which AI model generated the response

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Troubleshooting

### Common Issues

**Genkit server won't start:**
- Ensure you have the correct API keys in `.env.local`
- Check that port 4000 is available
- Restart both development servers

**Speech features not working:**
- STT: Currently mock implementation - enable microphone permissions for real STT
- TTS: Ensure your browser supports Web Speech API

**Build errors:**
- Run `npm run typecheck` to identify TypeScript issues
- Clear `.next` directory: `rm -rf .next`

### Getting Help

- Check the [Genkit Documentation](https://firebase.google.com/docs/genkit)
- Review [Next.js Documentation](https://nextjs.org/docs)
- Open an issue on GitHub

## 🙏 Acknowledgments

- [Google Genkit](https://firebase.google.com/products/genkit) for AI integration
- [Radix UI](https://www.radix-ui.com/) for accessible UI components
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Lucide React](https://lucide.dev/) for beautiful icons

---

**Built with ❤️ by [TheUnofficialGod](https://github.com/TheUnofficialGod)**
