browser = chrome || browser;

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'redirect') {
        const targetChannel = request.targetChannel;

        browser.tabs.update(sender.tab.id, {
            url: `https://twitch.tv/${targetChannel}`
        });

        sendResponse({ status: 'redirected' });
    }
});