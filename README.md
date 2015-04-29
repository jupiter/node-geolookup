# geolookup

A module for looking up nearby places using the Geonames.org database

```
  var geolookup = require('geolookup')

  var nearest = geolookup.nearestCity(37.195386, -7.391712)

  console.log(nearest)
```

Outputs:

```
{ name: 'Ayamonte',
  country: 'ES',
  adminCode: '51',
  adminName: 'Andalusia',
  latitude: 37.20994,
  longitude: -7.40266,
  population: 20334 }
```

```
  var biggest = geolookup.biggestCity('ES', 51)

  console.log(biggest)
```

Outputs:

```
{ name: 'Sevilla',
  country: 'ES',
  adminCode: '51',
  adminName: 'Andalusia',
  latitude: 37.38283,
  longitude: -5.97317,
  population: 703206 }
```
