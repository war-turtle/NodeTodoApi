const {MongoClient} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017',(err, client) => {
  if(err){
    return console.log(err);
  }
  console.log('connected');

  const db = client.db('Todo');

  const collection = db.collection('Todos');

  collection.deleteOne({
    text: 'Lunch'
  }).then((err, result) => {
    if(err){
      return console.log("a",err);
    }
    console.log(result);
  });

  client.close();

});
