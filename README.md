<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# Create a README.md file

Here is a complete README.md you can copy-paste into your repository.

# Smart Password Generator – Chrome Extension

A lightweight, privacy-first Chrome extension that generates secure, personalized passwords with real-time strength analysis. Enter your first and last name once; each generation automatically mixes in random numbers and symbols to create unique, strong passwords.

## Problem statement

- Users commonly reuse simple or predictable passwords, creating high breach risk.
- Many generators are inconvenient, require repeated setup, or produce hard-to-use strings.
- A simple, offline, consistent workflow is needed to help non-experts create strong, unique passwords fast.


## Solution approach

- One-time name input saved locally in the browser for convenience.
- Each click generates a fresh password using: name seed (max 8 chars) + random 2‑digit number + two random symbols + mixed‑case filler to reach 14+ chars.
- AI-style guidance explains weaknesses (length, variety, repeats, common patterns) and a visual strength meter provides instant feedback.
- Copy-to-clipboard and show/hide toggle improve usability. All generation and checks are local.


## Technology stack used

- HTML5, CSS3 (Grid, Flexbox, animations)
- JavaScript (ES6+)
- Chrome Extensions Manifest V3
- Browser APIs: chrome.storage, Clipboard API
- PNG icons (16/48/128)


## Setup/installation instructions

1. Download or clone this repository.
2. Open Chrome and go to: chrome://extensions/
3. Enable Developer Mode (top-right toggle).
4. Click “Load unpacked” and select this project folder.
5. Pin the extension icon for quick access.

## How to run the project

- Click the extension icon to open the popup.
- Enter First Name and Last Name once; they persist via chrome.storage.
- Press “Generate Password” for a new strong password each time.
- Use “Show/Hide” to reveal or mask; “Copy” places it on the clipboard.
- The strength bar and label update live; “Validate” enables for strong passwords.


## Project structure

```
smart-password-generator/
├─ manifest.json      # Extension configuration (MV3)
├─ popup.html         # Popup UI
├─ popup.css          # Styling, layout, animations
├─ popup.js           # Generation, AI feedback, storage, clipboard
└─ icons/             # 16/48/128 px icons
```


## Security notes

- Passwords are generated and analyzed locally; nothing is sent over the network.
- Only first/last name are stored via chrome.storage for convenience and can be cleared anytime.


## Team member names

- Vaibhav Dwivedi
- [Add teammate name here]
- [Add teammate name here]


## License

MIT License.
<span style="display:none">[^1][^2][^3][^4][^5][^6][^7][^8]</span>

<div align="center">⁂</div>

[^1]: https://chromewebstore.google.com/detail/markdown-reader/medapdbncneneejhbgcjceippjlfkmkg

[^2]: https://chromewebstore.google.com/detail/markdown-viewer/ckkdlimhmcjmikdlpkmbgfkaikojcbjk?hl=en

[^3]: https://readme.so

[^4]: https://readme-builder-templates-copy.en.softonic.com/chrome/extension

[^5]: https://stackoverflow.com/questions/9331281/how-can-i-test-what-my-readme-md-file-will-look-like-before-committing-to-github

[^6]: https://gerrit.googlesource.com/gerrit-fe-dev-helper/+/master/README.md

[^7]: https://android.googlesource.com/platform/external/chromium_org/+/cedac22/chrome/common/extensions/docs/README

[^8]: https://sourceforge.net/projects/template-studio.mirror/files/v5.1/README.md/download

