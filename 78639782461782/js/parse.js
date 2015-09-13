#!/bin/node

var fs = require('fs');

var originalSourceText = fs.readFileSync('./source.txt').toString().trim();

var parseSourceText = function (_source) {
    var _arr = _source.split('\n');
    var _arr_2 = [];
    for (var i = 0; i < _arr.length; i++) {
        _arr_2.push( _arr[i].replace(/(，|、|；)/g, '$1*').split('*') );
    };
    return JSON.stringify(_arr_2);
};

fs.writeFileSync('./source.json', parseSourceText(originalSourceText));
