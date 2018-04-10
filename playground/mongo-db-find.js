const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';

const dbName = 'Todo';

MongoClient.connect(url, (err, client) => {
  if(err){
    return console.log(err);
  }

  console.log('connected');

  const db = client.db(dbName);


  const collection = db.collection('Todos');

  collection.find({}).toArray((err, docs) => {
    console.log('todos');
    console.log(docs);
  })


  client.close();
})
