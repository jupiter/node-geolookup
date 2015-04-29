'use strict';
/**
 * Module dependencies
 */
var kdt = require('kdt');
var fs = require('fs');
var path = require('path');

/**
 * Settings
 */
exports.citiesPath = path.join(__dirname, './data/cities15000.txt');
exports.admin1Path = path.join(__dirname, './data/admin1CodesASCII.txt');

/**
 * Look up the nearest city
 */
exports.nearestCity = function(latitude, longitude, calculateDistance){
  var xyz = _xyz(latitude, longitude);
  var result = citiesTree().nearest(xyz, 1);

  if (result.length) {
    if (calculateDistance) result[0][0].data.distance = _distance(xyz, result[0][0]);
    return result[0][0].data;
  }
};

/**
 * Look up biggest (by population) city for country/area
 */
exports.biggestCity = function(country, areaCode) {
  citiesTree(); // Ensure database is populated

  return exports.biggestCitiesByKey[country + '.' + areaCode];
};

/**
 * Load geographical tree with cities
 */
function citiesTree() {
  if (exports.citiesTree) return exports.citiesTree;

  var cities = fs.readFileSync(exports.citiesPath).toString().split('\n');

  var points = cities.map(function(line, i){
    var columns = line.split('\t');

    var latitude = parseFloat(columns[4]);
    var longitude = parseFloat(columns[5]);

    var xyz = _xyz(latitude, longitude);

    var adminKey = columns[8] + '.' + columns[10];

    var cityData = {
      name: columns[2],
      country: columns[8],
      adminCode: columns[10],
      adminName: adminNames()[adminKey], // Local administration
      latitude: latitude,
      longitude: longitude,
      population: parseInt(columns[14])
    };

    updateBiggestCity(adminKey, cityData);

    return {
      x: xyz.x,
      y: xyz.y,
      z: xyz.z,
      data: cityData
    };
  });

  exports.citiesTree = kdt.createKdTree(points, _distance, ['x', 'y', 'z']);
  return exports.citiesTree;
}

var biggestCities = exports.biggestCitiesByKey = {};
function updateBiggestCity(adminKey, cityData) {
  if (!biggestCities[adminKey] || biggestCities[adminKey].population < cityData.population) {
    biggestCities[adminKey] = cityData;
  }
}

/**
 * Load administrative areas
 */
function adminNames() {
  if (exports.adminNames) return exports.adminNames;

  var adminNames = exports.adminNames = {};

  var adminCodes = fs.readFileSync(exports.admin1Path).toString().split('\n');

  adminCodes.forEach(function(line){
    var columns = line.split('\t');

    adminNames[columns[0]] = columns[1];
  });

  return exports.adminNames;
}

/**
 * Calculate cartesian coordinates (rough estimate)
 */
var R = 6371; // Approximate radius of earth
function _xyz(latitude, longitude) {
  var latitudeRad = latitude * Math.PI / 180;
  var longitudeRad = longitude * Math.PI / 180;
  return {
    x: R * Math.cos(latitudeRad) * Math.cos(longitudeRad),
    y: R * Math.cos(latitudeRad) * Math.sin(longitudeRad),
    z: R * Math.sin(latitudeRad)
  };
}

function _distance(a, b) {
  return Math.sqrt((Math.pow((b.x-a.x),2)) + (Math.pow((b.y-a.y),2)) + (Math.pow((b.z-a.z),2)));
}
