# LeetSense for Safari

Simple word suggestions for identifiers already in LeetCode code. Works across Monaco editor languages and runs locally in the page.

## Independent project and scope

LeetSense for Safari is an unofficial third-party extension. It is not affiliated with, endorsed by, or sponsored by LeetCode, LLC or Apple Inc. “LeetCode” and “Safari” are names and marks of their respective owners and are used here only to identify compatibility.

The extension suggests identifiers already present in the active code editor. Suggestions are generated locally from the user's current code; the extension makes no external network requests and does not fetch LeetCode problem statements or solutions. This basic word-completion feature may overlap with part of the autocomplete LeetCode offers through Premium. The extension does not read Premium account status or modify subscription or access controls. This notice is not authorization from LeetCode; use of LeetCode remains subject to LeetCode’s current Terms of Service.

## Download and install on Mac

[Download LeetSense for Safari as a ZIP](https://github.com/suyashgupta27/LeetSense-Safari/archive/refs/heads/main.zip) — this downloads one ZIP containing the repository and extension files.

1. Extract the ZIP. Open the extracted LeetSense-Safari-main folder; manifest.json, content.js, and bridge.js are at its top level.
2. In Safari, choose **Safari → Settings → Advanced** and enable **Show features for web developers**.
3. Choose **Safari → Settings → Developer → Add Temporary Extension…** and select the extracted LeetSense-Safari-main folder.
4. If prompted, allow unsigned extensions. Then choose **Safari → Settings → Extensions** and enable **LeetSense for Safari**.
5. Open or refresh a LeetCode problem page.

Temporary extensions may need to be added again after Safari restarts. Permanent distribution requires packaging and signing the extension in a macOS app with Xcode.
