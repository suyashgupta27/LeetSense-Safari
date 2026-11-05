# LeetSense for Safari

A small Safari Web Extension that provides simple word suggestions in LeetCode's Monaco editor. It suggests identifiers already present in your code for the selected editor language. It runs locally in the page and does not send code anywhere.

## Install temporarily in Safari on Mac

1. Download `LeetSense-Safari.zip` from this repository. If Safari does not open the ZIP directly, double-click it in Downloads to extract it.
2. In Safari, choose **Safari → Settings → Advanced** and enable **Show features for web developers**.
3. Choose **Safari → Settings → Developer → Add Temporary Extension…** and select the downloaded ZIP or the extracted folder containing `manifest.json`.
4. If prompted, allow unsigned extensions. Then choose **Safari → Settings → Extensions** and turn on **LeetSense for Safari**.
5. Open or refresh a LeetCode problem page to use the extension.

Temporary extensions are for development and may need to be added again after Safari restarts. Permanent distribution requires packaging and signing the extension in a macOS app with Xcode.

## Current scope

- Simple word suggestions for identifiers already in the current code, across LeetCode editor languages.
- Runs on `leetcode.com`; it does not provide semantic IntelliSense, hover documentation, or diagnostics.
