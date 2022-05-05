/*
 * minecraft motd parser v1.0.8
 * (c) 2021 Kevin Zheng + Brad Marsden
 * Released under the MIT license
 */

import {motdJsonType} from './types';
import {
    colorCodeToHex,
    extraColorsToHex,
    extraFontStyles,
    extras,
    htmlStringFormatting,
    isMotdJSONType,
    textToJsonExtras,
    cleanTags, splitString
} from './utils';

/** 
 * ### `textToHTML(string)`
 * Convert motd text to html.
 */

function textToHTML(motdString: string) {
    let codeSplit = splitString(motdString)

    let colorHex = ''
    let fontStyle = ''
    let skipNext = 0
    let resultHTML = ''

    codeSplit.forEach((item, index) => {
        if(skipNext > 0){
            skipNext--
            return
        }
        const stringToLowerCase = item.toLowerCase()
        if (colorCodeToHex.hasOwnProperty(stringToLowerCase)) {
            colorHex = colorCodeToHex[stringToLowerCase]
        } else if (extras.hasOwnProperty(stringToLowerCase)) {
            fontStyle = extras[stringToLowerCase]
        } else if (stringToLowerCase == "§x"){
            const hexColourCode = ("#" + codeSplit[index+2] + codeSplit[index+4] + codeSplit[index+6] + codeSplit[index+8] + codeSplit[index+10] + codeSplit[index+12]).replaceAll('§', '')
            resultHTML += `<span style="color:${hexColourCode}${fontStyle}">${codeSplit[index+13]}</span>`
            skipNext = 13
        } else {
            let resultColor = ''
            if (colorHex !== '') {
                resultColor = `color:${colorHex};`
            }
            if (item !== '') {
                let textContent = htmlStringFormatting(item)
                if (resultColor.length !== 0 || fontStyle.length !== 0) {
                    resultHTML += `<span style="${resultColor}${fontStyle}">${textContent}</span>`
                } else {
                    resultHTML += textContent
                }
            }
        }
    })

    return resultHTML
}

/** 
 * ### `textToJSON(string)`
 * Convert motd text to JSON.
 */

function parseTextToJSON(motdString: string) {
    const codeSplit = splitString(motdString)

    let colorHex = ''
    let fontStyle = ''
    let skipNext = 0
    let resultObject: motdJsonType = {
        text: '',
        extra: []
    }

    codeSplit.forEach((item, index) => {
        if(skipNext > 0){
            skipNext--
            return
        }

        let stringToLowerCase = item.toLowerCase()

        if (colorCodeToHex.hasOwnProperty(stringToLowerCase)) {
            colorHex = colorCodeToHex[stringToLowerCase]
        } else if (textToJsonExtras.hasOwnProperty(stringToLowerCase)) {
            fontStyle = textToJsonExtras[stringToLowerCase]
        }else {
            if (stringToLowerCase == "§x"){
                const hexColourCode = "#" + codeSplit[index+2] + codeSplit[index+4] + codeSplit[index+6] + codeSplit[index+8] + codeSplit[index+10] + codeSplit[index+12]
                colorHex = hexColourCode.replaceAll('§', '')
                skipNext = 13
            }

            let innerObject: motdJsonType = {
                text: "",
                extra: []
            }

            if (fontStyle !== '') {
                innerObject[fontStyle] = true
            }
            innerObject.text = item

            if (colorHex !== '') {
                innerObject.color = colorHex
            }

            if (typeof resultObject.extra === 'object') {
                resultObject.extra.push(innerObject)
            }
        }
    })
    return resultObject;
}


/** 
 * ### `JSONToString(string)`
 * Convert JSON to HTML.
 */

function parseJSONToHTML(sourceJson: motdJsonType) {
    let htmlElement = ''
    let colorHex = ''
    let fontStyle = ''

    for (let key of Object.keys(sourceJson)) {
        key = key.toLowerCase()

        if (extraFontStyles.hasOwnProperty(key)) {
            if (sourceJson[key]) {
                fontStyle = `${extraFontStyles[key]}`
            } else {
                if (key === 'bold') {
                    fontStyle += 'font-weight:normal !important;'
                } else if (key === 'italic') {
                    fontStyle += 'font-style: normal !important;'
                } else if (key === 'underlined' || key === 'strikethrough') {
                    fontStyle += 'text-decoration: none !important;'
                } else if (key === 'obfuscated') {
                    fontStyle += ''
                } else {
                    fontStyle = ''
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
            let colorKey = sourceJson[key]

            if (typeof colorKey === 'string') {
                // Hex color
                if (extraColorsToHex.hasOwnProperty(colorKey)) {
                    colorHex = `color: ${extraColorsToHex[colorKey]};`;
                    continue;
                    // color code
                } else if (colorCodeToHex.hasOwnProperty(colorKey)) {
                    colorHex = `color: ${colorCodeToHex[colorKey]};`;
                    continue;
                    // custom color
                } else {
                    // custom hex color code mode
                    colorHex = `color: ${colorKey};`;
                    continue;
                }
            }
        }

        if (key === "extra" && typeof sourceJson.extra === 'object') {
            for (let sourceJsonExtra of sourceJson.extra) {
                if (isMotdJSONType(sourceJsonExtra)) {
                    htmlElement += parseJSONToHTML(sourceJsonExtra);
                }
            }
        }
    }

    if (fontStyle || colorHex) {
        return `<span style="${colorHex + fontStyle}">${htmlElement}</span>`
    } else {
        return htmlElement
    }

}

function jsonEnterRender(json: motdJsonType | object) {
    return parseJSONToHTML(JSON.parse(JSON.stringify(json)));
}

function textEnterRender(text: string) {
    return textToHTML(text);
}

/** 
 * ### `autoToHtml(object | string)`
 * auto check data type then convert to html.
 */
function autoToHtml(motd: motdJsonType | string | object): string {
    if (typeof motd === 'object') {
        return jsonEnterRender(motd);
    } else if (typeof motd === 'string') {
        return jsonEnterRender(parseTextToJSON(motd));
    } else {
        return 'unknown motd data type';
    }
}

const motdParserFuncs = {
    cleanTags,
    textToHTML,
    textToJSON: parseTextToJSON,
    JSONToHtml: parseJSONToHTML,
    jsonEnterRender,
    textEnterRender,
    autoToHtml
}

export const motdParser = motdParserFuncs;