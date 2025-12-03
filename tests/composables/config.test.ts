import { describe, it, expect, vi, beforeEach, afterAll } from "vitest";

describe("useConfig composable", () => {
    beforeEach(() => {
        fakeBrowser.reset();
        vi.spyOn(browser.tabs, "sendMessage").mockReturnValue();
    });

    afterAll(() => {
        vi.restoreAllMocks();
    });

    it("initializes config correctly when not found in storage", async () => {
        const config = await useConfig();

        expect(config.avatar).toBe("round");
        expect(config.backgroundImage).toBe("");
    });

    it("retrieves correctly the config if stored", async () => {
        const avatarStorage = storage.defineItem("local:config:avatar", { fallback: "round" });
        const bgImageStorage = storage.defineItem("local:config:backgroundImage", { fallback: "" });

        await avatarStorage.setValue("rect");
        await bgImageStorage.setValue("http://example.com/bg.jpg");

        const config = await useConfig();

        expect(config.avatar).toBe("rect");
        expect(config.backgroundImage).toBe("http://example.com/bg.jpg");
    });

    it("sends update when a config field changes and a discord tab is open", async () => {
        vi.spyOn(browser.tabs, "query").mockResolvedValue([{ id: 1 }] as any);
        const sendMessageMock = vi.spyOn(browser.tabs, "sendMessage");

        const config = await useConfig();
        config.avatar = "rect";

        await nextTick();

        expect(sendMessageMock).toHaveBeenCalledWith(1, {
            action: "configUpdate",
            field: "avatar",
            value: "rect",
        });
    });
});
