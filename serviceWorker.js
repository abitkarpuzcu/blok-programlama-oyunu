const CACHE_NAME = "blok-kod-cache-v2";
const urlsToCache = [
  "/",
  "/index.html",
  "/style.css",
  "/script31.js",
  "/blockly/blockly_compressed.js",
  "/blockly/blocks_compressed.js",
  "/blockly/javascript_compressed.js",
  "/blockly/msg/tr.js",
  "/gsbmw.jpg",
  "/manifest.json",
  "/icons/icon-192.png",
  "/icons/icon-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
