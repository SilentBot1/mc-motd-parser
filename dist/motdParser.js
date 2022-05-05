"use strict";
/*
 * minecraft motd parser v1.0.8
 * (c) 2021 Kevin Zheng + Brad Marsden
 * Released under the MIT license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.motdParser = void 0;
const utils_1 = require("./utils");
/**
 * ### `textToHTML(string)`
 * Convert motd text to html.
 */
function textToHTML(motdString) {
    let codeSplit = utils_1.splitString(motdString);
    let colorHex = '';
    let fontStyle = '';
    let skipNext = 0;
    let resultHTML = '';
    codeSplit.forEach((item, index) => {
        if (skipNext > 0) {
            skipNext--;
            return;
        }
        const stringToLowerCase = item.toLowerCase();
        if (utils_1.colorCodeToHex.hasOwnProperty(stringToLowerCase)) {
            colorHex = utils_1.colorCodeToHex[stringToLowerCase];
        }
        else if (utils_1.extras.hasOwnProperty(stringToLowerCase)) {
            fontStyle = utils_1.extras[stringToLowerCase];
        }
        else if (stringToLowerCase == "§x") {
            const hexColourCode = ("#" + codeSplit[index + 2] + codeSplit[index + 4] + codeSplit[index + 6] + codeSplit[index + 8] + codeSplit[index + 10] + codeSplit[index + 12]).replaceAll('§', '');
            resultHTML += `<span style="color:${hexColourCode}${fontStyle}">${codeSplit[index + 13]}</span>`;
            skipNext = 13;
        }
        else {
            let resultColor = '';
            if (colorHex !== '') {
                resultColor = `color:${colorHex};`;
            }
            if (item !== '') {
                let textContent = utils_1.htmlStringFormatting(item);
                if (resultColor.length !== 0 || fontStyle.length !== 0) {
                    resultHTML += `<span style="${resultColor}${fontStyle}">${textContent}</span>`;
                }
                else {
                    resultHTML += textContent;
                }
            }
        }
    });
    return resultHTML;
}
/**
 * ### `textToJSON(string)`
 * Convert motd text to JSON.
 */
function parseTextToJSON(motdString) {
    const codeSplit = utils_1.splitString(motdString);
    let colorHex = '';
    let fontStyle = '';
    let skipNext = 0;
    let resultObject = {
        text: '',
        extra: []
    };
    codeSplit.forEach((item, index) => {
        if (skipNext > 0) {
            skipNext--;
            return;
        }
        let stringToLowerCase = item.toLowerCase();
        if (utils_1.colorCodeToHex.hasOwnProperty(stringToLowerCase)) {
            colorHex = utils_1.colorCodeToHex[stringToLowerCase];
        }
        else if (utils_1.textToJsonExtras.hasOwnProperty(stringToLowerCase)) {
            fontStyle = utils_1.textToJsonExtras[stringToLowerCase];
        }
        else {
            if (stringToLowerCase == "§x") {
                const hexColourCode = "#" + codeSplit[index + 2] + codeSplit[index + 4] + codeSplit[index + 6] + codeSplit[index + 8] + codeSplit[index + 10] + codeSplit[index + 12];
                colorHex = hexColourCode.replaceAll('§', '');
                skipNext = 13;
            }
            let innerObject = {
                text: "",
                extra: []
            };
            if (fontStyle !== '') {
                innerObject[fontStyle] = true;
            }
            innerObject.text = item;
            if (colorHex !== '') {
                innerObject.color = colorHex;
            }
            if (typeof resultObject.extra === 'object') {
                resultObject.extra.push(innerObject);
            }
        }
    });
    return resultObject;
}
/**
 * ### `JSONToString(string)`
 * Convert JSON to HTML.
 */
function parseJSONToHTML(sourceJson) {
    let htmlElement = '';
    let colorHex = '';
    let fontStyle = '';
    for (let key of Object.keys(sourceJson)) {
        key = key.toLowerCase();
        if (utils_1.extraFontStyles.hasOwnProperty(key)) {
            if (sourceJson[key]) {
                fontStyle = `${utils_1.extraFontStyles[key]}`;
            }
            else {
                if (key === 'bold') {
                    fontStyle += 'font-weight:normal !important;';
                }
                else if (key === 'italic') {
                    fontStyle += 'font-style: normal !important;';
                }
                else if (key === 'underlined' || key === 'strikethrough') {
                    fontStyle += 'text-decoration: none !important;';
                }
                else if (key === 'obfuscated') {
                    fontStyle += '';
                }
                else {
                    fontStyle = '';
                }
            }
            continue;
        }
        if (key === 'text' && typeof sourceJson.text === 'string') {
            // replace space to &nbsp; code
            htmlElement += textToHTML(sourceJson.text);
            continue;
        }
        if (key === "color") {
            let colorKey = sourceJson[key];
            if (typeof colorKey === 'string') {
                // Hex color
                if (utils_1.extraColorsToHex.hasOwnProperty(colorKey)) {
                    colorHex = `color: ${utils_1.extraColorsToHex[colorKey]};`;
                    continue;
                    // color code
                }
                else if (utils_1.colorCodeToHex.hasOwnProperty(colorKey)) {
                    colorHex = `color: ${utils_1.colorCodeToHex[colorKey]};`;
                    continue;
                    // custom color
                }
                else {
                    // custom hex color code mode
                    colorHex = `color: ${colorKey};`;
                    continue;
                }
            }
        }
        if (key === "extra" && typeof sourceJson.extra === 'object') {
            for (let sourceJsonExtra of sourceJson.extra) {
                if (utils_1.isMotdJSONType(sourceJsonExtra)) {
                    htmlElement += parseJSONToHTML(sourceJsonExtra);
                }
            }
        }
    }
    if (fontStyle || colorHex) {
        return `<span style="${colorHex + fontStyle}">${htmlElement}</span>`;
    }
    else {
        return htmlElement;
    }
}
function jsonEnterRender(json) {
    return parseJSONToHTML(JSON.parse(JSON.stringify(json)));
}
function textEnterRender(text) {
    return textToHTML(text);
}
/**
 * ### `autoToHtml(object | string)`
 * auto check data type then convert to html.
 */
function autoToHtml(motd) {
    if (typeof motd === 'object') {
        return jsonEnterRender(motd);
    }
    else if (typeof motd === 'string') {
        return jsonEnterRender(parseTextToJSON(motd));
    }
    else {
        return 'unknown motd data type';
    }
}
const motdParserFuncs = {
    cleanTags: utils_1.cleanTags,
    textToHTML,
    textToJSON: parseTextToJSON,
    JSONToHtml: parseJSONToHTML,
    jsonEnterRender,
    textEnterRender,
    autoToHtml
};
exports.motdParser = motdParserFuncs;
