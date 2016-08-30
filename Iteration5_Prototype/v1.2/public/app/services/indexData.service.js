(function () {

    angular
        .module('App')
        .service('indexData', IndexData);


    function IndexData($http, authentication, $q) {

        

        var getAllTags = function () {
            return $http.get("/api/indexData/tags").then(function (response) {
               return response.data;
            });
        };

        var loadAllUsers = function () {
            return $http.get("/api/indexData/users").then(function (response) {
                return response.data;
            });
        }

        var loadAllMilestones = function () {
            return $http.get("/api/indexData/milestones").then(function (response) {
                return response.data;
            });
        }
        return {
            getAllTags: getAllTags,
            loadAllUsers: loadAllUsers,
            loadAllMilestones: loadAllMilestones,
        };
    }

})();