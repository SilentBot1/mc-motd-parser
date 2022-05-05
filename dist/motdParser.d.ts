import { motdJsonType } from './types';
import { cleanTags } from './utils';
/**
 * ### `textToHTML(string)`
 * Convert motd text to html.
 */
declare function textToHTML(motdString: string): string;
/**
 * ### `textToJSON(string)`
 * Convert motd text to JSON.
 */
declare function parseTextToJSON(motdString: string): motdJsonType;
/**
 * ### `JSONToString(string)`
 * Convert JSON to HTML.
 */
declare function parseJSONToHTML(sourceJson: motdJsonType): string;
declare function jsonEnterRender(json: motdJsonType | object): string;
declare function textEnterRender(text: string): string;
/**
 * ### `autoToHtml(object | string)`
 * auto check data type then convert to html.
 */
declare function autoToHtml(motd: motdJsonType | string | object): string;
export declare const motdParser: {
    cleanTags: typeof cleanTags;
    textToHTML: typeof textToHTML;
    textToJSON: typeof parseTextToJSON;
    JSONToHtml: typeof parseJSONToHTML;
    jsonEnterRender: typeof jsonEnterRender;
    textEnterRender: typeof textEnterRender;
    autoToHtml: typeof autoToHtml;
};
export {};
