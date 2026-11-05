# LeetSense for Safari

A small Safari Web Extension that provides simple word suggestions in LeetCode's Monaco editor. It suggests identifiers already present in the current code for the selected Monaco language. It runs locally in the page and does not send code anywhere.

## Load in Safari

Safari requires a native app wrapper to install a Web Extension. On macOS, create an Xcode project using **Safari Web Extension**, replace its extension resources with `manifest.json` and `content.js`, build and run the containing app, then enable the extension under **Safari → Settings → Extensions**. For a quick browser-side smoke test, the same manifest and files can be loaded in Chrome/Edge with developer mode.

## Current scope

- Word suggestions for identifiers already in the current solution, across LeetCode editor languages.
- Monaco editor on `leetcode.com` only. This is an MVP; full semantic IntelliSense, hover documentation, diagnostics, and language-server integration are not implemented yet.

The reference project, [LeetSense](https://github.com/C-W-D-Harshit/leetsense), demonstrates deeper language-server based completions. This prototype keeps the first Safari build dependency-free so it can be wrapped and iterated quickly.
