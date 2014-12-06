function createRequireGlobalPreprocessor() {
    return function(content, file, done) {
        var result = [
            '(function () { ',
            '    var require = { paths: {}, shim: {} };',
            content,
            '    requirejs.config(require);',
            '})();'
        ];
        done(result.join('\n'));
    }
}

module.exports = {
    'preprocessor:requireglobal': ['factory', createRequireGlobalPreprocessor]
};
