# LeetSense for Safari

Simple word suggestions for identifiers already in LeetCode code. Works across Monaco editor languages and runs locally in the page.

## Download and install on Mac

[Download LeetSense for Safari as a ZIP](https://github.com/suyashgupta27/LeetSense-Safari/archive/refs/heads/main.zip) — this downloads one ZIP containing the repository and extension files.

1. Extract the ZIP. Open the extracted `LeetSense-Safari-main` folder; `manifest.json`, `content.js`, and `bridge.js` are at its top level.
2. In Safari, choose **Safari → Settings → Advanced** and enable **Show features for web developers**.
3. Choose **Safari → Settings → Developer → Add Temporary Extension…** and select the extracted `LeetSense-Safari-main` folder.
4. If prompted, allow unsigned extensions. Then choose **Safari → Settings → Extensions** and enable **LeetSense for Safari**.
5. Open or refresh a LeetCode problem page.

Temporary extensions may need to be added again after Safari restarts. Permanent distribution requires packaging and signing the extension in a macOS app with Xcode.
