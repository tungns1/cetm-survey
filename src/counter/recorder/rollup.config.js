import node from "rollup-plugin-node-resolve";
import typescript from 'rollup-plugin-typescript';

class RollupNG2 {
    constructor(options) {
        this.options = options;
    }
    resolveId(id, from) {
        if (id.startsWith('rxjs/')) {
            return `${__dirname}/../node_modules/rxjs-es/${id.replace('rxjs/', '')}.js`;
        }
    }
}

const rollupNG2 = (config) => new RollupNG2(config);

export default {
    format: "umd",
    sourceMap: true,
    plugins: [rollupNG2(), typescript({ typescript: require('typescript') }), node()]
};