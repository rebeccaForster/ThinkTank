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

        var followUser = function (followedPersonId, user) {
            var data = {
                    followedPersonId: followedPersonId,
                    user: user
                }
                //if (!followedPersonId) return "idea not valid";

            return $http.post('/api/userData/followUser', data)
                .success(function (data) {
                    console.log(data)
                    return data;
                });
        };

        var updateUser = function (currentUser, user) {
            var data = {
                    currentUser: currentUser,
                    user: user
                }

            return $http.post('/api/userData/updateUser', data)
                .success(function (data) {
                    console.log(data)
                    return data;
                });
        };

        var unfollowUser = function (followedPersonId, user) {
            var data = {
                    followedPersonId: followedPersonId,
                    user: user
                }
                //if (!followedPersonId) return "idea not valid";

            return $http.post('/api/userData/unfollowUser', data)
                .success(function (data) {
                    console.log(data)
                    return data;
                });
        };

        return {
            loadAllUsers: loadAllUsers,
            getUser: getUser,
            followUser: followUser,
            unfollowUser: unfollowUser, 
            updateUser: updateUser
        };
    }

})();