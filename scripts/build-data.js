const fs = require('fs');
const path = require('path');

// Ensure data directory exists
if (!fs.existsSync('data')) {
  fs.mkdirSync('data', { recursive: true });
}

function cleanHtmlContent(html, context = 'root') {
  // Normalize images
  let cleaned = html.replace(/src=["'](?:\.\.\/|\.\/)?images\/([^"']+)["']/g, 'src="/images/$1"');
  cleaned = cleaned.replace(/srcset=["'](?:\.\.\/|\.\/)?images\/([^"']+)["']/g, 'srcset="/images/$1"');

  // Normalize links
  cleaned = cleaned.replace(/href=["'](?:\.\.\/)?index\.html(#?[^"']*)["']/g, 'href="/$1"');
  cleaned = cleaned.replace(/href=["'](?:\.\.\/)?about\.html(#?[^"']*)["']/g, 'href="/about$1"');
  cleaned = cleaned.replace(/href=["'](?:\.\.\/)?careers\.html(#?[^"']*)["']/g, 'href="/careers$1"');
  cleaned = cleaned.replace(/href=["'](?:\.\.\/)?contact\.html(#?[^"']*)["']/g, 'href="/contact$1"');
  cleaned = cleaned.replace(/href=["'](?:\.\.\/)?industries\.html(#?[^"']*)["']/g, 'href="/industries$1"');
  cleaned = cleaned.replace(/href=["'](?:\.\.\/)?insights\.html(#?[^"']*)["']/g, 'href="/insights$1"');
  cleaned = cleaned.replace(/href=["'](?:\.\.\/)?privacy\.html(#?[^"']*)["']/g, 'href="/privacy$1"');
  cleaned = cleaned.replace(/href=["'](?:\.\.\/)?terms\.html(#?[^"']*)["']/g, 'href="/terms$1"');
  cleaned = cleaned.replace(/href=["'](?:\.\.\/)?services\.html(#?[^"']*)["']/g, 'href="/services$1"');

  // Service sub-links
  cleaned = cleaned.replace(/href=["'](?:\.\.\/)?services\/([^"'\#]+)\.html(#?[^"']*)["']/g, 'href="/services/$1$2"');
  // Insights sub-links
  cleaned = cleaned.replace(/href=["'](?:\.\.\/)?insights\/([^"'\#]+)\.html(#?[^"']*)["']/g, 'href="/insights/$1$2"');

  if (context === 'services') {
    // Relative sibling links in services folder like href="brand-identity.html"
    cleaned = cleaned.replace(/href=["'](?!https?:\/\/|mailto:|tel:|#|\/)([^"'\#]+)\.html(#?[^"']*)["']/g, 'href="/services/$1$2"');
  } else if (context === 'insights') {
    // Relative sibling links in insights folder
    cleaned = cleaned.replace(/href=["'](?!https?:\/\/|mailto:|tel:|#|\/)([^"'\#]+)\.html(#?[^"']*)["']/g, 'href="/insights/$1$2"');
  }

  // Self closing tags fix or attribute cleanup if needed
  return cleaned;
}

function extractMetadata(fullHtml) {
  const titleMatch = fullHtml.match(/<title>([\s\S]*?)<\/title>/i);
  const descMatch = fullHtml.match(/<meta\s+name=["']description["']\s+content=["']([\s\S]*?)["']/i);
  const ogTitleMatch = fullHtml.match(/<meta\s+property=["']og:title["']\s+content=["']([\s\S]*?)["']/i);
  const ogDescMatch = fullHtml.match(/<meta\s+property=["']og:description["']\s+content=["']([\s\S]*?)["']/i);
  const ogImageMatch = fullHtml.match(/<meta\s+property=["']og:image["']\s+content=["']([\s\S]*?)["']/i);

  // Extract JSON-LD schemas
  const schemas = [];
  const schemaRegex = /<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi;
  let match;
  while ((match = schemaRegex.exec(fullHtml)) !== null) {
    try {
      const parsed = JSON.parse(match[1]);
      schemas.push(parsed);
    } catch (e) {
      // Keep as string if parsing fails
      schemas.push(match[1].trim());
    }
  }

  return {
    title: titleMatch ? titleMatch[1].trim().replace(/&amp;/g, '&') : 'UraanLabs | Next-Gen Software Studio',
    description: descMatch ? descMatch[1].trim().replace(/&amp;/g, '&') : '',
    ogTitle: ogTitleMatch ? ogTitleMatch[1].trim() : (titleMatch ? titleMatch[1].trim() : ''),
    ogDescription: ogDescMatch ? ogDescMatch[1].trim() : (descMatch ? descMatch[1].trim() : ''),
    ogImage: ogImageMatch ? ogImageMatch[1].trim() : '/images/herobanner.png',
    schemas,
  };
}

function extractMainContent(fullHtml, context) {
  const mainMatch = fullHtml.match(/<main(?:\s+id=["'][^"']*["'])?>([\s\S]*?)<\/main>/i);
  if (!mainMatch) {
    console.warn('No <main> found in file!');
    return '';
  }
  return cleanHtmlContent(mainMatch[1], context);
}

// 1. Process Root Pages
const rootPages = [
  { key: 'home', file: 'index.html' },
  { key: 'about', file: 'about.html' },
  { key: 'careers', file: 'careers.html' },
  { key: 'contact', file: 'contact.html' },
  { key: 'industries', file: 'industries.html' },
  { key: 'insights', file: 'insights.html' },
  { key: 'privacy', file: 'privacy.html' },
  { key: 'services', file: 'services.html' },
  { key: 'terms', file: 'terms.html' },
];

const pagesData = {};
rootPages.forEach(({ key, file }) => {
  if (fs.existsSync(file)) {
    const raw = fs.readFileSync(file, 'utf8');
    pagesData[key] = {
      meta: extractMetadata(raw),
      content: extractMainContent(raw, 'root'),
    };
    console.log(`Processed root page: ${key} (${file})`);
  }
});

fs.writeFileSync('data/pagesData.json', JSON.stringify(pagesData, null, 2), 'utf8');

// 2. Process Services Pages (39 total)
const serviceFiles = fs.readdirSync('services').filter(f => f.endsWith('.html'));
const servicesData = {};

serviceFiles.forEach(file => {
  const slug = file.replace('.html', '');
  const raw = fs.readFileSync(path.join('services', file), 'utf8');
  servicesData[slug] = {
    slug,
    meta: extractMetadata(raw),
    content: extractMainContent(raw, 'services'),
  };
});
console.log(`Processed ${Object.keys(servicesData).length} services pages.`);
fs.writeFileSync('data/servicesData.json', JSON.stringify(servicesData, null, 2), 'utf8');

// 3. Process Insights Pages (8 total)
const insightFiles = fs.readdirSync('insights').filter(f => f.endsWith('.html'));
const insightsData = {};

insightFiles.forEach(file => {
  const slug = file.replace('.html', '');
  const raw = fs.readFileSync(path.join('insights', file), 'utf8');
  insightsData[slug] = {
    slug,
    meta: extractMetadata(raw),
    content: extractMainContent(raw, 'insights'),
  };
});
console.log(`Processed ${Object.keys(insightsData).length} insights pages.`);
fs.writeFileSync('data/insightsData.json', JSON.stringify(insightsData, null, 2), 'utf8');

console.log('Successfully generated all structured JSON data!');
