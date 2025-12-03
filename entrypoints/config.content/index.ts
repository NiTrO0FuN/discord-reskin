import { applyConfig, applyConfigChange } from "./applyer";
import { loadConfig, onConfigChange } from "./loader";
import "./style.css";

export default defineContentScript({
    matches: ["*://discord.com/*"],
    async main(ctx) {
        const config = await loadConfig();
        if (config) applyConfig(config);
        onConfigChange(applyConfigChange);
    },
});
