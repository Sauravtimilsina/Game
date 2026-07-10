# BrightMinds Brain Gym

BrightMinds Brain Gym is a privacy-first, static, browser-based brain-training prototype for children aged 4 to 16.

The app now uses an adaptive endless-play engine with 2,400 virtual levels. Each round generates fresh questions, answer choices, layouts, and distractors so replaying a level does not produce the same experience every time.

## Games included

- Memory Match: card matching for memory practice.
- Pattern Logic: shape and number sequence completion.
- Focus Finder: visual scanning and attention control.
- Number Quest: age-scaled arithmetic and missing-number challenges.
- Word Builder: spelling and letter-order practice.
- Science Spark: simple science quiz questions.
- Typing Trail: reading and keyboard confidence practice.
- Odd One Out: category reasoning and flexible thinking.
- Color Code: attention control inspired by Stroop-style play.
- Story Order: sequencing, planning, and comprehension practice.
- नेपाली अक्षर: Nepali alphabet sequence game.
- नेपाली शब्द: Nepali word and meaning matching game.
- नेपाली अंक: Nepali number recognition game.

## Adaptive level system

- 2,400 virtual levels are tracked in the session UI.
- The next game is selected automatically during endless play.
- Difficulty changes based on age level, virtual level, accuracy, streak, and parent-selected pace.
- Lower-practiced skills are periodically selected so children get balanced practice.
- Daily challenge routing is included without storing personal data.

## Safety and privacy

This static prototype intentionally keeps the child-facing experience simple:

- No login or account system.
- No ads.
- No chat or messaging.
- No public profiles or leaderboards.
- No personal data collection.
- No analytics code.
- No cookies created by the app.
- No localStorage or sessionStorage progress saving.
- No external links in the child-facing interface.
- No external font, sound, or image requests.

Parent controls include age level, audio guidance, playtime limit, privacy mode, and challenge pace. All settings are session-only and reset when the page is refreshed.

## Security notes for production

This repository is a static frontend prototype. A production platform should move accounts, parent reports, persistence, secrets, payment logic, anti-abuse rules, and important business logic to a secure backend.

Recommended production controls include HTTPS, secure authentication, server-side input validation, protected APIs, rate limiting, secure database access, safe generic error messages, dependency updates, backups, monitoring, audit logging, and regular security review.

## Research references used

- FTC children's privacy and COPPA guidance.
- W3C WCAG 2.2 accessibility guidelines.
- OWASP Top 10 web application security risks.
- MDN web security guidance.

Research was used only for principles and requirements. The games, questions, visuals, and code are original for this project.

## How to run locally

Open `index.html` in a browser. No build step is required because this version uses plain HTML, CSS, and JavaScript.

## Web deployment

Deploy the folder as a static website on GitHub Pages, Netlify, Vercel, Cloudflare Pages, or any standard static web host.

Required files:

- `index.html`
- `styles.css`
- `script.js`
- `README.md`
- `LICENSE`
- `PRIVACY.md`
