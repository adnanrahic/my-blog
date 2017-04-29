(function () {
	"use strict"
	
	angular
		.module('app')
		.controller('dashController', ctrl);

	ctrl.$inject = ['$http', '$httpParamSerializer', '$rootScope', 'authFactory'];
	function ctrl($http, $httpParamSerializer, $rootScope, authFactory) {
		var vm = this;
		vm.stories = [];
		vm.story = {};
		vm.editable = false;
		vm.setEditable = setEditable;
		vm.addStory = addStory;
		vm.deleteStory = deleteStory;
		vm.editStory = editStory;

		activate();

		function activate() {
			auth({ email: 'example@email.com', password: 'password'});
			getStories();
		}

		///////////////////

		function auth(user) {
			return authFactory.auth(user)
				.then(function (me) {
					return me;
				});
		}

		function getStories() {
			return $http.get('/api/stories')
				.then(function (response) {
					console.debug("getStories returned: ", response.data);
					vm.stories = response.data;
					return vm.stories;
				})
				.catch(function (err) {
					console.error("getStories errored with: ", err);
				});
		}
		function addStory() {
			return $http.post('/api/stories', 
					$httpParamSerializer(vm.story), {
					headers: { 
						"Content-Type": "application/x-www-form-urlencoded",
						"x-access-token": String($rootScope.me.token)						 
					}
				})
				.then(function (response) {
					console.debug("addStory returned: ", response.data);
					var addedStory = response.data;

					vm.stories.push(addedStory);
					vm.story = {};
					return addedStory;
				})
				.catch(function (err) {
					console.error("addStory errored with: ", err);
				});
		}
		function deleteStory(id) {
			return $http.delete('/api/stories/' + id, {
					headers: { "x-access-token": String($rootScope.me.token) }
				})
				.then(function (response) {
					console.debug("deleteStory returned: ", response.data);
					var deletedStory = response.data;
					vm.stories = vm.stories.filter(function (story) {
						return story._id !== deletedStory._id;
					});
					return deletedStory;
				})
				.catch(function (err) {
					console.error("deleteStory errored with: ", err);
				});
		}
		function setEditable(index) {
			vm.editable = index;
			console.debug(vm.editable);
		}
		function editStory(story) {
			return $http.put('/api/stories/' + story._id,
					$httpParamSerializer({ 
						title: story.title,
            urlCode: story.urlCode,
            subtitle: story.subtitle,
            body: story.body,
            img: story.img,
            createdAt: story.createdAt
					}), {
					headers: { 
						"Content-Type": "application/x-www-form-urlencoded",
						"x-access-token": String($rootScope.me.token)
					}
				})
				.then(function (response) {
					console.debug("editStory returned: ", response.data);
					var editedStory = response.data;
					vm.stories.forEach(function (story) {
						if (story._id === editedStory._id) 
							story = editedStory;
					});
					vm.editable = false;
					return editedStory;
				})
				.catch(function (err) {
					console.error("editStory errored with: ", err);
				});
		}

		
	}
	
})();
