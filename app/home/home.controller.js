(function () {
	"use strict"
	
	angular
		.module('app')
		.controller('homeController', homeController);

	homeController.$inject = ['homeFactory'];
	function homeController(homeFactory) {
		var vm = this;
		vm.stories = [];

		activate();

		function activate() {
			getStories();
		}

		///////////////////

		function getStories() {
			return homeFactory.getStories()
				.then(function (stories) {
					vm.stories = stories;
					return vm.stories;
				});
		}

		
	}
	
})();
