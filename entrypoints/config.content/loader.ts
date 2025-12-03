import { ReSkinConfig } from "@/types/config";

async function loadConfig(): Promise<ReSkinConfig | undefined> {
    return (await browser.runtime.sendMessage({ action: "getConfig" })) as ReSkinConfig | undefined;
}

function onConfigChange(callback: (field: string, value: any) => void) {
    browser.runtime.onMessage.addListener((m) => {
        if (m.action == "configUpdate") {
            callback(m.field, m.value);
        }
    });
}

export { loadConfig, onConfigChange };
