const os = require('os');

const electron = require('electron');
const app = electron.app || electron.remote.app;
const shell = electron.shell;

const bugBody = `
**Describe the bug**
A clear and concise description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:

**Expected behavior**
A clear and concise description of what you expected to happen.

**Screenshots**
If applicable, add screenshots to help explain your problem.

**Additional context**
Add any other context about the problem here.`;

const featureBody = `
**Is your feature request related to a problem? Please describe.**
A clear and concise description of what the problem is. Ex. I'm always frustrated when [...]

**Describe the solution you'd like**
A clear and concise description of what you want to happen.

**Describe alternatives you've considered**
A clear and concise description of any alternative solutions or features you've considered.

**Additional context**
Add any other context or screenshots about the feature request here.`;

export function createIssue(isFeedback, bugDetails) {
    let title = 'Bug report';
    let labels = 'bug';
    let body = bugBody;
    if (isFeedback) {
        title = 'Feature request';
        labels = 'enhancement';
        body = featureBody;
    }

    body += `
Tool version: **${app.getVersion()}**
Operating system: **${os.platform()} ${os.arch()} (${os.release()})**
`;

    if (bugDetails) {
        body += `
Error details: ${bugDetails}`;
    }

    body = body.replace('\r\n', '\n');

    let url = `https://github.com/IAmPicard/StarTrekTimelinesSpreadsheet/issues/new?labels=${encodeURIComponent(labels)}&title=${encodeURIComponent(title)}&body=${encodeURIComponent(body)}`;

    shell.openExternal(url);
}