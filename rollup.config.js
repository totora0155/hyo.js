import babel from 'rollup-plugin-babel';
import nodeResolve from 'rollup-plugin-node-resolve';
const banner = `
/*!
 * Copyright 2016, nju33
 * Released under the MIT License
 * https://github.com/totora0155/hyo.js
 */
`;

export default {
  banner: banner.trim(),
  entry: 'lib/hyo.js',
  format: 'umd',
  dest: 'dist/hyo.js',
  moduleName: 'Hyo',
  plugins: [
    babel(),
    nodeResolve({
      jsnext: true
    })
  ]
};
