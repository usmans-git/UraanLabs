const fs = require('fs');

const cssContent = fs.readFileSync('app/globals.css', 'utf8');

console.log('=== CSS RESPONSIVENESS AUDIT ===');
console.log('Total CSS Lines:', cssContent.split('\n').length);

// 1. Breakpoints audit
const mediaQueries = [...cssContent.matchAll(/@media[^{]+/g)].map(m => m[0].trim());
console.log('\n1. Found', mediaQueries.length, 'Media Queries:');
const uniqueBreakpoints = new Set(mediaQueries);
uniqueBreakpoints.forEach(mq => console.log('  -', mq));

// 2. Check fixed width elements that might break mobile (< 360px)
const fixedWidths = [];
const lines = cssContent.split('\n');
lines.forEach((line, idx) => {
  const match = line.match(/width:\s*([0-9]+)px/);
  if (match) {
    const px = parseInt(match[1]);
    if (px > 300 && !line.includes('max-width')) {
      fixedWidths.push({ line: idx + 1, px, text: line.trim() });
    }
  }
});
console.log('\n2. Potentially problematic fixed widths (>300px without max-width):', fixedWidths.length);
fixedWidths.forEach(fw => console.log(`  Line ${fw.line}: ${fw.text}`));

// 3. Check horizontal overflow guards
const hasGlobalOverflowGuard = cssContent.includes('overflow-x: hidden') || cssContent.includes('overflow-x: clip');
console.log('\n3. Global overflow-x guard present:', hasGlobalOverflowGuard);

// 4. Check tables, grids, and pre blocks
console.log('\n4. Grid template columns on mobile:');
const mobileGrids = lines.filter(l => l.includes('grid-template-columns') && (l.includes('1fr') || l.includes('repeat')));
console.log('  Total grid definitions:', mobileGrids.length);
