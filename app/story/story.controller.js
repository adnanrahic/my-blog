(function () {
	"use strict"
	
	angular
		.module('app')
		.controller('storyController', storyController);

	storyController.$inject = ['$routeParams', 'storyFactory'];
	function storyController($routeParams, storyFactory) {
		var vm = this;
		vm.id = $routeParams.id;
		vm.story = {};

		activate();

		function activate() {
			getStory(vm.id);
		}

		///////////////////

		function getStory(id) {
			return storyFactory.getStory(id)
				.then(function (story) {
					vm.story = story;
					return vm.story;
				});
		}
		
	}
	
})();
