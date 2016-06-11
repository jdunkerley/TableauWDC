/**
 * Created by jdunk on 07/06/2016.
 */
'use strict';
var GulpConfig = (function () {
    function gulpConfig() {
        this.source = './src/';
        this.allTypeScript = this.source + '/**/*.ts';
        this.libraryTypeScriptDefinitions = './typings/**/*.ts';

        this.tsOutputPath = './js/';
        this.allJavaScript = 'js/**/*.js';
        
        this.entryPoint = 'js/index.js';

        this.typings = './typings/';
    }
    return gulpConfig;
})();
module.exports = GulpConfig;