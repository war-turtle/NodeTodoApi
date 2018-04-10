var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

// mongoose.connection.
var Todo = mongoose.model('Todo',{
  text: {
    type: String,
    required: true,
    minlenght: 1,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  }
});

var User = mongoose.model('User',{
  email: {
    type: String,
    required: true,
    trim: true,
    minlenght: 1
  }
});

var newUser = new User({
  email: 'kartik'
});

newUser.save().then((doc) => {
  console.log(doc);
}).catch((e) => {
  console.log(e);
});
