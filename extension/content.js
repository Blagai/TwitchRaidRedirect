browser = chrome || browser;

window.addEventListener('message', (event) => {
    if (event.data.type === 'RAID_DETECTED') {
        console.log("Raid triggered to", event.data.channel);

        browser.runtime.sendMessage({
            action: 'redirect',
            targetChannel: event.data.targetChannel
        });
    }
});

const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        const raidNotif = document.querySelector('[msg-id="raid_notification"]');
        if (raidNotif) {
            const raidingChannel = currentChannel();
            window.postMessage({
                type: 'RAID_DETECTED',
                channel: raidingChannel
            }, '*');
        }
    });
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});

function currentChannel(element) {
    // Code to get channel user is currently on, will do later
}