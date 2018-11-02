const foo = (x = 3) => console.log(x);

foo();
foo(undefined);
foo(null);
foo(0);

console.log('--------------------------------------------');

const foo2 = (x, y, z, ...args) => undefined;

console.log(foo2.length);

console.log('--------------------------------------------');

const foo3 = (x, y, z, ...args) => console.log(x, y, z, args);

foo3();
foo3(1, 2, 3);
foo3(1, 2, 3, 4);
foo3(1, 2, 3, 4, 5);

console.log('--------------------------------------------');

const foo4 = (...args) => console.log(args);

const arr = [1, 2, 3, 4, 5];

foo4(11, 22, ...arr);

console.log('--------------------------------------------');

const foo5 = ([x, y, ...args]) => console.log(x, y, args);

foo5([1, 2, 3, 4, 5]);

console.log('--------------------------------------------');

const foo6 = ({ x, y }) => console.log(x, y);

foo6({ y: 6 });

console.log('--------------------------------------------');

const arr2 = [1, 2, 3];

for (const i of arr2) {
    console.log(i);
}

console.log('--------------------------------------------');

const people = [{
}];

// people.map(function getPreferredName(person){
//     return person.nicknames[0] || person.firstName;
// });

// people.map(person => person.nicknames[0] || person.firstName);

console.log('--------------------------------------------');

const foo7 = ({ person, x: y }) => console.log(person.age, y);

foo7({ person: { age: 111 }, x: 222 });

const foo8 = x => ({ xx: x });

console.log(foo8(333));

