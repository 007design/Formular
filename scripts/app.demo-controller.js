// Field Type Constants
var FIELD_TYPES = [{id:1,name:'Text Field'},
                   {id:2,name:'Drop Down'},
                   {id:3,name:'Checkbox Group'},
                   {id:4,name:'Radio Buttons'},
                   {id:5,name:'Text Area'},
                   {id:6,name:'Upload'},
                   {id:7,name:'Date Picker'}];

var TRIGGER_TYPES = [{id:1,name:'value'},
                     {id:2,name:'valueset'},
                     {id:3,name:'url valueset'}];

var COMPARISON_TYPES = [{id:1,name:'Equal To'},
                        {id:2,name:'Not Equal To'},
                        {id:3,name:'Greater Than'},
                        {id:4,name:'Less Than'}];


var app = angular.module('app', ['module.services', 'module.directives']);

function testController($scope, ViewSvc) {
	$scope.pretty = function(p){
		try {
			return js_beautify(angular.toJson(p));
		} catch (x) {}
	};
}