(function () {

    angular
        .module('App')
        .service('authentication', authentication);

    authentication.$inject = ['$http', '$window'];

    function authentication($http, $window) {

        var saveToken = function (token) {
            $window.localStorage['mean-token'] = token;
        };

        var getToken = function () {
            return $window.localStorage['mean-token'];
        };

        var isLoggedIn = function () {
            var token = getToken();
            var payload;

            if (token) {
                payload = token.split('.')[1];
                payload = $window.atob(payload);
                payload = JSON.parse(payload);

                return payload.exp > Date.now() / 1000;
            } else {
                return false;
            }
        };

        var currentUser = function () {
            if (isLoggedIn()) {
                var token = getToken();
                var payload = token.split('.')[1];
                payload = $window.atob(payload);
                payload = JSON.parse(payload);
                return {
                    email: payload.email,
                    name: payload.name,
                    id: 6,
                    profileImg: "app/img/user.jpg",
                    url: "https://www.lfe.mw.tum.de/author/bengler/",
                    tags: ["ergonomics", "test", "hashtag"],
                    groups: [
                        {
                            name: "ergonomics",
                            owner: true
                },
                        {
                            name: "automotive driving",
                            owner: false
                }
            ],
                    ideas: [1, 5, 3, 2]
                };
            }
        };

        register = function (user) {
            return $http.post('/api/register', user).success(function (data) {
                saveToken(data.token);
            });
        };

        login = function (user) {
            return $http.post('/api/login', user)
                .success(function (data) {
                    saveToken(data.token);
                })
                .then(function () {

                });
        };

        logout = function () {
            $window.localStorage.removeItem('mean-token');
        };

        return {
            currentUser: currentUser,
            saveToken: saveToken,
            getToken: getToken,
            isLoggedIn: isLoggedIn,
            register: register,
            login: login,
            logout: logout
        };
    }


})();