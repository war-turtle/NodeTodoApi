const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';

const dbName = 'Todo';

MongoClient.connect(url, (err, client) => {
  if(err){
    return console.log(err);
  }
  console.log('connected');

  const db = client.db(dbName);

  // const collection = db.collection('Todos');
  //
  // collection.insertOne({
  //   text: 'learn Python',
  //   completed: false
  // }, (err, result) => {
  //   if(err){
  //     return console.log(err);
  //   }
  //   console.log(result.ops);
  // });

  const collection = db.collection('User');

  collection.insertOne({
    name: 'War-Turtle',
    app: 18,
    location: 'India'

  }, (err, result) => {
    if(err){
      return console.log(err);
    }
    console.log(result.ops);
  });

  client.close();
})
