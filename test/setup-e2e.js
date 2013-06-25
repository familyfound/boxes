
var expect = require('chai').expect
  , angular = require('angularjs')
  // , settings = require('settings')
  // , angularSettings = require('angular-settings')
  , copy = require('deep-copy')
  , boxes = require('boxes');

// angularSettings.factory('settings', settings.getSettings());

var man = {
  display: {
    name: "Jared Forsyth",
    gender: "Male",
    lifespan: "1599-1634",
    birthDate: "12 July 1599",
    birthPlace: "Mayfield, Iowa"
  },
  todos: [],
  father: null,
  mother: null
};

var woman = {
  display: {
    name: "Eliza Jane Harris",
    gender: "Female",
    lifespan: "1599-1650",
    birthDate: "12 May 1599",
    birthPlace: "Mayfield, Iowa"
  },
  todos: [],
  father: null,
  mother: null
};

function RandGens(base, max) {
  if (max <= 0) return null;
  else if (max < 4 && Math.random() > 0.8) return null;
  var person = copy(base);
  person.father = RandGens(man, max-1);
  person.mother = RandGens(woman, max-1);
  return person;
}

var one = {
  display: {
    name: "Jared Forsyth",
    gender: "Male",
    lifespan: "1599-1634",
    birthDate: "12 July 1599",
    birthPlace: "Mayfield, Iowa"
  },
  todos: [],
  father: {
    display: {
      name: "George James Forsyth",
      gender: "Male",
      lifespan: "1560-1612",
      birthDate: "Unknown",
      birthPlace: "Unknown"
    },
    todos: ["hello"],
    father: null,
    mother: null
  },
  mother: {
    display: {
      name: "Eliza Jane Forsyth",
      gender: "Female",
      lifespan: "1560-1612",
      birthDate: "Unknown",
      birthPlace: "Unknown"
    },
    todos: [],
    father: null,
    mother: null
  }
};

function Tester($scope) {
  $scope.boxes = RandGens(man, 5);
}

angular.module('test', ['boxes']);
