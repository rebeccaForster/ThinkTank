(function () {

    angular
        .module('App')
        .service('ideaService', IdeaService);


    function IdeaService($http, authentication) {

        var saveNewIdea = function (idea, user) {
            var data = {
                idea: idea,
                user: user
            }
            return $http.post('/api/ideaData/saveNewIdea', data)
                .then(function (data) {
                    console.log(data.data.id);
                    return data.data.id;
                });

        };

        var getIdea = function (id) {
            var a = "/api/ideaData/getIdea/";
            return $http.get(a.concat(id)).then(function (response) {
                var idea = response.data;
                console.log(idea);
                return idea;
            });
        };

        var updateIdea = function (idea, user) {
            var data = {
                idea: idea,
                user: user
            }
            console.log("update idea posted");
            console.log(idea);
            // if (!idea.id) return "idea not valid";

            return $http.post('/api/ideaData/updateIdea', data)
                .success(function (retData) {
                    console.log(retData)
                    return retData;
                });
        };

        var writeComment = function (ideaId, comment, user) {
            var data = {
                ideaId, ideaId, //String
                comment: comment, //object (text, reaction, optional: title, scribble )
                    user: user //currentUser object
            }

            return $http.post('/api/ideaData/writeComment', data)
                .success(function (data) {
                    console.log(data)
                    return data;
                });
        };



        var followIdea = function (ideaId, user) {
            var data = {
                ideaId: ideaId,
                user: user
            }

            return $http.post('/api/ideaData/followIdea', data)
                .success(function (data) {
                    console.log(data)
                    return data;
                });
        };


        var likeIdea = function (ideaId, user) {
            var data = {
                ideaId: ideaId,
                user: user
            }

            return $http.post('/api/ideaData/likeIdea', whiteboard)
                .success(function (data) {
                    console.log(data)
                    return data;
                });
        };

        var unFollowIdea = function (ideaId, user) {
            var data = {
                ideaId: ideaId,
                user: user
            }

            return $http.post('/api/ideaData/unFollowIdea', data)
                .success(function (data) {
                    console.log(data)
                    return data;
                });
        };


        var dislikeIdea = function (ideaId, user) {
            var data = {
                ideaId: ideaId,
                user: user
            }

            return $http.post('/api/ideaData/dislikeIdea', whiteboard)
                .success(function (data) {
                    console.log(data)
                    return data;
                });
        };

        return {
            saveNewIdea: saveNewIdea,
            updateIdea: updateIdea,
            writeComment: writeComment,
            getIdea: getIdea,
            likeIdea: likeIdea,
            followIdea: followIdea,
            unFollowIdea: unFollowIdea

        };
    }

})();