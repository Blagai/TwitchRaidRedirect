// ==UserScript==
// @name         TwitchRaidRedirect
// @namespace    https://github.com/Blagai/TwitchRaidRedirect
// @version      0.1
// @description	 Automatically go back from twitch raids
// @author       Blagai
// @match        *://*.twitch.tv/*
// @grant        none
// @run-at       document-end
// @require      https://code.jquery.com/jquery-3.4.1.min.js
// ==/UserScript==

(function() {
    console.log('[TwitchRaidRedirect] Loaded');

    // Define the specific URL to redirect to
    const specificUrl = 'https://www.twitch.tv/PutOwnURL' // Can change to whatever or somehow make it original URl if you know how

    // Global variables
    let monitoringInterval = null;
    let redirectPending = false;

    // Function to start monitoring URL changes
    window.startTwitchRaidRedirect = function() {
        console.log('[TwitchRaidRedirect] Monitoring URL changes...');

        function monitorUrlChange() {
            const currentUrl = window.location.href;

            if (!redirectPending && currentUrl !== specificUrl) {
                redirectPending = true; // Set the flag to avoid resetting the timer
                console.log(`Detected URL change from ${specificUrl} to ${currentUrl}`);
                console.log(`Waiting 30 seconds before redirecting...`);

                setTimeout(() => {
                    console.log(`Redirecting back to the specific URL: ${specificUrl}`);
                    window.location.href = specificUrl;
                    redirectPending = false; // Reset the flag after redirecting
                }, 30000); // 30-second delay
            }
        }

        monitoringInterval = setInterval(monitorUrlChange, 1000);
    };

    // Function to stop monitoring URL changes
    window.stopTwitchRaidRedirect = function() {
        if (monitoringInterval) {
            clearInterval(monitoringInterval);
            monitoringInterval = null;
            console.log('[TwitchRaidRedirect] Stopped monitoring.');
        } else {
            console.log('[TwitchRaidRedirect] Monitoring was not active.');
        }
    };
})();