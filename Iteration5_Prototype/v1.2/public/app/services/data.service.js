(function () {

    angular
        .module('App')
        .service('dataService', DataService);


    function DataService($http, authentication, $q) {

        var tags = [];
        var milestones = [];

        var getAllTags = function () {
            $http.get("/api/data/getAllHashtags").then(function (response) {
                tags = response.data;
            });
            return $q.when(tags);
        };

        var loadAllMilestones = function () {
            $http.get("/api/data/getAllMilestones").then(function (response) {
                milestones = response.data;
            });
            return $q.when(milestones);
        }
        return {
            getAllTags: getAllTags,
            loadAllMilestones: loadAllMilestones,
        };
    }

})();