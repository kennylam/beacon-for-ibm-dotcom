# beacon-for-ibm-dotcom

> Beacon for IBM.com analyzes web pages for compliance with IBM.com web
> standards, the IBM Design Language, and best practices.

Beacon for IBM.com leverages Google
[Lighthouse](https://github.com/GoogleChrome/lighthouse) to perform specific
audits on apps, sites, and pages. This ensures that users can have the best
experience when visiting our sites. Please visit
[web standards](https://www.ibm.com/standards/web/) and
[Carbon for IBM.com](https://www.ibm.com/standards/web/carbon-for-ibm-dotcom/)
for more information on designing and developing for IBM.com.

## Getting started

```bash
npm i beacon-for-ibm-dotcom
```

If you prefer [Yarn](https://yarnpkg.com/en/), use the following command
instead:

```bash
yarn add beacon-for-ibm-dotcom
```

## Usage

```bash
beacon-for-ibm-dotcom -u https://www.ibm.com
```

By default, the results are written to an HTML file in the root directory. Since
Beacon is powered by Lighthouse, there are a plenty of built-in
[CLI options](https://github.com/GoogleChrome/lighthouse#cli-options) available
to customize the output.

> Note: Beacon for IBM.com uses custom audits to ensure compliance with IBM.com
> web standards and is meant to be used on IBM.com sites only. For general web
> audits please use Google Lighthouse, which is available as an
> [npm package](https://www.npmjs.com/package/lighthouse) and built-in Chrome
> extension.

### Options

```
$ beacon-for-ibm-dotcom --help

beacon-for-ibm-dotcom -u <url> [options]

URL:
  --url, -u       URL to audit [required]

Output:
  --output, -o    Output format. Supports 'html', 'json', 'csv'. [Default: 'html']
  --raw, -r       Output results in raw format.
```

A full list of available audits can be seen
[here](https://ibm.github.io/beacon-for-ibm-dotcom/).
