(function () {
	"use strict"
	
	angular
		.module('app')
		.controller('contactController', contactController);

	//contactController.$inject = [];
	function contactController() {
		var vm = this;

		vm.home = "Yep.";
	}
	
})();
