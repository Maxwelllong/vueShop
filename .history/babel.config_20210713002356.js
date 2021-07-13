const transform = require("lodash.transform");

module.exports = {
  presets: ["@vue/app"],
  plugins: [
    // element官方教程
    [
      "component",
      {
        libraryName: "element-ui",
        styleLibraryName: "theme-chalk"
      },
      transform-remove-console
    ]
  ]
};
