(function() {

  angular
    .module('App')
    .service('whiteboardService', WhiteboardService);


  function WhiteboardService ($http, authentication) {

    // var getProfile = function () {
    //   return $http.get('/api/profile', {
    //     headers: {
    //       Authorization: 'Bearer '+ authentication.getToken()
    //     }
    //   });
    // };

    // return {
    //   getProfile : getProfile
    // };
    var saveWhiteboard = function(whiteboard, user) {
        var data = {
            'whiteboard': whiteboard,
            'user': user
        }
        
        return $http.post('/api/whiteboard/save', whiteboard)
                .success(function (data) {
                    console.log(data)
                });
    };

  }

})();