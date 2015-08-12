'use strict';

var _ = require('lodash');
var data = {
  permanent: require('./lib/iana-permanent.json'),
  provisional: require('./lib/iana-provisional.json'),
  historical: require('./lib/iana-historical.json'),
  unofficial: require('./lib/unofficial.json')
};

data.allByName = _.transform(data, function(result, scheme, type) {
  scheme.forEach(function(value) {
    result[value.scheme] = _.defaults({ type: type }, value);
  });
});

module.exports = data;
