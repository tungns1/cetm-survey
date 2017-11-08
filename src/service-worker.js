importScripts('workbox-sw.prod.js');
const version = "201707281";
const fileManifest = [];
const cacheUpdatable = 'static-updatable-' + version;
const cacheNonUpdatable = 'static-non-updatable-' + version;

const workboxSW = new self.WorkboxSW({ clientsClaim: true, skipWaiting: true });
// workboxSW.precache(fileManifest);

function StaleWhileRevalidate(pattern) {
    workboxSW.router.registerRoute(
        pattern,
        workboxSW.strategies.staleWhileRevalidate({
            cacheName: cacheUpdatable,
            maxEntries: 128,
            cacheExpiration: {
                maxAgeSeconds: 7 * 24 * 60 * 60, // one week
            },
            cacheableResponse: { statuses: [0, 200, 304] },
            broadcastCacheUpdate: {
                channelName: 'cache-updates'
            }
        })
    );
}

function CacheFirst(pattern) {
    workboxSW.router.registerRoute(
        pattern,
        workboxSW.strategies.cacheFirst({
            cacheName: cacheNonUpdatable,
            maxEntries: 128,
            cacheExpiration: {
                maxAgeSeconds: 30 * 24 * 60 * 60, // one month
            },
            cacheableResponse: { statuses: [0, 200, 304] }
        })
    );
}

function NetworkFirst(pattern) {
    workboxSW.router.registerRoute(
        pattern,
        workboxSW.strategies.networkFirst()
    )
}

// index.html
// NetworkFirst(/\/(device|app)\/$/);
// All assets are checked 
StaleWhileRevalidate(/\/(device|app)\/.+/);
// In production, these resources should be cache first
const prodCacheFirst = /\/(device|app)\/(inline|vendor|polyfills|script|main|styles|[0-9])\.[a-f0-9]{20,}\.(bundle|chunk)\.(js|css)/;
// Bundle names contain hash, 
// making it safe to cache them forever
CacheFirst(prodCacheFirst);