import { toRaw } from "vue";

export default defineBackground(() => {
    browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
        if (message.action == "getConfig") {
            useConfig().then((c) => sendResponse(toRaw(c)));
            return true;
        }
    });
});
