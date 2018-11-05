import { compose, match, pipe, partial, partialRight, prop, curry } from 'ramda';
import { log, compose as compose2, composeMultiArgs } from './util';
import $ from 'jquery';

const words = str => String(str)
    .toLowerCase()
    .split(/\s/)
    .filter(v => /^[\w]+$/.test(v));

console.log(words('alma a fa alatt# korte'));

console.log(match(/^[\w]+$/, 'alma#'));

function unique(list) {
    var uniqList = [];

    for (let v of list) {
        // value not yet in the new list?
        if (uniqList.indexOf( v ) === -1 ) {
            uniqList.push( v );
        }
    }

    return uniqList;
}

function skipShortWords(words) {
    var filteredWords = [];

    for (let word of words) {
        if (word.length > 4) {
            filteredWords.push( word );
        }
    }

    return filteredWords;
}

const text = 'To compose two functions together, pass the \
output of the first function call as the input of the \
second function call.';

const uniqueWords = unique(words(text));

console.log(uniqueWords);

const composed = compose(unique, words);

console.log(composed(text));

const piped = pipe(words, unique);

console.log(piped(text));

const composed2 = compose(skipShortWords, unique, words);

console.log(composed2(text));

const composed3 = compose2(skipShortWords, unique, words);

console.log('composed3', composed3(text));

const f = (x, y) => x + y;

const g = x => 2 * x;

const composed4 = composeMultiArgs(g, f);

console.log('composed2', composed4(1, 2));

console.log('--------------------------------------------');

// $.getJSON('http://localhost:3000/users', { id: 1 }, function(result) {
//     console.log(result);
// });

// $.getJSON('http://localhost:3000/orders', { id: -1 }, function(result) {
//     console.log(result); 
// });

const getPerson = partial($.getJSON, ['http://localhost:3000/users']);
const getLastOrder = partial($.getJSON, ['http://localhost:3000/orders', { id: -1 }]);

const makeObjProp = (name, value) => {
    const o = {};

    o[name] = value;

    return o;
};

const printPersonName = compose(log, prop('name'));
const processPerson = partialRight(getPerson, [printPersonName]);
const lookupPerson = compose(processPerson, curry(makeObjProp)('id'), prop('personId'));

getLastOrder(lookupPerson);

console.log('--------------------------------------------');
