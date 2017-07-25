'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var port = 8080;

app.use(_express2.default.static(_path2.default.resolve(__dirname, '..', 'build')));

app.get('/list', function (req, res) {
    res.send('haha');
});

app.get('/', function (req, res) {
    res.sendFile(_path2.default.resolve(__dirname, '..', 'build', 'index.html'));
});

app.listen(port, function () {
    console.log('server start at http://localhost:' + port);
});