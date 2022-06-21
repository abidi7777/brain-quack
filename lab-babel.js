/* eslint-disable import/no-extraneous-dependencies */

const babel = require('@babel/core');

module.exports = [
  {
    ext: 'js',
    transform: (content, filename) => {
      if (/node_modules/.test(filename)) {
        return content;
      }

      const { code } = babel.transform(content, {
        filename,
      });

      return code;
    },
  },
];
