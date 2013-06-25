
var angular = require('angularjs')
  , query = require('query')
  , tip = require('tip')

  , template = require('./template');

var t = new tip('Name');

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
          scope.undoneTodos = function () {
            var undone = 0;
            for (var i=0; i<scope.boxes.todos.length; i++) {
              if (!scope.boxes.todos[i].completed) {
                undone += 1;
              }
            }
            return undone;
          };
          scope.$parent.$watch(name, function(value) {
            if (!scope.boxes && value) {
              element.addClass('boxes');
              element.html(template);
              $compile(element.contents())(scope);
              var box = element[0].querySelector('.box');
              box.parentNode.addEventListener('mouseover', function () {
                t.message(value.display.name);
                t.show(box);
                t.el.addClass('tip-nomouse');
              });
              box.parentNode.addEventListener('mouseout', function () {
                t.hide();
              });
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
