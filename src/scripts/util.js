import { curry } from 'ramda';

const spreadArgs = fn => args => fn(...args);

const gatherArgs = fn => (...args) => fn(args);

const partialProps = (fn, presetArgs) => laterArgs => fn(Object.assign({}, presetArgs, laterArgs));

const curryProps = (fn, arity = 1) => {
    return (function nextCurried(prevArgs) {
        return (nextArg = {}) => {
            const [key] = Object.keys(nextArg);
            const allArgs = Object.assign({}, prevArgs, { [key]: nextArg[key] });

            if (Object.keys(allArgs).length >= arity) {
                return fn(allArgs);
            }
            else {
                return nextCurried(allArgs);
            }
        };
    })({});
};

const spreadArgProps = (
    fn,
    propOrder =
        fn.toString()
        .replace( /^(?:(?:function.*\(([^]*?)\))|(?:([^\(\)]+?)\s*=>)|(?:\(([^]*?)\)\s*=>))[^]+$/, "$1$2$3" )
        .split( /\s*,\s*/ )
        .map(v => v.replace( /[=\s].*$/, "" ) )
) => argsObj => fn(...propOrder.map(k => argsObj[k]));

// Object.prototype.log = function(tag) { 
//     if (tag) {  
//         console.log(tag, this);
//     }
//     else {
//        console.log(this);
//     } 
// };

const compose = (...fns) => result => [...fns].reverse().reduce((result, fn) => fn(result), result);

function composeMultiArgs(...fns) {
    return fns.reverse().reduce( function reducer(fn1,fn2){
        return function composed(...args){
            return fn2( fn1( ...args ) );
        };
    } );
}

const log = x => console.log(x);

export {
    spreadArgs,
    gatherArgs,
    curryProps,
    partialProps,
    spreadArgProps,
    log, 
    compose,
    composeMultiArgs
};