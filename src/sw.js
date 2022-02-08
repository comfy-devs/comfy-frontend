/* Node Imports */
import { getFiles, setupPrecaching, setupRouting } from "preact-cli/sw/";
import { registerRoute } from "workbox-routing";
import { StaleWhileRevalidate } from "workbox-strategies";
import fileResponse from "./assets/webtorrent/worker";

/* Static caching */
const files = getFiles();
setupPrecaching(files);

/* API caching */
registerRoute(
    ({ url }) => {
        return (
            url.host === "api.nyananime.xyz" &&
            ["/v1/animes/all/fetch", "/v1/groups/all/fetch", "/v1/groups/fetch", "/v1/episodes/all/fetch", "/v1/episodes/fetch", "/v1/animes/episodes/fetch", "/v1/episodes/segments/fetch", "/v1/stats/fetch"].includes(url.pathname)
        );
    },
    new StaleWhileRevalidate({
        cacheName: "api-common",
    })
);
setupRouting();

/* Push notifications */
addEventListener("push", (e) => {
    if (!e.data) {
        return;
    }

    const options = {
        body: e.data.text(),
        icon: "/favicon.ico",
    };
    e.waitUntil(self.registration.showNotification("Nyan Anime", options));
});

/* Webtorrent */
self.addEventListener("install", () => {
    self.skipWaiting();
});
self.addEventListener("fetch", (event) => {
    const res = fileResponse(event);
    if (res) event.respondWith(res);
});
self.addEventListener("activate", (evt) => {
    evt.waitUntil(self.clients.claim());
});
