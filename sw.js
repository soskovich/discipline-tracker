/* Discipline Tracker — service worker */
const CACHE = "discipline-tracker-v1";
const ASSETS = [
  "./",
  "./index.html",
  "./Discipline_Tracker_App.html",
  "./manifest.webmanifest",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-512-maskable.png",
  "./apple-touch-icon-180.png"
];

self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(CACHE).then(function (c) {
      // Cache wat lukt; ontbrekende namen (bijv. een niet-bestaande index) negeren.
      return Promise.allSettled(ASSETS.map(function (u) { return c.add(u); }));
    }).then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (k) { return k !== CACHE; })
        .map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function (e) {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // alleen eigen origin

  // HTML-navigaties: network-first (verse versie), val terug op cache offline.
  if (req.mode === "navigate") {
    e.respondWith(
      fetch(req).then(function (res) {
        const copy = res.clone();
        caches.open(CACHE).then(function (c) { c.put(req, copy); });
        return res;
      }).catch(function () {
        return caches.match(req).then(function (m) {
          return m || caches.match("./index.html") || caches.match("./Discipline_Tracker_App.html") || caches.match("./");
        });
      })
    );
    return;
  }

  // Overige assets: cache-first, anders netwerk en bijwerken.
  e.respondWith(
    caches.match(req).then(function (m) {
      return m || fetch(req).then(function (res) {
        const copy = res.clone();
        caches.open(CACHE).then(function (c) { c.put(req, copy); });
        return res;
      });
    })
  );
});
