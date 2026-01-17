import { defineConfig } from "shadcn-ui/config";

export default defineConfig({
  $schema: "https://ui.shadcn.com/schema.json",
  outDir: "./components/ui",
  aliases: {
    components: "@/components",
    utils: "@/lib/utils"
  }
});
