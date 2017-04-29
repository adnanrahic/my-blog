(function () {
	"use strict"
	
	angular
		.module('app')
		.factory('dashFactory', dashFactory);

	dashFactory.$inject = ['$q'];
	function dashFactory($q) {
		var factory = {
			getStory: getStory
		};
		return factory;

		///////////////

		function getStory(id) {
			
		}
	}
	
})();
