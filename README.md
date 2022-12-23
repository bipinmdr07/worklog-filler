This is a chrome extension developed using [Plasmo extension](https://docs.plasmo.com/) project bootstrapped with [`plasmo init`](https://www.npmjs.com/package/plasmo).
This project is used for auto filling the worklogs at Leapfrog Technology using my own TODO list that I have maintained in emacs org-mode accroding to date.

### Valid tags

```javascript
:MEETING: :CODING: :OTHER:
```

**My todo list format** grouped by date

### Org file format: `todo.org`

<a href="https://i.imgur.com/jtqoVTn.png">
<img src="https://i.imgur.com/jtqoVTn.png" />
</a>

The **LOGBOOK** is provided by the org mode _clock-in_ and _clock-out_ for tracking the time I worked on that particular task.

### Text file format: `todo.txt`

```text
# 2022-12-20
- Work on adding a text file :CODING: // adding tag with :TEXT: format
- Add todo list :OTHER: // everything without a tag will automatically be treated as other
- Meeting with client :MEETING:

# 2022-12-21
- Work on adding org file :CODING: // adding tag with :TEXT: format
- Add todo list for my party :OTHER: // everything without a tag will automatically be treated as other
- Meeting with the client :MEETING:
```

## Demo

1. Auto Filling the worklog.

2. Copying the list of tasks ready for stand-up tasks that needs to be updated on slack channel (For some projects)

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open your browser and load the appropriate development build. For example, if you are developing for the chrome browser, using manifest v3, use: `build/chrome-mv3-dev`.

You can start editing the popup by modifying `popup.tsx`. It should auto-update as you make changes. To add an options page, simply add a `options.tsx` file to the root of the project, with a react component default exported. Likewise to add a content page, add a `content.ts` file to the root of the project, importing some module and do some logic, then reload the extension on your browser.

For further guidance, [visit our Documentation](https://docs.plasmo.com/)

## Making production build

Run the following:

```bash
npm run build
```

This should create a production bundle for your extension, ready to be zipped and published to the stores.

## Submit to the webstores

The easiest way to deploy your Plasmo extension is to use the built-in [bpp](https://bpp.browser.market) GitHub action. Prior to using this action however, make sure to build your extension and upload the first version to the store to establish the basic credentials. Then, simply follow [this setup instruction](https://docs.plasmo.com/workflows/submit) and you should be on your way for automated submission!
