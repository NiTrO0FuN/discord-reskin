import { toRaw } from "vue";

export default defineBackground(() => {
    browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
        if (message.action == "getConfig") {
            sendResponse(useConfig().then((c) => toRaw(c)));
        }
    });
});
