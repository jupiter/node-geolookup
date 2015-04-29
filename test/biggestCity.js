var geolookup = require('..');
var should = require('should');

describe('biggestCity', function(){
    it('should work for England', function(){
      var country = 'GB';
      var adminCode = 'ENG';

      var result = geolookup.biggestCity(country, adminCode);

      should(result).ok;
      should(result.name).eql('City of London');
    });

    it('should work close to Huelva', function() {
      var country = 'ES';
      var adminCode = '51';
      var admin2Code = 'H';

      var result = geolookup.biggestCity(country, adminCode, admin2Code);

      should(result).ok;
      should(result.name).eql('Huelva');
      should(result.admin2Name).eql('Provincia de Huelva');
    });
});
