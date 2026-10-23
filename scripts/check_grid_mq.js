const fs = require('fs');
const css = fs.readFileSync('app/globals.css', 'utf8');

const grids = [
  'mega-inner',
  'panel-grid',
  'hero-grid',
  'hero-stats-grid',
  'terminal-grid',
  'bento-grid',
  'about-grid',
  'workflow-steps-grid',
  'solutions-grid',
  'pricing-cards-grid',
  'testimonials-grid',
  'industries-compact-grid',
  'faq-modern-grid',
  'faq-modern-list',
  'contact-card-wrapper',
  'trust-mini-cards',
  'form-row',
  'footer-top-grid',
  'map-hubs-grid',
  'vision-mission-grid',
  'accreditations-grid',
  'founder-guarantees-grid',
  'founder-letter-layout'
];

console.log('=== CHECKING MOBILE BREAKPOINTS FOR EACH GRID ===');
grids.forEach(g => {
  const regex = new RegExp(`@media[^{]+\\{[\\s\\S]*?\\.${g}\\s*\\{[^}]*grid-template-columns:[^;]+;`, 'g');
  const matches = [...css.matchAll(regex)];
  if (matches.length > 0) {
    const mqs = matches.map(m => m[0].split('{')[0].trim());
    console.log(`✅ .${g}: Has responsive media queries: ${mqs.join(', ')}`);
  } else {
    // Check if it's hidden or handled differently
    const isHiddenOnMobile = css.includes(`.${g}`) && css.includes('display: none');
    console.log(`⚠️ .${g}: Check manual handling (Hidden on mobile? ${isHiddenOnMobile})`);
  }
});
