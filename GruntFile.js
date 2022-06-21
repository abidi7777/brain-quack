/* eslint-disable import/no-extraneous-dependencies */

const babel = require('@babel/core');
const path = require('path');

module.exports = function gruntify(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    browserify: {
      dist: {
        files: {
          [path.resolve(__dirname, 'dist', 'brain-quack.web.js')]: path.resolve(__dirname, 'dist', 'brain-quack.js'),
        },
      },
    },
    clean: {
      dist: [path.resolve(__dirname, 'dist')],
    },
    uglify: {
      dist: {
        files: {
          [path.resolve(__dirname, 'dist', 'brain-quack.js')]: path.resolve(__dirname, 'dist', 'brain-quack.js'),
          [path.resolve(__dirname, 'dist', 'brain-quack.module.js')]: path.resolve(__dirname, 'dist', 'brain-quack.module.js'),
          [path.resolve(__dirname, 'dist', 'brain-quack.web.js')]: path.resolve(__dirname, 'dist', 'brain-quack.web.js'),
        },
      },
    },
  });

  grunt.registerTask('module', 'create module', () => {
    const { code } = babel.transformFileSync(path.resolve(__dirname, 'src', 'brain-quack.js'), {
      presets: [['@babel/preset-env', { modules: false }]],
    });

    grunt.file.write('././dist/brain-quack.module.js', code);
  });

  grunt.registerTask('commonjs', 'create commonjs', () => {
    const { code } = babel.transformFileSync(path.resolve(__dirname, 'src', 'brain-quack.js'), { presets: ['@babel/preset-env'] });

    grunt.file.write('././dist/brain-quack.js', code);
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.registerTask('default', ['clean', 'module', 'commonjs', 'browserify', 'uglify']);
};
