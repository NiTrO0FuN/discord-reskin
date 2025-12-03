import { defineConfig } from "wxt";
import Tailwindcss from "@tailwindcss/vite";

// See https://wxt.dev/api/config.html
export default defineConfig({
    modules: ["@wxt-dev/module-vue", "@wxt-dev/auto-icons"],
    vite: () => ({
        plugins: [Tailwindcss()],
        ssr: {
            // List any dependencies that depend on webextension-polyfill here for vite-node importer to work
            noExternal: ["@webext-core/proxy-service", "@webext-core/messaging"],
        },
    }),
    manifest: ({ browser, manifestVersion, mode, command }) => {
        const firefox =
            browser == "firefox"
                ? {
                      browser_specific_settings: {
                          data_collection_permissions: "none",
                      },
                  }
                : {};
        return {
            name: "__MSG_extName__",
            description: "__MSG_extDescription__",
            default_locale: "en",
            web_accessible_resources: [
                {
                    resources: ["masks/*.html"],
                    matches: ["*://discord.com/*"],
                },
            ],
            permissions: ["storage"],
            ...firefox,
        };
    },
    autoIcons: {
        baseIconPath: "assets/icon.svg",
        developmentIndicator: "overlay",
    },
});
