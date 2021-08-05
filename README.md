<h1 align="center">
  Beacon for IBM.com
</h1>

> Beacon for IBM.com analyzes web apps and pages for compliance with IBM.com web
> standards, the IBM Design Language, and best practices.

Beacon for IBM.com leverages Google
[Lighthouse](https://github.com/GoogleChrome/lighthouse) to perform specific
audits on apps, sites, and pages. This ensures that users can have the best
experience when visiting our sites. Please visit
[web standards](https://www.ibm.com/standards/web/) and
[Carbon for IBM.com](https://www.ibm.com/standards/web/carbon-for-ibm-dotcom/)
for more information on designing and developing for IBM.com.

## Getting started

At its core, Beacon will run a preset number of audits on a page. The simplest
way to run an audit is

```bash
yarn beacon https://www.ibm.com
```

By default, the results are written to an HTML file in the root directory. Since
Beacon is powered by Lighthouse, there are a plenty of built-in
[CLI options](https://github.com/GoogleChrome/lighthouse#cli-options) available
to customize the output.

## Usage

A full list of available audits can be seen
[here](https://ibm.github.io/beacon-for-ibm-dotcom/).
