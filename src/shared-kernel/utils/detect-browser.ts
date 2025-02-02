export const detectBrowser = (): string => {
  const browserInfo = navigator.userAgent;

  switch (true) {
    case browserInfo.includes("Opera") || browserInfo.includes("Opr"):
      return "opera";
    case browserInfo.includes("Chrome"):
      return "chrome";
    case browserInfo.includes("Edg"):
      return "edge";
    case browserInfo.includes("Safari"):
      return "safari";
    case browserInfo.includes("Firefox"):
      return "firefox";
    default:
      return "unknown";
  }
};
