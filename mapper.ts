import {
  UNKNOWN,
  FUNC_TYPE,
  OBJ_TYPE,
} from "./constants.ts";

import { Util } from "./util.ts";

export class Mapper {
  static acc: any;

  static rgx(ua: string, arrays: any[], out: any) {
    let i = 0, j, k, p, q, matches, match;

    // loop through all regexes maps
    while (i < arrays.length && !matches) {
      const regex = arrays[i], // even sequence (0,2,4,..)
        props = arrays[i + 1]; // odd sequence (1,3,5,..)
      j = k = 0;

      // try matching uastring with regexes
      while (j < regex.length && !matches) {
        matches = regex[j++].exec(ua);

        if (!!matches) {
          for (p = 0; p < props.length; p++) {
            match = matches[++k];
            q = props[p];
            // check if given property is actually array
            if (typeof q === OBJ_TYPE && q.length > 0) {
              if (q.length == 2) {
                if (typeof q[1] == FUNC_TYPE) {
                  // assign modified match
                  out[q[0]] = q[1].call(out, match);
                } else {
                  // assign given value, ignore regex match
                  out[q[0]] = q[1];
                }
              } else if (q.length == 3) {
                // check whether function or regex
                if (typeof q[1] === FUNC_TYPE && !(q[1].exec && q[1].test)) {
                  // call function (usually string mapper)
                  out[q[0]] = match ? q[1].call(out, match, q[2]) : undefined;
                } else {
                  // sanitize match using given regex
                  out[q[0]] = match ? match.replace(q[1], q[2]) : undefined;
                }
              } else if (q.length == 4) {
                out[q[0]] = match
                  ? q[3].call(out, match.replace(q[1], q[2]))
                  : undefined;
              }
            } else {
              out[q] = match ? match : undefined;
            }
          }
        }
      }
      i += 2;
    }
  }

  static str(str: string, map: any) {
    for (var i in map) {
      // check if array
      if (typeof map[i] === OBJ_TYPE && map[i].length > 0) {
        for (var j = 0; j < map[i].length; j++) {
          if (Util.has(map[i][j], str)) {
            return (i === UNKNOWN) ? undefined : i;
          }
        }
      } else if (Util.has(map[i], str)) {
        return (i === UNKNOWN) ? undefined : i;
      }
    }
    return str;
  }
}
