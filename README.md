# Priscilla AI — Vue 3 Code Hint Assistant Plugin

A Vue 3 plugin that provides AI-powered code hints by extracting code from the DOM via XPath and sending it to an API for analysis. Built with TypeScript and Axios.

## Plugin Figma Design 
<img width="1956" height="1078" alt="image" src="https://github.com/user-attachments/assets/e1cee0bb-345b-4b77-a8cc-59ef428fcb6c" />


[Figma Link](https://www.figma.com/design/laysuH8lJanr37ZCR2HUpm/Bakalarka-komponent?node-id=0-1&t=GMB5zaetauqlHPvO-1)


## Features

✨ **XPath-based Code Extraction** — Extract code from any element using XPath expressions  
🤖 **AI-Powered Hints** — Get intelligent hints about your code from an LLM API  
📦 **Type-Safe** — Full TypeScript support with type definitions  
♿ **Accessible** — Built with ARIA labels and semantic HTML  
🎨 **Styled UI** — Clean, minimal assistant interface with loading states  
⚡ **Cancellable Requests** — Abort in-flight requests when unmounting or requesting new hints  

## Installation

### npm
```bash
npm install @priscilla/vue-ai-assistant
```

### pnpm
```bash
pnpm add @priscilla/vue-ai-assistant
```

## Setup

**1. Register the plugin in your Vue app:**

```typescript
// src/main.ts
import { createApp } from 'vue'
import App from './App.vue'
import { createPriscillaAI } from '@priscilla/vue-ai-assistant'

const app = createApp(App)

// Initialize with your API endpoint
app.use(createPriscillaAI('https://api.example.com/api/predict/hint'))

app.mount('#app')
```

**2. The `PriscillaAI` component will be globally available.**

## Usage

### Basic Example

```vue
<template>
  <div>
    <textarea id="code-block">
function fibonacci(n) {
  if (n <= 1) return n
  return fibonacci(n - 1) + fibonacci(n - 2)
}
    </textarea>

    <!-- Add the AI assistant -->
    <PriscillaAI
      xpath="//textarea[@id='code-block']"
      :chapterId="12"
      :programId="589"
    />
  </div>
</template>
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `xpath` | `string` | ✅ Yes | XPath expression to extract code from the DOM (must be valid and non-empty) |
| `chapterId` | `number` | ✅ Yes | Chapter identifier for the code context (must be positive integer) |
| `programId` | `number` | ✅ Yes | Program identifier for the code context (must be positive integer) |

### Props Example

```vue
<PriscillaAI
  xpath="//textarea[@id='user-code']"
  :chapterId="5"
  :programId="102"
/>
```

## Component Features

- 🎯 **Toggle Button** — Click the 🤖 icon to open/close the assistant
- 📝 **Code Display** — Shows extracted code for verification
- 💡 **Hint Display** — Displays AI-generated hints
- ⚠️ **Error Handling** — Shows clear error messages
- ⏳ **Loading States** — Visual feedback while fetching
- 🧹 **Clear Button** — Reset and clear all outputs

## API Response Format

The API endpoint should return a response matching this interface:

```typescript
interface PriscillaAIResponse {
  hint?: string
}
```

### Example API Payload

**Request:**
```json
{
  "content": "function fibonacci(n) { if (n <= 1) return n; return fibonacci(n - 1) + fibonacci(n - 2); }",
  "chapterId": 12,
  "programId": 589
}
```

**Response:**
```json
{
  "hint": "Consider using memoization to avoid recalculating fibonacci numbers. The current implementation has exponential time complexity.",
}
```

## TypeScript Support

Full TypeScript support is included. Import types as needed:

```typescript
import type { PriscillaAIResponse } from '@priscilla/vue-ai-assistant'

// Use in your own code
const response: PriscillaAIResponse = await fetchHint()
```

## Styling

The component uses CSS classes that can be customized:

```css
.priscilla-ai { /* Main container */ }
.assistant-button { /* Toggle button */ }
.assistant-window { /* Modal window */ }
.assistant-header { /* Header */ }
.assistant-body { /* Content area */ }
.assistant-footer { /* Footer with buttons */ }
.code-block { /* Code display */ }
.hint-text { /* Hint text */ }
.error-message { /* Error messages */ }
.loading-spinner { /* Loading indicator */ }
.primary-button { /* "Get Hint" button */ }
.secondary-button { /* "Clear" button */ }
```

## Error Handling

The component handles various error scenarios gracefully:

- **Invalid XPath** — Shows "Invalid XPath expression" error
- **No matching element** — Shows "No element matched the provided XPath" error
- **Empty content** — Shows "Matched element contains no extractable text" error
- **API errors** — Displays API status and error message
- **Network cancellation** — Silently handles request cancellation on unmount

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Any browser supporting Vue 3 and XPath

## Project Structure

```
src/
├── components/
│   └── PriscillaAI.vue       # Main component
├── plugins/
│   └── priscillaAI.ts        # Plugin setup
├── types/
│   └── priscillaAI.ts        # TypeScript interfaces
├── styles/
│   └── index.css             # Component styles
├── App.vue                   # Example usage
└── main.ts                   # Plugin initialization
```

## License

MIT © 2026 Dominik Takáč

## Author

Dominik Takáč  
Bachelor Thesis Project
