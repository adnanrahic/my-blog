(function () {
	"use strict"
	
	angular
		.module('app')
		.config(dashRoutes);

	dashRoutes.$inject = ['$routeProvider'];
	function dashRoutes($routeProvider) {
		$routeProvider.when("/dash", {
	        controller: "dashController",
	        controllerAs: "vm",
	        templateUrl: "dash/dash.html",
	        preload: true
	    });
	}
	
})();
