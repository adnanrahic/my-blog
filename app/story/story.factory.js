(function () {
	"use strict"
	
	angular
		.module('app')
		.factory('storyFactory', storyFactory);

	storyFactory.$inject = ['$q', '$http', '$sce', 'appFactory'];
	function storyFactory($q, $http, $sce, appFactory) {
		var factory = {
			getStory: getStory
		};
		return factory;

		///////////////

		function getStory(id) {
			return $http.get('/api/stories/' + id)
				.then(function (response) {
					console.debug("getStory returned: ", response.data);
					response.data.body = $sce.trustAsHtml(response.data.body);
					return response.data;
				})
				.catch(function (err) {
					console.error("getStory errored with: ", err);
				});
		}
	}
	
})();
