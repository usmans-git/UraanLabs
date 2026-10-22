/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      { source: "/index.html", destination: "/" },
      { source: "/about.html", destination: "/about" },
      { source: "/careers.html", destination: "/careers" },
      { source: "/contact.html", destination: "/contact" },
      { source: "/industries.html", destination: "/industries" },
      { source: "/insights.html", destination: "/insights" },
      { source: "/privacy.html", destination: "/privacy" },
      { source: "/services.html", destination: "/services" },
      { source: "/terms.html", destination: "/terms" },
      { source: "/services/:slug.html", destination: "/services/:slug" },
      { source: "/insights/:slug.html", destination: "/insights/:slug" },
    ];
  },
};

export default nextConfig;
