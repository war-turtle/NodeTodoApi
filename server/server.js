const _ = require('lodash');
var express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todos');
var {User} = require('./models/user');

var app = express();

app.use(bodyParser.json());

app.post('/todos',(req, res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }).catch((e) => {
    res.status(400).send(e);
  })
});

app.get('/todos',(req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }).catch((e) => {
    res.status(400).send(e);
  });
});

app.get('/todos/:id',(req, res) => {
  var id = req.params.id;

  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }

  Todo.findById(id).then((doc) => {

    if(!doc){
      return res.status(404).send();
    }
    res.send({doc});

  }).catch((e) => {
    res.status(400).send();
  });
});

app.delete('/todos/:id',(req, res) => {
  var id = req.params.id;
  if(!ObjectID.isValid(id)){
    return res.status(404).send({
      "error":"invalid id"
    });
  }

  Todo.findByIdAndRemove(id).then((doc) => {
    if(!doc){
      return res.status(404).send();
    }
    res.send(doc);
  }).catch((e) => {
    res.status(400).send();
  });

});

app.patch('/todos/:id',(req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body,['text','completed']);

  if(!ObjectID.isValid(id)){
    return res.status(404).send({
      error: 'id not valid'
    });
  }

  if(_.isBoolean(body.completed) && body.completed){
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id,{$set: body},{new: true}).then((doc) => {
    if(!doc){
      return res.status(404).send({
        error: 'data not found'
      });
    }

    res.send({doc});

  }).catch((e) => {
    res.status(404).send({
      error: 'error'
    });
  })
});

app.post('/users',(req, res) => {
  var body = _.pick(req.body,['email','password']);

  var user = new User(body);

  user.save().then(() => {
    return user.generateAuthToken();
  }).then((token) => {
    res.header({'x-auth': token})
    res.send(user);
  }).catch((e) => {
    res.status(404).send(e);
  })
})

app.listen(3000, () => {
  console.log('Started on port 3000');
});
