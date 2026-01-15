# Vue HintAssistant plugin for Vue.Js

A Vue 3 plugin for executing code snippets via API and displaying results. Built with TypeScript and Axios.

## Plugin Figma Design 
<img width="1956" height="1078" alt="image" src="https://github.com/user-attachments/assets/e1cee0bb-345b-4b77-a8cc-59ef428fcb6c" />


[Figma Link](https://www.figma.com/design/laysuH8lJanr37ZCR2HUpm/Bakalarka-komponent?node-id=0-1&t=GMB5zaetauqlHPvO-1)


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
