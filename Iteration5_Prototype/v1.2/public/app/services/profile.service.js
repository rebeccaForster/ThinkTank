(function () {

    angular
        .module('App')
        .service('profileService', ProfileService);

    var user = '';
    var users = [];

    function ProfileService($http, authentication, $q) {

        var loadAllUsers = function () {
            $http.get("/api/userData/getAllUsers").then(function (response) {
                users = response.data;
            });
            return $q.when(users);
        };

        var getUser = function (id) {
            var a = "/api/userData/getUser/";

            // todo: du solltest alle variablen die bei when stheen auch deklarieren sonst bekomme ich fehler
            $http.get(a.concat(id)).then(function (response) {
                user = response.data;
                console.log(user);
            });
                return $q.when(user);

        };

        return {
            loadAllUsers: loadAllUsers,
            getUser: getUser
        };
    }

})();