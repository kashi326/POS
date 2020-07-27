import { createRxDatabase, addRxPlugin } from 'rxdb';


import {removeRxDatabase} from 'rxdb';
addRxPlugin(require('pouchdb-adapter-idb'));
const collections = [
    {
        name: 'heroes',
        schema: require('./Schema.js').default.heroSchema,
        methods: {
            hpPercent() {
                return this.hp / this.maxHP * 100;
            }
        },
        sync: true
    },
    
    {
      name: 'customers',
      schema: require('./Schema.js').default.customerSchema
    },
    {
        name:'inventory',
        schema: require('./InventorySchema').default.inventorySchema
    },
    {
        name:'sales',
        schema: require('./SalesSchema').default.SalesSchema
    },
    {
        name:'salesreceipt',
        schema: require('./SalesSchema').default.ReceiptSchema
    },
    {
        name:'purchase',
        schema: require('./purchaseSchema').default.purchaseSchema
    },
    {
        name:'purchasereceipt',
        schema: require('./purchaseSchema').default.purchaseReceiptSchema
    }
];

const syncURL = 'http://' + window.location.hostname + ':10102/';
console.log('host: ' + syncURL);

let dbPromise = null;

const _create = async () => {
    console.log('DatabaseService: creating database..');
    const db = await createRxDatabase({name: 'heroesreactdb', adapter: 'idb', password: 'myLongAndStupidPassword'});
    console.log('DatabaseService: created database');
    window['db'] = db; // write to window for debugging

    // show leadership in title
    db.waitForLeadership().then(() => {
        console.log('isLeader now');
        document.title = '♛ ' + document.title;
    });

    // create collections
    console.log('DatabaseService: create collections');
    await Promise.all(collections.map(colData => db.collection(colData)));

    // hooks
    console.log('DatabaseService: add hooks');
    // db.collections.heroes.preInsert(docObj => {
    //     const { color } = docObj;
    //     return db.collections.heroes.findOne({color}).exec().then(has => {
    //         if (has != null) {
    //             alert('another hero already has the color ' + color);
    //             throw new Error('color already there');
    //         }
    //         return db;
    //     });
    // });

    // sync
    // console.log('DatabaseService: sync');
    // collections.filter(col => col.sync).map(col => col.name).map(colName => db[colName].sync({
    //     remote: syncURL + colName + '/'
    // }));

    return db;
};

export const get = () => {
    if (!dbPromise)
        dbPromise = _create();
    return dbPromise;
}
export const remove = ()=>{
    removeRxDatabase('heroesreactdb','idb');
}