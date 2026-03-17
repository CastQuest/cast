// Cache name — increment the version when deploying new static assets
const CACHE_VERSION = 'v1';
const CACHE_NAME = `castquest-${CACHE_VERSION}`;

// Only immutable Next.js static assets are served cache-first.
// HTML pages and API routes use a network-first strategy so deployments
// are picked up immediately without cache-busting issues.
const IMMUTABLE_URL_PREFIX = '/_next/static/';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(['/manifest.json']))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // Cache-first only for immutable Next.js static chunks
  if (url.pathname.startsWith(IMMUTABLE_URL_PREFIX)) {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        if (cached) return cached;
        return fetch(event.request).then((response) => {
          if (response.ok) {
            const cloned = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, cloned));
          }
          return response;
        });
      })
    );
    return;
  }

  // Network-first for HTML pages and everything else
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
