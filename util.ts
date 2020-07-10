import { STR_TYPE } from "./constants.ts";

export class Util {
  static extend(regexes: any, extensions: any) {
    const mergedRegexes: any = {};
    for (var i in regexes) {
      if (extensions[i] && extensions[i].length % 2 === 0) {
        mergedRegexes[i] = extensions[i].concat(regexes[i]);
      } else {
        mergedRegexes[i] = regexes[i];
      }
    }
    return mergedRegexes;
  }

  static has(str1: string, str2: string) {
    if (typeof str1 === "string") {
      return str2.toLowerCase().indexOf(str1.toLowerCase()) !== -1;
    } else {
      return false;
    }
  }

  static lowerize(str: string) {
    return str.toLowerCase();
  }

  static major(version: string) {
    return typeof (version) === STR_TYPE
      ? version.replace(/[^\d\.]/g, "").split(".")[0]
      : undefined;
  }

  static trim(str: string) {
    return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
  }
}
