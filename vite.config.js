import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: "@", replacement: "/src/*" },
      { find: "@routes", replacement: "/src/router/routes.jsx" },
      { find: "@pages", replacement: "/src/pages/index.jsx" },
      { find: "@validation", replacement: "/src/utils/index.js" },
      { find: "@modal", replacement: "/src/components/modals/index.jsx" },
      { find: "@ui", replacement: "/src/components/ui/index.jsx" },
      { find: "@service", replacement: "/src/service/index.js" },
    ],
  },
});
