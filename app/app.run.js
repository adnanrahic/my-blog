(function () {
    "use strict"
    
    angular
        .module('app')
        .run(run);

    run.$inject = ['$route', '$templateCache', '$http', '$rootScope'];
    function run($route, $templateCache, $http, $rootScope) {
        
        var url;
        for (var i in $route.routes) {
            if ($route.routes[i].preload) {
                if (url = $route.routes[i].templateUrl) {
                    $http.get(url, { cache: $templateCache });
                }
            }
        }


        $rootScope.view = false;
        $rootScope.$on('$viewContentLoaded', function() {
            $rootScope.view = true;
        });

    }

})();
