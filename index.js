
var angular = require('angularjs')
  , query = require('query')
  , tip = require('tip')

  , template = require('./template');

angular.module('boxes', [])
  .directive('boxes', ['$compile',
    function ($compile) {
      return {
        scope: {},
        replace: true,
        restrict: 'A',
        link: function (scope, element, attrs) {
          var name = attrs.boxes;
          scope.boxes = null;
          scope.$parent.$watch(name, function(value) {
            if (!scope.boxes && value) {
              element.addClass('boxes');
              element.html(template);
              $compile(element.contents())(scope);
              var box = element[0].querySelector('.box');
              box.setAttribute('title', value.display.name);
              tip(box);
            }
            scope.boxes = value;
          });
          scope.$watch('boxes', function(value) {
            scope.$parent[name] = value;
          });
          // should take care of itself from here
        }
      };
    }]);
