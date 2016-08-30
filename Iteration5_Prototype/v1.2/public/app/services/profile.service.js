(function () {

    angular
        .module('App')
        .service('profileService', ProfileService);

  

    function ProfileService($http, authentication, $q) {

        var loadAllUsers = function () {
            return $http.get("/api/userData/getAllUsers").then(function (response) {
                return response.data;
            });
            return $q.when(users);
        };

        var getUser = function (id) {
            var a = "/api/userData/getUser/";

            // todo: du solltest alle variablen die bei when stheen auch deklarieren sonst bekomme ich fehler
            return $http.get(a.concat(id)).then(function (response) {
                console.log(response.data);
                return response.data;
            });

        };

        return {
            loadAllUsers: loadAllUsers,
            getUser: getUser
        };
    }

})();