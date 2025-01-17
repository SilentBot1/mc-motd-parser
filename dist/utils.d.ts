import { extraLibraryType, motdJsonType } from './types';
export declare function isMotdJSONType(object: any): object is motdJsonType;
export declare function htmlStringFormatting(text: string): string;
export declare function splitString(motd?: string): string[];
export declare function cleanTags(text?: string): string;
export declare const extras: extraLibraryType;
export declare const extraFontStyles: extraLibraryType;
export declare const textToJsonExtras: extraLibraryType;
export declare const colorCodeToHex: extraLibraryType;
export declare const extraColorsToHex: extraLibraryType;
