# Vue HintAssistant plugin for Vue.Js

A Vue 3 plugin for executing code snippets via API and displaying results. Built with TypeScript and Axios.

![Plugin Screenshot](https://via.placeholder.com/800x400/667eea/ffffff?text=Code+Executor+Plugin)

## Installation

```bash
npm install vue-hint-assistant
```

## Props

- `sourceCode` (string, required) - Code to execute

## Project Structure

```
src/
├── styles/
│   └── index.css
├── App.vue
└── main.ts
```

## How It Works

1. Pass code as `sourceCode` prop
2. Plugin sends POST request with Axios to API
3. API analyzes code and returns a Hint response
4. Response displayed to user


## Author
Dominik Takáč

Bachelor Thesis Project
