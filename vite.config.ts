import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  preview: {
    allowedHosts: ["nonzodiacal-harlow-superfine.ngrok-free.dev"],
  },
  server: {
    host: "0.0.0.0",
    allowedHosts: ["nonzodiacal-harlow-superfine.ngrok-free.dev"],
  },
});
