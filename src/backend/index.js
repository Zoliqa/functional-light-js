const server = require('server');
const { get, post } = server.router;
const { render, json, header } = server.reply;

const persons = [{
    personId: 1,
    name: 'Name1'
}, {
    personId: 2,
    name: 'Name2'    
}];

const lastOrder = {
    orderId: 1,
    personId: 1,
    quantity: 123
};

const cors = [
    ctx => header("Access-Control-Allow-Origin", "*"),
    ctx => header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"),
    ctx => ctx.method.toLowerCase() === 'options' ? 200 : false
  ];

server(cors, [
    get('/', ctx => 'Hello world'),
    get('/users', ctx => json(persons.find(p => p.personId == ctx.query.id))),
    get('/orders', ctx => json(ctx.query.id == -1 && lastOrder || null)),
    get(ctx => status(404))
]);