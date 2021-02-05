Handlebars = require('handlebars');

Handlebars.registerHelper('times', function(n, block) {
    var accum = '';
    for(var i = 0; i < n; ++i) {
        accum += block.fn(i);
      }
    return accum;
});

// Handlebars.registerHelper('create_uid', function() {
//     function s4() {
//       return Math.floor((1 + Math.random()) * 0x10000)
//         .toString(16)
//         .substring(1);
//     }
//     let uid;
//     return uid = s4() + s4() + '-' + s4() + '-' + s4() + '-' +
//       s4() + '-' + s4() + s4() + s4();
//   })

module.exports = Handlebars;