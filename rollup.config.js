export default [{
    input: 'index.js',
    output: [{
        file: 'build/module.js',
        format: 'es'
    }, {
        file: 'build/common.js',
        format: 'cjs'
    }]
}];