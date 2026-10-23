const fs = require('fs');

const css = fs.readFileSync('app/globals.css', 'utf8');

// Find all CSS grid classes
const gridClassMatches = [...css.matchAll(/\.([a-zA-Z0-9_-]+)\s*\{[^}]*display:\s*grid[^}]*\}/g)];
console.log('Found', gridClassMatches.length, 'grid definitions:');

gridClassMatches.forEach(m => {
  const className = m[1];
  // Check if this class has a responsive media query
  const hasMq = css.includes(`.${className}`) && (
    css.includes(`@media (max-width: 992px)`) || 
    css.includes(`@media (max-width: 768px)`) || 
    css.includes(`@media (max-width: 640px)`) || 
    css.includes(`@media (max-width: 480px)`)
  );
  // Extract the grid declaration
  const gridDecl = m[0].match(/grid-template-columns:[^;]+;/);
  console.log(`- .${className}: ${gridDecl ? gridDecl[0] : 'dynamic'}`);
});
