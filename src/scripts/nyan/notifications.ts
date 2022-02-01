export function setupNotifications(callback: any) {
    if(navigator.serviceWorker === undefined || Notification.permission !== "granted") { return; }
    navigator.serviceWorker.ready.then(async(worker) => {
        const sub = await worker.pushManager.getSubscription();
        if(sub === null) {
            const newSub = await worker.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: "BHGmyPPDwNe9RsAFQIVqS0dXkseTTQJlTBbIkdOsqXVChwGzwRBKApnqDpqJULquDEZmV6DDceJh8ZGexF25Epw"
            });
            callback(newSub);
        } else {
            callback(sub);
        }
    });
}
