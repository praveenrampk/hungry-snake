// src/pages/content/index.ts
console.log("Content script loaded");

const ws = new WebSocket("wss://localhost:5173/");

ws.onopen = () => {
  console.log("WebSocket connection established.");
};

ws.onclose = () => {
  console.log("WebSocket connection closed.");
};
