import {
  LIBVERSION,
  MAJOR,
  MODEL,
  NAME,
  TYPE,
  VENDOR,
  VERSION,
  ARCHITECTURE,
  CONSOLE,
  MOBILE,
  TABLET,
  SMARTTV,
  WEARABLE,
  EMBEDDED,
} from "./constants.ts";
import { Util } from "./util.ts";
import { Mapper } from "./mapper.ts";
import { regexes } from "./rules.ts";

export interface IBrowser {
  /**
   * Possible values :
   * Amaya, Android Browser, Arora, Avant, Baidu, Blazer, Bolt, Camino, Chimera, Chrome,
   * Chromium, Comodo Dragon, Conkeror, Dillo, Dolphin, Doris, Edge, Epiphany, Fennec,
   * Firebird, Firefox, Flock, GoBrowser, iCab, ICE Browser, IceApe, IceCat, IceDragon,
   * Iceweasel, IE [Mobile], Iron, Jasmine, K-Meleon, Konqueror, Kindle, Links,
   * Lunascape, Lynx, Maemo, Maxthon, Midori, Minimo, MIUI Browser, [Mobile] Safari,
   * Mosaic, Mozilla, Netfront, Netscape, NetSurf, Nokia, OmniWeb, Opera [Mini/Mobi/Tablet],
   * Phoenix, Polaris, QQBrowser, RockMelt, Silk, Skyfire, SeaMonkey, SlimBrowser, Swiftfox,
   * Tizen, UCBrowser, Vivaldi, w3m, Yandex
   */
  name: string | undefined;

  /**
   * Determined dynamically
   */
  version: string | undefined;

  /**
   * Determined dynamically
   * @deprecated
   */
  major: string | undefined;
}

export interface IDevice {
  /**
   * Determined dynamically
   */
  model: string | undefined;

  /**
   * Possible type:
   * console, mobile, tablet, smarttv, wearable, embedded
   */
  type: string | undefined;

  /**
   * Possible vendor:
   * Acer, Alcatel, Amazon, Apple, Archos, Asus, BenQ, BlackBerry, Dell, GeeksPhone,
   * Google, HP, HTC, Huawei, Jolla, Lenovo, LG, Meizu, Microsoft, Motorola, Nexian,
   * Nintendo, Nokia, Nvidia, Ouya, Palm, Panasonic, Polytron, RIM, Samsung, Sharp,
   * Siemens, Sony-Ericsson, Sprint, Xbox, ZTE
   */
  vendor: string | undefined;
}

export interface IEngine {
  /**
   * Possible name:
   * Amaya, EdgeHTML, Gecko, iCab, KHTML, Links, Lynx, NetFront, NetSurf, Presto,
   * Tasman, Trident, w3m, WebKit
   */
  name: string | undefined;
  /**
   * Determined dynamically
   */
  version: string | undefined;
}

export interface IOS {
  /**
   * Possible 'os.name'
   * AIX, Amiga OS, Android, Arch, Bada, BeOS, BlackBerry, CentOS, Chromium OS, Contiki,
   * Fedora, Firefox OS, FreeBSD, Debian, DragonFly, Gentoo, GNU, Haiku, Hurd, iOS,
   * Joli, Linpus, Linux, Mac OS, Mageia, Mandriva, MeeGo, Minix, Mint, Morph OS, NetBSD,
   * Nintendo, OpenBSD, OpenVMS, OS/2, Palm, PCLinuxOS, Plan9, Playstation, QNX, RedHat,
   * RIM Tablet OS, RISC OS, Sailfish, Series40, Slackware, Solaris, SUSE, Symbian, Tizen,
   * Ubuntu, UNIX, VectorLinux, WebOS, Windows [Phone/Mobile], Zenwalk
   */
  name: string | undefined;
  /**
   * Determined dynamically
   */
  version: string | undefined;
}

export interface ICPU {
  /**
   * Possible architecture:
   *  68k, amd64, arm, arm64, avr, ia32, ia64, irix, irix64, mips, mips64, pa-risc,
   *  ppc, sparc, sparc64
   */
  architecture: string | undefined;
}

export interface IResult {
  ua: string;
  browser: IBrowser;
  device: IDevice;
  engine: IEngine;
  os: IOS;
  cpu: ICPU;
}

export interface BROWSER {
  NAME: string;
  /**
   * @deprecated
   */
  MAJOR: string;
  VERSION: string;
}

export interface CPU {
  ARCHITECTURE: string;
}

export interface DEVICE {
  MODEL: string;
  VENDOR: string;
  TYPE: string;
  CONSOLE: string;
  MOBILE: string;
  SMARTTV: string;
  TABLET: string;
  WEARABLE: string;
  EMBEDDED: string;
}

export interface ENGINE {
  NAME: string;
  VERSION: string;
}

export interface OS {
  NAME: string;
  VERSION: string;
}

export class UAParser {
  #uastring?: string;
  #rgxmap: any;

  /**
   * Create a new parser with UA prepopulated and extensions extended
   */
  constructor(uastring?: string, extensions?: any) {
    this.#uastring = uastring;
    this.#rgxmap = extensions ? Util.extend(regexes, extensions) : regexes;
  }

  /**
   *  Returns browser information
   */
  getBrowser(): IBrowser {
    const browser: any = { name: undefined, version: undefined };

    if (this.#uastring) {
      Mapper.rgx(this.#uastring, this.#rgxmap.browser, browser);
      browser.major = Util.major(browser.version); // deprecated
    }

    return browser;
  }

  /**
   *  Returns OS information
   */
  getOS(): IOS {
    const os = { name: undefined, version: undefined };
    if (this.#uastring) {
      Mapper.rgx(this.#uastring, this.#rgxmap.os, os);
    }
    return os;
  }

  /**
   *  Returns browsers engine information
   */
  getEngine(): IEngine {
    const engine = { name: undefined, version: undefined };
    if (this.#uastring) {
      Mapper.rgx(this.#uastring, this.#rgxmap.engine, engine);
    }
    return engine;
  }

  /**
   *  Returns device information
   */
  getDevice(): IDevice {
    const device = { vendor: undefined, model: undefined, type: undefined };
    if (this.#uastring) {
      Mapper.rgx(this.#uastring, this.#rgxmap.device, device);
    }
    return device;
  }

  /**
   *  Returns parsed CPU information
   */
  getCPU(): ICPU {
    const cpu = { architecture: undefined };
    if (this.#uastring) {
      Mapper.rgx(this.#uastring, this.#rgxmap.cpu, cpu);
    }

    return cpu;
  }

  /**
   *  Returns UA string of current instance
   */
  getUA() {
    return this.#uastring;
  }

  /**
   *  Set & parse UA string
   */
  setUA(uastring: string) {
    this.#uastring = uastring;

    return this;
  }

  /**
   *  Returns parse result
   */
  getResult() {
    return {
      ua: this.getUA(),
      browser: this.getBrowser(),
      engine: this.getEngine(),
      os: this.getOS(),
      device: this.getDevice(),
      cpu: this.getCPU(),
    };
  }

  static VERSION: string = LIBVERSION;

  static BROWSER: BROWSER = {
    NAME: NAME,
    MAJOR: MAJOR, // deprecated
    VERSION: VERSION,
  };

  static CPU: CPU = {
    ARCHITECTURE: ARCHITECTURE,
  };

  static DEVICE: DEVICE = {
    MODEL: MODEL,
    VENDOR: VENDOR,
    TYPE: TYPE,
    CONSOLE: CONSOLE,
    MOBILE: MOBILE,
    SMARTTV: SMARTTV,
    TABLET: TABLET,
    WEARABLE: WEARABLE,
    EMBEDDED: EMBEDDED,
  };

  static ENGINE: ENGINE = {
    NAME: NAME,
    VERSION: VERSION,
  };

  static OS: OS = {
    NAME: NAME,
    VERSION: VERSION,
  };
}
