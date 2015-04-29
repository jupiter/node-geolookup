var geolookup = require('..');
var should = require('should');

describe('citiesDistance', function(){
    it('should work for London vs York', function(){
      var cityA = geolookup.biggestCity('GB', 'ENG', 'Q5');
      var cityB = geolookup.biggestCity('GB', 'ENG');
      var result = geolookup.citiesDistance(cityA, cityB);
      should(result).ok;
      should(result).eql(279.8899206595876);
    });
});
