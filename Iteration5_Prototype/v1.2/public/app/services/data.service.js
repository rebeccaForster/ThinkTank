(function () {

    angular
        .module('App')
        .service('dataService', DataService);


    function DataService($http, authentication) {


        var getAllTags = function () {
            return $http.get("/api/data/getAllHashtags").then(function (response) {
                return response.data;
            });
        };

        var loadAllMilestones = function () {
            return $http.get("/api/data/getAllMilestones").then(function (response) {
                return response.data;
            });
        }
        return {
            getAllTags: getAllTags,
            loadAllMilestones: loadAllMilestones,
        };
    }

})();