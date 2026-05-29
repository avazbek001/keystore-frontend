const fs = require('fs');
const path = require('path');
function fix(dir) {
  fs.readdirSync(dir).forEach(f => {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) fix(p);
    else if (f.endsWith('.jsx')) {
      let c = fs.readFileSync(p, 'utf8');
      c = c.replace(/'(\$\{import\.meta\.env\.VITE_API_URL\}[^']*)'/g, String.fromCharCode(96) + '$1' + String.fromCharCode(96));
      fs.writeFileSync(p, c);
    }
  });
}
fix('./src');
console.log('Done!');
