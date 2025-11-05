import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const NGROK_URL = env.VITE_NGROK_URL;

  return {
    plugins: [react(), tailwindcss()],
    preview: {
      allowedHosts: [NGROK_URL],
    },
    server: {
      host: "0.0.0.0",
      allowedHosts: [NGROK_URL],
    },
  };
});
