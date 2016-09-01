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
            //TODO: 
            //Userinformation wir hier aus dem Token geholt, dieses wird mit den user daten vom server gebildet
            //jedoch kommt es von passport und beinhaltet nur id, name, mail und auth. 
            //hier also eine extra funktion bauen die alle infos über den nutzer holt anhand siener id aus dem token 
            // und einer überprüfung der rechte anhand seines tokens/auths 


            if (isLoggedIn()) {
                var token = getToken();
                var payload = token.split('.')[1];
                payload = $window.atob(payload);
                payload = JSON.parse(payload);
                console.log(payload);
                return {
                    email: payload.email,
                    name: payload.name,
                    firstname: payload.firstname,
                    id: payload._id,
                    title: payload.title,
                    profileImg: payload.profileImg, //"app/img/user.svg",
                    url: payload.url //,
                        // tags: ["ergonomics", "test", "hashtag"],
                        // groups: [
                        //     {
                        //         name: "ergonomics",
                        //         owner: true
                        //     },
                        //     {
                        //         name: "automotive driving",
                        //         owner: false
                        //     }
                        // ],
                        // ideas: [1, 5, 3, 2]
                };
            }
            // send default value
            return {
                email: '',
                name: "TUM LfE",
                firstname: '',
                id: '',
                title: '',
                profileImg: "app/img/user.svg", //"app/img/user.svg",
                url: ''
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