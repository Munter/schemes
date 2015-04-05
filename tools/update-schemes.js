var fs = require('fs');
var Path = require('path');
var get = require('simple-get');
var cheerio = require('cheerio');


var sections = {
  'permanent': '#uri-schemes-1',
  'provisional': '#uri-schemes-2',
  'historical': '#uri-schemes-3'
};

get.concat('http://www.iana.org/assignments/uri-schemes/uri-schemes.xml', function (err, data) {
  'use strict';

  if (err) {
    throw err;
  }

  var $ = cheerio.load(data.toString());

  Object.keys(sections).forEach(function (key) {
    var data = Array.prototype.map.call($(sections[key] + ' record'), function (el) {
      var result = {
        scheme: $(el).find('value').text(),
        description: $(el).find('description').text(),
        reference: Array.prototype.map.call($(el).find('xref:not([type="person"])'), function (el) {
          var type = $(el).attr('type');
          var href;

          switch (type) {
          case 'rfc':
          case 'draft':
            href = 'http://www.iana.org/go/' + $(el).attr('data');
            break;
          case 'registry':
            href = 'http://www.iana.org/assignments/' + $(el).attr('data');
            break;
          default:
          }

          return {
            type: type,
            href: href
          };
        })
      };

      if ($(el).find('file[type="template"]').length === 1) {
        result.template = 'http://www.iana.org/assignments/uri-schemes/' + $(el).find('file[type="template"]').text();
      }

      return result;
    });

    var fileName = Path.join('lib', 'iana-' + key) + '.json';
    fs.writeFile(fileName, JSON.stringify(data, undefined, 2), function (err) {
      if (err) {
        throw err;
      }

      console.log('Wrote ' + fileName + ': ' + data.length + ' entries');
    });
    // console.log(JSON.stringify(data, undefined, 2));
  });
});
