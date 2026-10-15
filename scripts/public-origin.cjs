// Shared by Node audits and Playwright, which runs the tests as CommonJS.
exports.publicOrigin = (() => {
  try {
    const candidate = new URL(process.env.QA_PUBLIC_ORIGIN || process.env.NEXT_PUBLIC_SITE_URL || 'https://aprender-site.vercel.app');
    if (candidate.protocol === 'https:' && !/^(localhost|127\.|0\.0\.0\.0|\[::1\])/.test(candidate.hostname)) return candidate.origin;
  } catch { /* Invalid and loopback overrides do not change production expectations. */ }
  return 'https://aprender-site.vercel.app';
})();
