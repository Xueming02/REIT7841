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

The interactive prototype is deployed through GitHub Pages. The following links use the pseudonymous participant code `DEMO` for assessment and demonstration purposes:

- [Baseline condition — no advance preview](https://xueming02.github.io/REIT7841/REIT7841_Prototype_Upload/?mode=baseline&participant=DEMO)
- [Moving Preview condition — moving visual preview of the actual next video](https://xueming02.github.io/REIT7841/REIT7841_Prototype_Upload/?mode=thumbnail&participant=DEMO)
- [Text Preview condition — title and tags of the actual next video](https://xueming02.github.io/REIT7841/REIT7841_Prototype_Upload/?mode=text&participant=DEMO)

Replace `DEMO` only with a pseudonymous participant code. The `index.html` file in this directory is a self-contained GitHub Pages deployment file.

## Source code

- [Complete GitHub repository](https://github.com/Xueming02/REIT7841)
- [Editable Vite source code](https://github.com/Xueming02/REIT7841/tree/main/REIT7841_Prototype_Upload/source)
- [Downloadable source-code archive](prototype-source.zip)

The editable Vite project is located in the `source/` directory:

- `source/src/main.js` contains the video sequence, interface logic, condition handling, interaction logging, and session export;
- `source/src/style.css` contains the responsive mobile interface styles;
- `source/index.html` is the Vite entry page;
- `source/package.json` and `source/package-lock.json` record the development dependency and scripts.

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
