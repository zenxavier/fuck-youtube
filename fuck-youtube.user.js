// ==UserScript==
// @name        Fuck YouTube
// @namespace   Tampermonkey Scripts
// @match       https://www.youtube.com/*
// @exclude     https://www.youtube.com/watch*
// @grant       none
// @version     1.0
// @author      ZenXavier@gmail.com
// @description Fucks YouTube - Disable auto-play on everything but the "https://www.youtube.com/watch?*" URL and turns off auto-looping of YouTube shorts
// ==/UserScript==

function fuckingWaitFor(selector) {
    // this only seems to work when opening the link in a new tab ('right-click' -> 'Open in new tab')
    // doesn't seem to work if navigating directly
    return new Promise(resolve => {
        new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                fuckTheseThings(document.querySelector(selector));
            }
        }).observe(document.body, { childList: true, subtree: true });

        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }
    });
}

function fuckThisVideo(el) {
    if (el.hasAttribute('loop')) {
        // disable auto-looping
        el.removeAttribute('loop')
    } else {
        // pause auto-play
        el.pause();
    }
    // add bullshit for whatever additional fucking annoyances YouTube decides to add to their videos here.
}

function fuckTheseThings(el) {
    if (el !== null) {
        el.addEventListener('loadstart', (evt) => fuckThisVideo(evt.target), { passive: true });
        //add more things to fuck in the future
    }
}

function fuckYouTube() {
    fuckingWaitFor('video')
        .then(el => fuckTheseThings(el));
}

fuckYouTube();