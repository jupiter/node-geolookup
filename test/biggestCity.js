var geolookup = require('..');
var should = require('should');

describe('biggestCity', function(){
    it('should work on south pole', function(){
      var country = 'GB';
      var adminCode = 'ENG';

      var result = geolookup.biggestCity(country, adminCode);

      should(result).ok;
      should(result.name).eql('City of London');
    });
});


