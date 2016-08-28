(function () {

    angular
        .module('App')
        .service('indexData', IndexData);


    function IndexData($http, authentication, $q) {

        var tags = [];
        var users = [];
        var milestones = [];

        var getAllTags = function () {
            $http.get("/api/indexData/tags").then(function (response) {
                tags = response.data;
            });
            return $q.when(tags);
        };

        var loadAllUsers = function () {
            $http.get("/api/indexData/users").then(function (response) {
                users = response.data;
            });
            return $q.when(users);
        }

        var loadAllMilestones = function () {
            $http.get("/api/indexData/milestones").then(function (response) {
                milestones = response.data;
            });
            return $q.when(milestones);
        }
        return {
            getAllTags: getAllTags,
            loadAllUsers: loadAllUsers,
            loadAllMilestones: loadAllMilestones,
        };
    }

})();