# ReSkin for Discord

[![Available in the Chrome Web Store](./.github/assets/promo-cws.svg)](https://chrome.google.com/webstore/detail/fjicmhpolmmiepkknajmhalbbabcahbk) [![Available in the Firefox Addon Store](./.github/assets/promo-fas.svg)](https://addons.mozilla.org/en-US/firefox/addon/reskin-for-discord/)

![Chome version](https://img.shields.io/chrome-web-store/v/fjicmhpolmmiepkknajmhalbbabcahbk?style=for-the-badge&logo=chromewebstore&logoColor=e4e4e4&label=chrome%20version) ![Firefox version](https://img.shields.io/amo/v/discordreskin%40nitrofun.eu?style=for-the-badge&logo=firefox&label=Firefox%20version)

## Development

![Code version](https://img.shields.io/github/package-json/v/NiTrO0FuN/discord-reskin?label=code%20version) [![Build status](https://img.shields.io/github/actions/workflow/status/NiTrO0FuN/discord-reskin/validate.yml)](https://github.com/NiTrO0FuN/discord-reskin/actions/workflows/validate.yml)

1. Install dependencies

    ```sh
    npm ci
    ```

2. Scripts

    **This extension is bundled via [<img style="vertical-align:middle" src="https://img.shields.io/badge/WXT-gray?logo=wxt">](https://wxt.dev/).**

    ```sh
    npm run dev # Launches Chrome with the dev version of the extension installed.
    npm run build # Builds the extension for production.
    npm run zip # Zips up the output directory into an installable ZIP file.
    ```

    To target firefox, use `:firefox` suffix, e.g.

    ```sh
    npm run dev:firefox
    ```

3. Running Tests:

    ```sh
    npm run test
    ```

    Unit tests are written with [<img style="vertical-align:middle" src="https://img.shields.io/badge/vitest-gray?logo=vitest">](https://vitest.dev/).
