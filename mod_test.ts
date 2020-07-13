import { assertEquals, test } from "./test_deps.ts";
import * as mod from "./mod.ts";

const USER_AGENT =
  "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36";

const BROWSER = { name: "Chrome", version: "83.0.4103.116", major: "83" };
const OS = { name: "Windows", version: "7" };
const ENGINE = { name: "Blink", version: "83.0.4103.116" };
const DEVICE = { vendor: undefined, model: undefined, type: undefined };
const CPU = { architecture: "amd64" };

function getUAParser() {
  return new mod.UAParser(USER_AGENT);
}

test({
  name: "parse browser",
  fn() {
    const uaParser = getUAParser();

    assertEquals(typeof uaParser, "object");

    const browser = uaParser.getBrowser();

    assertEquals(typeof browser, "object");
    assertEquals(browser, BROWSER);
  },
});

test({
  name: "parse os",
  fn() {
    const uaParser = getUAParser();

    assertEquals(typeof uaParser, "object");

    const os = uaParser.getOS();

    assertEquals(typeof os, "object");
    assertEquals(os, OS);
  },
});

test({
  name: "parse browsers engine",
  fn() {
    const uaParser = getUAParser();

    assertEquals(typeof uaParser, "object");

    const engine = uaParser.getEngine();

    assertEquals(typeof engine, "object");
    assertEquals(engine, ENGINE);
  },
});

test({
  name: "parse device",
  fn() {
    const uaParser = getUAParser();

    assertEquals(typeof uaParser, "object");

    const device = uaParser.getDevice();
    assertEquals(typeof device, "object");

    assertEquals(device, DEVICE);
  },
});

test({
  name: "parse cpu",
  fn() {
    const uaParser = getUAParser();

    assertEquals(typeof uaParser, "object");

    const cpu = uaParser.getCPU();

    assertEquals(typeof cpu, "object");
    assertEquals(cpu, CPU);
  },
});

test({
  name: "get result",
  fn() {
    const uaParser = getUAParser();

    assertEquals(typeof uaParser, "object");

    const result = uaParser.getResult();

    assertEquals(typeof result, "object");
    assertEquals(result.browser, BROWSER);
    assertEquals(result.os, OS);
    assertEquals(result.engine, ENGINE);
    assertEquals(result.device, DEVICE);
    assertEquals(result.cpu, CPU);
  },
});

test({
  name: "get ua method",
  fn() {
    const uaParser = getUAParser();

    assertEquals(typeof uaParser, "object");
    assertEquals(uaParser.getUA(), USER_AGENT);
  },
});

test({
  name: "set ua method",
  fn() {
    const uaParser = new mod.UAParser();

    assertEquals(typeof uaParser, "object");

    uaParser.setUA(USER_AGENT);

    assertEquals(uaParser.getUA(), USER_AGENT);
  },
});
