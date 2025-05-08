# VUEVN Framework

VUEVN is a no-code framework for building Vue.js VN games through a visual editor. It consists of two main components:

## Components

### 1. VUEVN Editor
- Electron-based Vue application
- Visual no-code interface
- JSON-based project storage
- Project export functionality
- Portable application bundling

### 2. VUEVN Engine
- JSON parser and code generator
- Vue component generation
- Runtime execution engine

## Project Structure

```
vuevn/
├── packages/
│   ├── editor/     # Electron-based editor application
│   ├── engine/     # Core engine for parsing and code generation
│   └── runtime/    # Runtime components for generated apps
```

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the editor in development mode:
```bash
npm run dev:editor
```

3. Build the engine:
```bash
npm run build:engine
```

## Development

- `npm run dev:editor` - Start the editor in development mode
- `npm run build:editor` - Build the editor application
- `npm run build:engine` - Build the engine
- `npm run build:runtime` - Build the runtime components

## License

MIT
