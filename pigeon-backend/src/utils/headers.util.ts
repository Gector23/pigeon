import UAParser from "ua-parser-js";

export interface IUserAgent {
  browser?: string;
  browserVersion?: string;
  os?: string;
  osVersion?: string;
  deviceModel?: string;
  deviceType?: string;
}

export const parseUserAgentHeader = (userAgentHeader: string | undefined): IUserAgent => {
  const parser = new UAParser(userAgentHeader);
  const parserResults = parser.getResult();
  return {
    browser: parserResults.browser.name,
    browserVersion: parserResults.browser.version,
    os: parserResults.os.name,
    osVersion: parserResults.os.version,
    deviceModel: parserResults.device.model,
    deviceType: parserResults.device.type,
  };
};
