# pzlabs-website

**Phase 1 of [acoelho.dev](https://acoelho.dev): the original portfolio, in plain HTML, CSS and JavaScript on GitHub Pages.** It started as a portfolio and a lab for learning front-end development, one feature at a time.

> **Archived.** The site moved on in two steps:
> - **Phase 2** kept this front-end and added a Node.js API on AWS, [pzlabs-server](https://github.com/ZPAlexis/pzlabs-server), to record the coin game's events and show community totals.
> - **Phase 3** consolidated everything into a Rails monolith on a Docker VPS, **[pzlabs-website-rails](https://github.com/ZPAlexis/pzlabs-website-rails)**.
>
> Why it moved, and what each phase taught me: [the case study's Evolution section](https://acoelho.dev/en/projects/acoelho#evolution).

## What it had

- **A responsive layout:** semantic HTML and modern CSS (Flexbox, Grid, custom properties, animations).
- **English and Portuguese,** with a language toggle ([`locales/`](locales)).
- **The first version of the homepage coin game,** in vanilla JavaScript ([`scripts/`](scripts)): the hidden coin, the fill bar and rock-paper-scissors. In Phase 2 it began calling the API to record each collection.
- **Project pages** for Trofy and the Unity game prototypes.

Stack: HTML5, CSS3, JavaScript, GitHub Pages.
