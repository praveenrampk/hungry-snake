const firefoxMV3 = {
  permissions: ["storage", "tabs"],
  background: {
    service_worker: "src/pages/background/index.ts",
  },
};

export default firefoxMV3;
