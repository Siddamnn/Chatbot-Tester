# Contributing to SpeakGenie Chatbot Tester

Thank you for your interest in contributing to SpeakGenie Chatbot Tester! We welcome contributions from the community.

## 🚀 Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/your-username/SpeakGenie-Chatbot-Tester.git
   cd SpeakGenie-Chatbot-Tester
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Create a branch** for your feature:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## 📋 Development Guidelines

### Code Style

- Use TypeScript for all new code
- Follow the existing code formatting (Prettier is configured)
- Use meaningful variable and function names
- Add comments for complex logic

### Commit Messages

Follow the conventional commit format:
- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation changes
- `style:` for formatting changes
- `refactor:` for code refactoring
- `test:` for adding tests

Example: `feat: add OpenAI integration for chatbot`

### Testing

- Run `npm run typecheck` before submitting
- Run `npm run lint` to check code quality
- Test your changes in both development and production builds

## 🎯 Areas for Contribution

### High Priority
- **Real STT Implementation** - Replace mock with actual speech-to-text
- **Additional AI Providers** - OpenAI, Anthropic, etc.
- **Enhanced TTS** - Better voice options and controls
- **Mobile Optimization** - Improve mobile user experience

### Medium Priority
- **Chat History** - Persistent conversation storage
- **Export Features** - Download chat transcripts
- **Voice Cloning** - Advanced TTS features
- **Analytics** - Usage statistics and insights

### Low Priority
- **Themes** - Additional UI themes
- **Internationalization** - Multi-language support
- **Accessibility** - Enhanced a11y features
- **Performance** - Optimization improvements

## 🐛 Bug Reports

When reporting bugs, please include:

1. **Description** - Clear description of the issue
2. **Steps to Reproduce** - Detailed steps to recreate the bug
3. **Expected Behavior** - What should have happened
4. **Actual Behavior** - What actually happened
5. **Environment** - OS, browser, Node.js version
6. **Screenshots** - If applicable

## 💡 Feature Requests

For feature requests, please:

1. **Check existing issues** first
2. **Provide context** - Why is this feature needed?
3. **Describe the solution** - How should it work?
4. **Consider alternatives** - Are there other ways to solve this?

## 📝 Pull Request Process

1. **Update documentation** if needed
2. **Add tests** for new functionality
3. **Ensure CI passes** (linting, type checking)
4. **Provide clear description** of changes
5. **Link related issues** if applicable

### Pull Request Template

```markdown
## Description
Brief description of what this PR does.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Refactoring
- [ ] Performance improvement

## Testing
- [ ] I have tested these changes locally
- [ ] I have run `npm run typecheck`
- [ ] I have run `npm run lint`

## Related Issues
Fixes #(issue number)
```

## 🔧 Development Setup

### Environment Variables

Create `.env.local`:
```env
GOOGLE_GENAI_API_KEY=your_key_here
```

### Running the Project

```bash
# Development server
npm run dev

# Genkit server (separate terminal)
npm run genkit:dev

# Type checking
npm run typecheck

# Linting
npm run lint
```

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Genkit Documentation](https://firebase.google.com/docs/genkit)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

## 🤝 Community

- Be respectful and inclusive
- Help others learn and grow
- Provide constructive feedback
- Follow the code of conduct

## 📄 Code of Conduct

- **Be respectful** - Treat everyone with respect
- **Be inclusive** - Welcome people of all backgrounds
- **Be collaborative** - Work together effectively
- **Be professional** - Maintain professional standards

## ❓ Questions?

Feel free to:
- Open an issue for questions
- Start a discussion on GitHub
- Reach out to maintainers

Thank you for contributing! 🎉
