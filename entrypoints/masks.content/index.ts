import { ContentScriptContext } from "#imports";
import { insertCustomMasks } from "@/utils/masks";
import "./style.css";

export default defineContentScript({
    matches: ["*://discord.com/*"],
    main(ctx) {
        uiHandler(ctx);
    },
});

function uiHandler(ctx: ContentScriptContext) {
    const ui = createIntegratedUi(ctx, {
        position: "inline",
        anchor: "#app-mount > svg:first-of-type",
        append: "before",
        onMount: async (container) => {
            await insertCustomMasks(container);
        },
    });

    ui.autoMount();
}
