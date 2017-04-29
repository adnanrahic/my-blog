(function () {
	"use strict"
	
	angular
		.module('app')
		.factory('homeFactory', homeFactory);

	homeFactory.$inject = ['$q', '$http','appFactory'];
	function homeFactory($q, $http, appFactory) {
		var factory = {
			getStories: getStories
		};
		return factory;

		///////////////

		function getStories() {
			return $http.get('/api/stories')
				.then(function (response) {
					console.debug("getStories returned: ", response.data);
					return response.data;
				})
				.catch(function (err) {
					console.error("getStories errored with: ", err);
				});
		}
	}
	
})();
