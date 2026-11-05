# LeetSense for Safari

A small Safari Web Extension that provides simple word suggestions in LeetCode's Monaco editor. It suggests identifiers already present in the current code for the selected Monaco language. It runs locally in the page and does not send code anywhere.

## Load in Safari

Safari requires a native app wrapper to install a Web Extension. On macOS, create a Xcode project using Safari Web Extension, replace its extension resources with `manifest.json` and `content.js`, build and run the containing app, then enable the extension under Safari Settings → Extensions.

## Current scope

- Word suggestions for identifiers already in the current solution, across LeetCode editor languages.
- Monaco editor on `leetcode.com` only. Full semantic IntelliSense, hover documentation, diagnostics, and language-server integration are not implemented.
