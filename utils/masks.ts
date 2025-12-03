async function insertCustomMasks(container: HTMLElement) {
    const masks = await fetch(browser.runtime.getURL("/masks/avatar.html"))
        .then((r) => r.text())
        .catch(() => undefined);
    if (!masks) return;

    container.innerHTML = masks;
    // Remove after WXT release:
    container.removeAttribute("data-wxt-integrated");
}

export { insertCustomMasks };
