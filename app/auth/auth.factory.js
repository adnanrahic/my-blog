(function () {
	"use strict"
	
	angular
		.module('app')
		.factory('authFactory', authFactory);

	authFactory.$inject = ['$http', '$httpParamSerializer', '$rootScope'];
	function authFactory($http, $httpParamSerializer, $rootScope) {
		var factory = {
			auth: auth
		};
		return factory;

		///////////////

		function auth(user) {
			return $http.post('/api/auth', 
					$httpParamSerializer(user), {
					headers: { "Content-Type": "application/x-www-form-urlencoded" }
				})
				.then(function (response) {
					console.debug("auth returned: ", response.data);
          $rootScope.me = response.data;
					return response.data;
				})
				.catch(function (err) {
					console.error("auth errored with: ", err.data);
          $rootScope.me = err.data;          
				});
		}

	}
	
})();
