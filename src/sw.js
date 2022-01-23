import { getFiles, setupPrecaching, setupRouting } from "preact-cli/sw/";
import { registerRoute } from "workbox-routing";
import { StaleWhileRevalidate } from "workbox-strategies";

const files = getFiles();
files.push({ url: "/favicon.ico", revision: null });
setupPrecaching(files);

registerRoute(({ url }) => {
    return url.host === "api.nyananime.xyz" && (["/v1/animes/all/fetch", "/v1/groups/all/fetch", "/v1/groups/fetch", "/v1/episodes/all/fetch", "/v1/episodes/fetch", "/v1/animes/episodes/fetch", "/v1/episodes/segments/fetch", "/v1/stats/fetch"].includes(url.pathname));
}, new StaleWhileRevalidate({
    cacheName: "api-common"
}));
setupRouting();

addEventListener("push", (e) => {
    if(!e.data) { return; }
    const options = {
        body: e.data.text(),
        icon: "/favicon.ico"
    };
    e.waitUntil(self.registration.showNotification("Nyan Anime", options));
});