var mongoose = require('mongoose');

beforeAll(function(done) {
  mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost:27017/acebook',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  );

  mongoose.connect('mongodb://127.0.0.1/acebook_test', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  db.on('open', function() {
    done();
  });
});

afterAll(function(done) {
  mongoose.connection.close(true, function() {
    done();
  });
});
