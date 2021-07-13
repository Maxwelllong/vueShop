const transform = require("lodash.transform");

const proPlugin = []

if(process.env.NODE_ENV === 'production'){
  proPlugin.push('transform-remove-console')
}

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
      ...proPlugin
    ]
  ]
};
