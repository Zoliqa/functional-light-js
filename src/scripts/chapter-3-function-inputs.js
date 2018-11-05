import { curry, partialRight, uncurryN, unary, identity, partial } from 'ramda';
import { spreadArgs, gatherArgs, curryProps, partialProps, spreadArgProps } from './util';

const parsed = ['1', '2', '3'].map(unary(parseInt));

console.log(parsed);

console.log('--------------------------------------------');

var words = ' alma a fa alatt '.split(/\s|\b/).filter(identity);

' alma a fa alatt '.split(/\s|\b/).log();
console.log(words);

console.log('--------------------------------------------');

function foo2(x, y) {
    console.log(x + y );
}

function bar2(fn) {
    fn([3, 9]);
}

bar2(spreadArgs(foo2));

console.log('--------------------------------------------');

function combineFirstTwo([v1, v2]) {
    return v1 + v2;
}

const sum = [1,2,3,4,5].reduce(gatherArgs(combineFirstTwo));

console.log(sum);

console.log('--------------------------------------------');

const foo = (x, y, z, t) => console.log(x, y, z, t);

const fooP = partial(foo, [1, 2]);

fooP(3, 4);

const fooPR = partialRight(foo, [1, 2]);

fooPR(3, 4);

console.log('--------------------------------------------');

const curried = curry(foo);

curried(1)(2)(3)(4);

curried(1, 2)(3)(4);
curried(1, 2, 3)(4);
curried(1, 2, 3, 4);

const uncurried = uncurryN(4, curried);

uncurried(11, 22, 33, 44);

console.log('--------------------------------------------');

const f = ({ x, y, z }) => console.log(x, y, z);

const curriedProps = curryProps(f, 3);

curriedProps({ y: 222 })({ z: 333 })({ x: 111 });

const partialProps2 = partialProps(f, { z: 3333, x: 4444 });

partialProps2({ y: 2222 });

const o = {a:1, b:2};

const [aa, bb] = Object.keys(o);

console.log('keys', aa, bb);

console.log('--------------------------------------------');

const g = (x, y, z) => console.log(x, y, z);

const curriedProps2 = curryProps(spreadArgProps(g), 3);

curriedProps2({ y: 22222 })({ z: 33333 })({ x: 11111 });

console.log('--------------------------------------------');

const output = txt => console.log(txt);

const printIf = (predicate, msg) => predicate(msg) && output(msg);

const isShortEnough = str => str.length <= 6;

const not = predicate => (...args) => !predicate(...args);

const isLongEnough = not(isShortEnough);

const when = (predicate, fn) => (...args) => predicate(...args) && fn(...args);

printIf(isShortEnough, 'short1');
printIf(isShortEnough, 'too long1');

printIf(isLongEnough, 'short2');
printIf(isLongEnough, 'too long2');

when(isShortEnough, output)('short3');

const pright = partialRight(when, [output]);

pright(isShortEnough)('xx');

const prightUncurried = uncurryN(2, partialRight(when, [output]));

prightUncurried(isShortEnough, 'yy');

console.log('--------------------------------------------');

var printIfU = uncurryN(2, partialRight(when, [output]));

var msg1 = "Hello";
var msg2 = msg1 + " World...";

printIfU(isShortEnough, msg1);         
printIfU(isShortEnough, msg2);

printIfU(isLongEnough, msg1);
printIfU(isLongEnough, msg2); 

console.log('--------------------------------------------');

const outputArray = (...args) => console.log(args);

const isLargeSum = (x, y) => x + y > 1000;

when(isLargeSum, outputArray)(1, 1000);
when(isLargeSum, outputArray)(1, 100);

console.log('--------------------------------------------');

