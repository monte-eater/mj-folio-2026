const fs = require('fs');
const file = 'C:/Users/Monte/Documents/portfolio/src/lib/caseStudies.ts';
let content = fs.readFileSync(file, 'utf8');
// Match literal space + backslash + u2014 + space
const pattern = ' \\u2014 ';
const replacement = ', ';
const count = content.split(pattern).length - 1;
content = content.split(pattern).join(replacement);
fs.writeFileSync(file, content, 'utf8');
console.log(`Replaced ${count} occurrences of ' \\u2014 ' with ', '`);
