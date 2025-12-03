// @vitest-environment happy-dom

import { describe, it, expect, vi, beforeEach, afterAll } from "vitest";
import { mount, flushPromises } from "@vue/test-utils";
import { nextTick } from "vue";
import Options from "@/components/Options.vue";

function OptionComponent() {
    return defineComponent({
        components: { Options },
        template: "<Suspense><Options/></Suspense>",
    });
}

describe("Options.vue component", () => {
    let getMessageSpy: any;

    beforeEach(() => {
        fakeBrowser.reset();
        getMessageSpy = vi.spyOn(browser.i18n, "getMessage").mockImplementation((key) => {
            const messages: Record<string, string> = {
                avatarStyle: "Custom Avatar Label",
                backgroundImage: "Custom Background Label",
                backgroundImageLink: "Custom Placeholder",
            };
            return messages[key] || key;
        });
    });

    afterAll(() => {
        vi.restoreAllMocks();
    });

    it("should render a row for each config field", async () => {
        const wrapper = mount(OptionComponent());
        await flushPromises();

        const rows = wrapper.findAll(".optionRow");

        // Two rows: one for avatar, one for backgroundImage change to dynamic
        expect(rows).toHaveLength(2);
    });

    describe("Avatar Configuration", () => {
        it("should display avatar image element", async () => {
            const wrapper = mount(OptionComponent());
            await flushPromises();

            const avatarImg = wrapper.find("#avatar");

            expect(avatarImg.exists()).toBe(true);
            expect(avatarImg.attributes("src")).toBe(
                "https://cdn.discordapp.com/embed/avatars/0.png"
            );
        });

        it("should apply round class to avatar when config.avatar is 'round'", async () => {
            const config = await useConfig();
            config.avatar = "round";

            const wrapper = mount(OptionComponent());
            await flushPromises();

            const avatarImg = wrapper.find("#avatar");

            expect(avatarImg.classes()).toContain("round");
        });

        it("should not apply round class to avatar when config.avatar is 'rect'", async () => {
            const config = await useConfig();
            config.avatar = "rect";

            await nextTick();

            const wrapper = mount(OptionComponent());
            await flushPromises();

            const avatarImg = wrapper.find("#avatar");

            expect(avatarImg.classes()).not.toContain("round");
            expect(avatarImg.classes()).toContain("rect");
        });

        it("should toggle avatar from 'round' to 'rect' on click", async () => {
            const config = await useConfig();
            config.avatar = "round";

            const wrapper = mount(OptionComponent());
            await flushPromises();

            const avatarImg = wrapper.find("#avatar");

            await avatarImg.trigger("click");
            await nextTick();

            expect(config.avatar).toBe("rect");
        });

        it("should toggle avatar from 'rect' to 'round' on click", async () => {
            const config = await useConfig();
            config.avatar = "rect";

            await nextTick();

            const wrapper = mount(OptionComponent());
            await flushPromises();

            const avatarImg = wrapper.find("#avatar");

            await avatarImg.trigger("click");
            await nextTick();

            expect(config.avatar).toBe("round");
        });

        it("should toggle avatar multiple times correctly", async () => {
            const config = await useConfig();
            config.avatar = "round";

            const wrapper = mount(OptionComponent());
            await flushPromises();

            const avatarImg = wrapper.find("#avatar");

            // First click: round -> rect
            await avatarImg.trigger("click");
            await nextTick();
            expect(config.avatar).toBe("rect");

            // Second click: rect -> round
            await avatarImg.trigger("click");
            await nextTick();
            expect(config.avatar).toBe("round");

            // Third click: round -> rect
            await avatarImg.trigger("click");
            await nextTick();
            expect(config.avatar).toBe("rect");
        });
    });

    describe("Background Image Configuration", () => {
        it("should render backgroundImage input element", async () => {
            const wrapper = mount(OptionComponent());
            await flushPromises();

            const bgInput = wrapper.find("#backgroundImage");

            expect(bgInput.exists()).toBe(true);
            expect(bgInput.attributes("type")).toBe("url");
        });

        it("should bind backgroundImage input to config.backgroundImage", async () => {
            const config = await useConfig();
            config.backgroundImage = "http://example.com/bg.jpg";

            const wrapper = mount(OptionComponent());
            await flushPromises();
            const bgInput = wrapper.find<HTMLInputElement>("#backgroundImage");

            expect(bgInput.element.value).toBe("http://example.com/bg.jpg");
        });

        it("should update config when backgroundImage input changes", async () => {
            const config = await useConfig();
            config.backgroundImage = "";

            const wrapper = mount(OptionComponent());
            await flushPromises();

            const bgInput = wrapper.find<HTMLInputElement>("#backgroundImage");

            bgInput.element.value = "http://new-image.com/bg.png";
            await bgInput.trigger("input");
            await nextTick();

            expect(config.backgroundImage).toBe("http://new-image.com/bg.png");
        });

        it("should apply round class based on config.avatar", async () => {
            const config = await useConfig();
            config.avatar = "round";

            const wrapper = mount(OptionComponent());
            await flushPromises();

            const bgInput = wrapper.find("#backgroundImage");

            expect(bgInput.classes()).toContain("round");
        });

        it("should remove round class when config.avatar changes to rect", async () => {
            const config = await useConfig();

            const wrapper = mount(OptionComponent());
            await flushPromises();

            config.avatar = "rect";
            await nextTick();
            await wrapper.vm.$nextTick();

            const bgInput = wrapper.find("#backgroundImage");
            expect(bgInput.classes()).not.toContain("round");
            expect(bgInput.classes()).toContain("rect");
        });

        // Test does not work
        // it("should show background image behind input when URL is set", async () => {
        //     const config = await useConfig();
        //     config.backgroundImage = "http://example.com/bg.jpg";

        //     await nextTick();

        //     const wrapper = mount(OptionComponent());
        //     await flushPromises();

        //     const bgImageRow = wrapper.find("div:has(> #backgroundImage)");

        //     expect(getComputedStyle(bgImageRow.element).backgroundImage).toContain(
        //         "http://example.com/bg.jpg"
        //     );
        // });
    });

    describe("i18n Integration", () => {
        it("should use browser.i18n.getMessage for labels", async () => {
            const wrapper = mount(OptionComponent());
            await flushPromises();

            expect(getMessageSpy).toHaveBeenCalledWith("avatarStyle");
            expect(getMessageSpy).toHaveBeenCalledWith("backgroundImage");
            expect(getMessageSpy).toHaveBeenCalledWith("backgroundImageLink");
        });

        it("should use correct placeholder for backgroundImage input", async () => {
            const wrapper = mount(OptionComponent());
            await flushPromises();

            const bgInput = wrapper.find("#backgroundImage");

            expect(bgInput.attributes("placeholder")).toBe("Custom Placeholder");
        });
    });
});
