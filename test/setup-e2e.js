
var expect = require('chai').expect
  , angular = require('angularjs')
  // , settings = require('settings')
  // , angularSettings = require('angular-settings')
  , log = require('domlog')
  , copy = require('deep-copy')
  , boxes = require('boxes');

log.init();

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

function MakeGens(base, max) {
  if (max <= 0) return null;
  var person = copy(base);
  person.father = MakeGens(man, max-1);
  person.mother = MakeGens(woman, max-1);
  return person;
}

function RandGens(base, max) {
  if (max <= 0) return null;
  else if (max < 4 && Math.random() > 0.8) return null;
  var person = copy(base);
  person.todos = [];
  var num = parseInt(Math.random() * 3);
  for (var i=0; i<num; i++) {
    person.todos.push({});
  }

  person.father = RandGens(man, max-1);
  person.mother = RandGens(woman, max-1);
  person.status = ['working', 'clean', 'complete'][parseInt(Math.random()*3)];
  return person;
}

function SlowGens(base, max, scope) {
  if (max <= 0) return null;
  var person = copy(base);
  setTimeout(function () {
    person.father = SlowGens(man, max-1, scope);
    scope.$digest();
  }, Math.random() * 300 + 200);
  setTimeout(function () {
    person.mother = SlowGens(woman, max-1, scope);
  }, Math.random() * 300 + 200);
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
  $scope.slowBoxes = SlowGens(man, 5, $scope);
  $scope.otherBoxes = MakeGens(man, 5);
  $scope.clickBox = function (person, node) {
    log('got', person.display.name);
  };
  log('starting');
}

angular.module('test', ['boxes']);

