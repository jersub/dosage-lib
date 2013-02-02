var config = module.exports;

config["CLI Dosage tests"] = {
  env: 'node',
  rootPath: '../',
  tests: [
    'test/*-test.js',
  ],
};

config["Browser Dosage tests"] = {
  env: 'browser',
  rootPath: '../',
  sources: [
    'src/dosage.js',
  ],
  tests: [
    'test/*-test.js',
  ],
};

