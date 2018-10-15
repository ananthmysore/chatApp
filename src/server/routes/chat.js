var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Chat = require('../models/Chat.js');
var ObjectId = require('mongodb').ObjectId; 
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
/* GET ALL CHATS */
router.get('/:id', function(req, res, next) {
  var id = req.params.id;
  var o_id = new ObjectId(id);
  Chat.find({'room':o_id},function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

/* GET SINGLE CHAT BY ID */
router.get('/:id', function(req, res, next) {
  Chat.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* SAVE CHAT */
router.post('/', function(req, res, next) {
  Chat.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

server.listen(4000);

// socket io
io.on('connection', function (socket) {
  console.log('User connected');
  socket.on('disconnect', function() {
    console.log('User disconnected');
  });
  socket.on('save-message', function (data) {
    console.log(data,'from socket io');
    io.emit('new-message', { message: data });
  });
});


module.exports = router;