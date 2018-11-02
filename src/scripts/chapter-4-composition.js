import { compose, match, pipe } from 'ramda';
import { log, compose as compose2, composeMultiArgs } from './util';

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

composed2(text).log();

const composed3 = compose2(skipShortWords, unique, words);

composed3(text).log('composed2');

const f = (x, y) => x + y;

const g = x => 2 * x;

const composed4 = composeMultiArgs(g, f);

composed4(1, 2).log('composed2');