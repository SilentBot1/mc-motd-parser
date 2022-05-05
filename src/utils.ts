/*
 * minecraft motd parser v1.0.8
 * (c) 2021 Kevin Zheng
 * Released under the MIT license
 */

import {extraLibraryType, motdJsonType} from './types';

const tagRegexString = /([§][0-9a-fA-FfklmnorxFKLMNORX])/g

export function isMotdJSONType(object: any): object is motdJsonType {
  return object;
}

export function htmlStringFormatting(text: string): string {
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

export function splitString(motd: string = ''): string[] {
    return motd.split(tagRegexString);
}

export function cleanTags(text: string = '') {
    return text.replace(tagRegexString, '')
}

export const extras: extraLibraryType = {
    '§k': 'obfuscated;',
    '§l': 'font-weight: bold;',
    '§m': 'text-decoration: line-through;',
    '§n': 'text-decoration:underline;',
    '§o': 'font-style: italic;',
    '§r': 'text-decoration: none !important;font-weight:normal!important;font-style: normal!important;',
};
export const extraFontStyles: extraLibraryType = {
    "bold": "font-weight: bold;",
    "italic": "font-style: italic;",
    "underlined": "text-decoration:underline;",
    "strikethrough": "text-decoration: line-through;",
    "obfuscated": "mc_obfuscated;"
};
export const textToJsonExtras: extraLibraryType = {
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
export const colorCodeToHex: extraLibraryType = {
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
export const extraColorsToHex: extraLibraryType = {
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