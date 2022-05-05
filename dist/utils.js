"use strict";
/*
 * minecraft motd parser v1.0.8
 * (c) 2021 Kevin Zheng
 * Released under the MIT license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.extraColorsToHex = exports.colorCodeToHex = exports.textToJsonExtras = exports.extraFontStyles = exports.extras = exports.cleanTags = exports.splitString = exports.htmlStringFormatting = exports.isMotdJSONType = void 0;
const tagRegexString = /([§][0-9a-fA-FfklmnorxFKLMNORX])/g;
function isMotdJSONType(object) {
    return object;
}
exports.isMotdJSONType = isMotdJSONType;
function htmlStringFormatting(text) {
    return text
        .replace(/ /g, '\u00a0')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/\"/g, '&quot;')
        .replace(/\'/g, '&#39;')
        .replace(/\n/g, '<br/>');
    // .replace(/\//g, '&#x2F;');
}
exports.htmlStringFormatting = htmlStringFormatting;
function splitString(motd = '') {
    return motd.split(tagRegexString);
}
exports.splitString = splitString;
function cleanTags(text = '') {
    return text.replace(tagRegexString, '');
}
exports.cleanTags = cleanTags;
exports.extras = {
    '§k': 'obfuscated;',
    '§l': 'font-weight: bold;',
    '§m': 'text-decoration: line-through;',
    '§n': 'text-decoration:underline;',
    '§o': 'font-style: italic;',
    '§r': 'text-decoration: none !important;font-weight:normal!important;font-style: normal!important;',
};
exports.extraFontStyles = {
    "bold": "font-weight: bold;",
    "italic": "font-style: italic;",
    "underlined": "text-decoration:underline;",
    "strikethrough": "text-decoration: line-through;",
    "obfuscated": "mc_obfuscated;"
};
exports.textToJsonExtras = {
    '§k': 'obfuscated',
    '§l': 'bold',
    '§m': 'strikethrough',
    '§n': 'underline',
    '§o': 'italic',
    '§r': '',
    // 大寫
    '§K': 'obfuscated',
    '§L': 'bold',
    '§M': 'strikethrough',
    '§N': 'underline',
    '§O': 'italic',
    '§P': ''
};
exports.colorCodeToHex = {
    '§0': '#000000',
    '§1': '#0000AA',
    '§2': '#00AA00',
    '§3': '#00AAAA',
    '§4': '#AA0000',
    '§5': '#AA00AA',
    '§6': '#FFAA00',
    '§7': '#AAAAAA',
    '§8': '#555555',
    '§9': '#5555FF',
    '§a': '#55FF55',
    '§b': '#55FFFF',
    '§c': '#FF5555',
    '§d': '#FF55FF',
    '§e': '#FFFF55',
    '§f': '#FFFFFF',
};
exports.extraColorsToHex = {
    'black': '#000000',
    'dark_blue': '#0000AA',
    'dark_green': '#00AA00',
    'dark_aqua': '#00AAAA',
    'dark_red': '#AA0000',
    'dark_purple': '#AA00AA',
    'gold': '#FFAA00',
    'gray': '#AAAAAA',
    'dark_gray': '#555555',
    'blue': '#5555FF',
    'green': '#55FF55',
    'aqua': '#55FFFF',
    'red': '#FF5555',
    'light_purple': '#FF55FF',
    'yellow': '#FFFF55',
    'white': '#FFFFFF',
};
