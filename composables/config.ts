import { Reactive } from "vue";
import { ReSkinConfig } from "@/types/config";

async function sendUpdate(field: string, value: any) {
    const tabs = await browser.tabs.query({ url: "*://discord.com/*" });
    for (const tab of tabs) {
        if (!tab.id) continue;
        browser.tabs.sendMessage(tab.id, {
            action: "configUpdate",
            field,
            value,
        });
    }
}

export async function useConfig() {
    const avatarStorage = storage.defineItem<ReSkinConfig["avatar"]>("local:config:avatar", {
        fallback: "round",
    });

    const bgImageStorage = storage.defineItem<ReSkinConfig["backgroundImage"]>(
        "local:config:backgroundImage",
        { fallback: "" }
    );

    // Create config
    const config: Reactive<ReSkinConfig> = reactive({
        avatar: await avatarStorage.getValue(),
        backgroundImage: await bgImageStorage.getValue(),
    });

    // Watch storage change
    avatarStorage.watch((a) => (config.avatar = a));
    bgImageStorage.watch((i) => (config.backgroundImage = i));

    // Watch config change
    watch(
        () => config.avatar,
        (a) => {
            avatarStorage.setValue(a);
            sendUpdate("avatar", a);
        }
    );

    watch(
        () => config.backgroundImage,
        (i) => {
            bgImageStorage.setValue(i);
            sendUpdate("backgroundImage", i);
        }
    );

    return config;
}
