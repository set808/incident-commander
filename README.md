# O11y Adventure Game 🎮

An interactive terminal-style adventure game that simulates real-world observability scenarios. Learn incident response and troubleshooting through hands-on decision-making in a retro hacker aesthetic.

## 🚀 Features

- **Terminal UI**: Authentic green-on-black terminal styling with retro animations
- **Interactive Storytelling**: Multiple choice decisions that affect the outcome
- **Real O11y Scenarios**: Based on actual observability and incident response situations
- **Typing Animation**: Text appears character-by-character for immersive experience
- **Multiple Endings**: Different resolution paths based on your choices

## 🎯 Current Adventures

### Black Friday Blowup
Navigate a critical checkout service failure during peak Black Friday traffic. You're the only engineer online when errors start spiking - can you identify the root cause and resolve the incident before losing revenue?

**Skills practiced:**
- Error rate analysis
- Log correlation
- Deploy rollback decisions
- Infrastructure scaling
- Root cause analysis

## 🛠️ Tech Stack

- **React** with TypeScript
- **Vite** for fast development
- **Tailwind CSS** for styling
- **Custom CSS** for terminal effects and animations

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd incident-commander
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to `http://localhost:5173`

## 🎮 How to Play

1. Read the scenario text as it types out
2. Review any logs or error messages displayed
3. Choose your action from the available buttons
4. See the command that would be executed in a real scenario
5. Continue making decisions until you reach an ending

## 📁 Project Structure

```
src/
├── adventures/           # Adventure scenarios
│   ├── black_friday_blowup.json
│   └── index.ts
├── types.ts             # TypeScript interfaces
├── App.tsx              # Main application component
├── App.css              # Terminal styling and animations
└── main.tsx             # Application entry point
```

## 🎨 Terminal Styling

The game features:
- **Matrix-style green text** with glow effects
- **Scanline overlay** for authentic CRT monitor feel
- **Flickering animation** to simulate old terminal displays
- **Blinking cursor** for input prompts
- **Monospace font** (Courier New) for code authenticity

## 🔧 Adding New Adventures

Create a new JSON file in `src/adventures/` following this structure:

```json
{
  "title": "Your Adventure Title",
  "description": "Brief description",
  "start": "intro",
  "scenes": {
    "intro": {
      "text": "Opening scenario text",
      "logs": ["Optional log entries"],
      "image": "optional-image.png",
      "choices": [
        {
          "label": "Button text",
          "nextId": "next_scene_id",
          "command": "nr command --that-would-run"
        }
      ]
    }
  }
}
```

Then add it to `src/adventures/index.ts`:

```typescript
import yourAdventure from './your_adventure.json';

const adventures: Record<string, Adventure> = {
  your_adventure: yourAdventure as Adventure,
  // ... other adventures
};
```

## 🎯 Educational Goals

This game teaches:
- **Observability fundamentals** - metrics, logs, traces
- **Incident response** - triage, investigation, resolution
- **Decision making** under pressure
- **Tool familiarity** - common o11y commands and workflows
- **Root cause analysis** - correlation vs causation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-adventure`)
3. Add your adventure or improvements
4. Commit your changes (`git commit -am 'Add new adventure'`)
5. Push to the branch (`git push origin feature/new-adventure`)
6. Create a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🎮 Play Now

Ready to test your observability skills? Start the game and see if you can save Black Friday! 

```bash
npm run dev
```

---

*Made with ❤️ for the observability community*
