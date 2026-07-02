const fs = require('fs');
let content = fs.readFileSync('./src/data/checklistData.js', 'utf8');
content = content.replace(/Indoor Environmental Quality/g, 'Waste Reduction and Circular Economy');
fs.writeFileSync('./src/data/checklistData.js', content);
console.log('Done');
