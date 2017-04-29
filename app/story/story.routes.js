(function () {
	"use strict"
	
	angular
		.module('app')
		.config(storyRoutes);

	storyRoutes.$inject = ['$routeProvider'];
	function storyRoutes($routeProvider) {
		$routeProvider.when("/story/:urlCode/:id", {
	        controller: "storyController",
	        controllerAs: "vm",
	        templateUrl: "story/story.html",
	        preload: true
	    });
	}
	
})();
