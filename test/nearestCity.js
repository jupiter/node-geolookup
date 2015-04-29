var geolookup = require('..');
var should = require('should');

describe('nearestCity', function(){
  describe('normally', function() {
    it('returns two admin levels', function(done) {
      var result = geolookup.nearestCity(37.20994, -7.40266);

      should(result).ok;
      should(result.adminCode).equal('51');
      should(result.admin2Code).equal('H');
      done();
    });
  });

  describe('when nearest a city across the dateline', function(){
    it('should work eastwards', function(){
      var result = geolookup.nearestCity(34.545, 179.599);
      should(result).ok;
      should(result.longitude).below(0);
    });
    it('should work westwards', function(){
      var result = geolookup.nearestCity(8.3, -179);
      should(result).ok;
      should(result.longitude).above(0);
    });
  });

  describe('when nearest a city across the pole', function(){
    it('should work on south pole', function(){
      var result = geolookup.nearestCity(-89, 170);
      should(result).ok;
      should(result.longitude).below(0);
    });

    it('should work on north pole', function(){
      var result = geolookup.nearestCity(89, -20);
      should(result).ok;
      should(result.longitude).above(0);
    });
  });
});


