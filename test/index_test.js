'use strict';

/**
 * Module dependencies.
 */

var _ = require('lodash');
var schemes = require('../index');

/**
 * Test exported objects.
 */

describe('module', function() {
  it('should export `allByName` schemes', function() {
    schemes.should.have.property('allByName');
  });

  it('should export `historical` schemes', function() {
    schemes.should.have.property('historical');
  });

  it('should export `permanent` schemes', function() {
    schemes.should.have.property('permanent');
  });

  it('should export `provisional` schemes', function() {
    schemes.should.have.property('provisional');
  });

  it('should export `unofficial` schemes', function() {
    schemes.should.have.property('unofficial');
  });
});

/**
 * Test all schemes.
 */

describe('allByName', function() {
  it('should contain `historical` schemes', function() {
    schemes.allByName.should.have.properties(_.pluck(schemes.historical, 'scheme'));
  });

  it('should contain `permanent` schemes', function() {
    schemes.allByName.should.have.properties(_.pluck(schemes.permanent, 'scheme'));
  });

  it('should contain `provisional` schemes', function() {
    schemes.allByName.should.have.properties(_.pluck(schemes.provisional, 'scheme'));
  });

  it('should contain `unofficial` schemes', function() {
    schemes.allByName.should.have.properties(_.pluck(schemes.unofficial, 'scheme'));
  });
});
