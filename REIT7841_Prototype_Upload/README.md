# Curiosity-Oriented Short-Video Interface Prototype

This repository contains the supplementary prototype code for an HCI study of
how advance information about the actual next video shapes immediate-next
curiosity and browsing behaviour.

The mobile, TikTok-style web prototype implements three matched conditions:

- `baseline`: no advance preview;
- `thumbnail`: a moving preview of the actual next video;
- `text`: the next video's title and tags.

The prototype is a research simulation. It is not affiliated with TikTok or
YouTube. No participant datasets, names, email addresses, or consent records
are included in this repository.

## Open the deployed prototype

After GitHub Pages is enabled for the repository, use:

- Baseline: `?mode=baseline&participant=DEMO`
- Moving Preview: `?mode=thumbnail&participant=DEMO`
- Text Preview: `?mode=text&participant=DEMO`

Replace `DEMO` only with a pseudonymous participant code. The root
`index.html` is a self-contained deployment file for GitHub Pages.

## Source code

The editable Vite project is in [`source/`](source/):

- `source/src/main.js` contains the video sequence, interface logic, condition
  handling, interaction logging, and session export;
- `source/src/style.css` contains the responsive mobile interface styles;
- `source/index.html` is the Vite entry page;
- `source/package.json` and `source/package-lock.json` record the development
  dependency and scripts.

An archival copy of the source is also provided as
[`prototype-source.zip`](prototype-source.zip).

## Run the editable source locally

```bash
cd source
npm install
npm run dev
```

To create a production build:

```bash
npm run build
```

## Data handling

Interaction events remain in the browser session until **End Session** is
selected. The prototype then displays a structured JSON record for
researcher-controlled export. The code does not automatically upload session
data to this repository or to an external database.

See [`RESEARCH_DESIGN.md`](RESEARCH_DESIGN.md) for the condition definitions,
logged variables, interpretation boundaries, and study-design notes.
