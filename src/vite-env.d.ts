/// <reference types="vite/client" />

declare namespace NodeJS {
  interface ProcessEnv {
    VITE_API_BASE_URL: string;
    VITE_NGROK_URL: string;
  }
}
