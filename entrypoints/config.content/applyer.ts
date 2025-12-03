import { AvatarBackgroundMaskDefinition, AvatarMaskDefinition } from "@/types/masks";
import { ReSkinConfig } from "@/types/config";

const watchers: Watchers = { avatar: [] };

const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
            if (node.nodeType != 1) continue;
            const element = node as Element;

            const allWatchers: Watcher[] = Object.values(watchers).flat();
            for (const watcher of allWatchers) {
                if (element.matches(watcher.selector)) watcher.callback(element);
                document.querySelectorAll(watcher.selector).forEach((el) => watcher.callback(el));
            }
        }
    }
});
observer.observe(document.body, { childList: true, subtree: true });

function onElementAdded(name: keyof Watchers, selector: string, callback: (el: Element) => void) {
    watchers[name].push({ selector, callback });
    // Also match existing elements immediately
    document.querySelectorAll(selector).forEach((el) => callback(el));
}

const avatarMasks: AvatarMaskDefinition[] = [
    {
        round: "svg-mask-avatar-default",
        rect: "svg-mask-avatar-default-rect",
        sizes: null,
    },
    {
        round: "svg-mask-avatar-status-round-",
        rect: "svg-mask-avatar-status-rect-",
        sizes: [16, 20, 24, 32, 40, 44, 48, 56, 72, 80, 96, 120],
    },
    {
        round: "svg-mask-avatar-status-mobile-",
        rect: "svg-mask-avatar-status-mobile-rect-",
        sizes: [16, 20, 24, 32, 40, 44, 48, 56, 72, 80, 96, 120],
    },
    {
        round: "svg-mask-avatar-status-typing-",
        rect: "svg-mask-avatar-status-typing-rect-",
        sizes: [16, 20, 24, 32, 40, 44, 48, 56, 72, 80, 96, 120],
    },
    {
        round: "svg-mask-diagonal-facepile-",
        rect: "svg-mask-diagonal-facepile-rect-",
        sizes: [16, 20, 24, 32, 40, 48, 56, 72, 80, 96, 120],
    },
    {
        round: "svg-mask-diagonal-facepile-status-",
        rect: "svg-mask-diagonal-facepile-status-rect-",
        sizes: [16, 20, 24, 32, 40, 48, 56, 72, 80, 96, 120],
    },
    {
        round: "svg-mask-diagonal-facepile-typing-",
        rect: "svg-mask-diagonal-facepile-typing-rect-",
        sizes: [16, 20, 24, 32, 40, 48, 56, 72, 80, 96, 120],
    },
    {
        round: "svg-mask-avatar-voice-call-80",
        rect: "svg-mask-avatar-voice-call-rect-80",
        sizes: null,
    },
    {
        round: "svg-mask-avatar-call-icon",
        rect: "svg-mask-avatar-call-icon-rect",
        sizes: null,
    },
    {
        round: "svg-mask-avatar-call-icon-32",
        rect: "svg-mask-avatar-call-icon-rect-32",
        sizes: null,
    },
    {
        round: "svg-mask-avatar-card-round",
        rect: "svg-mask-avatar-card-rect",
        sizes: null,
    },
    {
        round: "svg-mask-avatar-profile-card-round",
        rect: "svg-mask-avatar-profile-card-rect",
        sizes: null,
    },
];
const backgroundMasks: AvatarBackgroundMaskDefinition = {
    header: { round: "svg-mask-avatar-card-round", rect: "svg-mask-avatar-card-rect" },
    profileHeader: {
        round: "svg-mask-avatar-profile-card-round",
        rect: "svg-mask-avatar-profile-card-rect",
    },
    botHeader: { round: "svg-mask-avatar-bot-card-round", rect: "svg-mask-avatar-bot-card-rect" },
};
function applyAvatarConfig(avatar: ReSkinConfig["avatar"]) {
    watchers.avatar = [];

    document.body.style.setProperty("--custom-avatar-radius", avatar == "rect" ? "30%" : "50%");
    const actual = avatar == "rect" ? "round" : "rect";
    const masks = avatarMasks.flatMap((def) =>
        def.sizes
            ? def.sizes.map((s) => {
                  return { actual: def[actual] + s, new: def[avatar] + s };
              })
            : { actual: def[actual], new: def[avatar] }
    );

    masks.forEach((m) =>
        onElementAdded("avatar", `foreignObject[mask*="${m.actual}"]`, (el) => {
            el.setAttribute("mask", `url(#${m.new})`);
        })
    );

    onElementAdded("avatar", '[class^="header_"] foreignObject[mask^="url(#uid"]', (el) =>
        el.setAttribute("mask", `url(#${backgroundMasks.header[avatar]})`)
    );
    onElementAdded(
        "avatar",
        '[class*="user-profile-modal-v2"] foreignObject[mask^="url(#uid"]',
        (el) => el.setAttribute("mask", `url(#${backgroundMasks.profileHeader[avatar]})`)
    );

    onElementAdded(
        "avatar",
        '[class$="user-profile-modal"] foreignObject[mask^="url(#uid"]',
        (el) => el.setAttribute("mask", `url(#${backgroundMasks.botHeader[avatar]})`)
    );
}

async function applyBackgroundConfig(data: ReSkinConfig["backgroundImage"]) {
    if (!data) {
        document.body.classList.remove("customBackground");
        return;
    }

    document.body.style.setProperty("--custom-background", `url(${data})`);
    document.body.classList.add("customBackground");
}

function applyConfig(config: ReSkinConfig) {
    applyAvatarConfig(config.avatar);
    applyBackgroundConfig(config.backgroundImage);
}

function applyConfigChange(field: string, value: any) {
    if (field == "avatar") applyAvatarConfig(value);
    if (field == "backgroundImage") applyBackgroundConfig(value);
}

export { applyConfig, applyConfigChange };

interface Watchers {
    avatar: Watcher[];
}

interface Watcher {
    selector: string;
    callback: (el: Element) => void;
}
