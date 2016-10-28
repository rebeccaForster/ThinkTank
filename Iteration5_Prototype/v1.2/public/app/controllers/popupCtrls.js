/* controller if the idea pop-up will open */
function IdeaPopupController($scope, $mdDialog) {

    /* set deafult of if the isBack scope  */
    $scope.isBack = false;

    $scope.hide = function () {

        $mdDialog.hide();
    };
    $scope.cancel = function () {
        $mdDialog.cancel();
    };

    $scope.back = function () {
        $scope.goBackPopup();

        $mdDialog.hide();

    };

    /* function to go to the whiteboard with the id of the idea */
    $scope.goWhiteboard = function (id) {
        $scope.openWhiteboard(id);
        $mdDialog.hide();


    }

}

/* profile pop-up controller if the profile pop-up will be laoded */
function ProfilePopupController($scope, $mdDialog) {
    $scope.isBack = false;

    $scope.hide = function () {
        $mdDialog.hide();
    };
    $scope.cancel = function () {
        $mdDialog.cancel();
    };
    $scope.back = function () {
        $scope.goBackPopup();

        $mdDialog.hide();
    };

}

/* hashtag pop-up controller if the hashtag pop-up should bi open */
function HashtagPopupController($scope, $mdDialog, dataService) {
   
    /*
        The function returns the hashtag style for the shown hashtag in the hashtag pop-up
        input: priority - the server returns a hashtag strucutre with a priority of the hashtags how often it is callen in the idea
        return: font size of the hashtag in dependency of the priority
    */
    $scope.getHashtagStyle = function (priority) {

        var size = "0px";
        switch (priority) {
        case 0:
            size = "18px"
            break;
        case 1:
            size = "22px"
            break;
        case 2:
            size = "26px"
            break;
        case 3:
            size = "30px"
            break;
        case 4:
            size = "34px"
            break;

        default:
            size = "12px"
        }
        return {
            "font-size": size
        }
    }
    $scope.hide = function () {
        $mdDialog.hide();
    };
    $scope.cancel = function () {
        $mdDialog.cancel();
    };


}

/* sign in controller */
function LoginDialogController($scope, $mdDialog, isSendComment, addFollowIdea, addFollowPerson, authentication) {
    $scope.isBack = false;

    $scope.credentials = {
        email: "",
        password: ""
    };
    $scope.test = "";

    $scope.hide = function () {
        $mdDialog.hide();
    };
    $scope.cancel = function () {
        $mdDialog.cancel();
    };
    $scope.login = function () {
        authentication
            .login($scope.credentials)
            .then(function () {
                /* change the sign in status if the then function is called from the service */
                $scope.setSignInStatus();

                if (isSendComment || addFollowIdea || addFollowPerson) {
                    /* if a user comes from a comment, follow idea or follow person to the sign in pop-up
                        the user should go back to the last pop-up to execute the task*/
                    $scope.back();
                } else {
                    $scope.cancel();
                }


            });
        /* todo: add an verify and error function */


    };
    $scope.back = function () {
        $scope.goBackPopup();


        $mdDialog.hide();
    };
}

/* sign up pop-up controller */
function RegisterDialogController($scope, $mdDialog, authentication) {
    $scope.credentials = {
        email: "",
        name: "",
        title: "",
        firstname: "",
        url: "",
        profileImg: "",
        password: ""
    };

    $scope.hide = function () {
        $mdDialog.hide();
    };
    $scope.cancel = function () {
        $mdDialog.cancel();
    };
    $scope.register = function () {
        authentication
            .register($scope.credentials)
            .then(function () {
                /* if the sign up was successful than the user should go back to the login box */
                /* todo: verification of the mail address */
                $scope.cancel();
                $scope.showLoginBox(false, false, false);
            });
        /* todo: verify and error of the input data */

    };
}

/* controller for update the profile data  */
function UpdateProfilePopupController($scope, $mdDialog) {

    $scope.hide = function () {
        $mdDialog.hide();
    };
    $scope.cancel = function () {
        $mdDialog.cancel();
    };

}

/* controller to open a pop-pu to save the whiteboard  */
function SaveDialogController($scope, $mdDialog, authentication) {
    $scope.credentials = {
        email: "",
        password: ""
    };
    $scope.title = "";
    $scope.hide = function () {
        $mdDialog.hide();
    };
    $scope.cancel = function () {
        $mdDialog.cancel();
    };
    $scope.save = function () {
        $scope.saveNewIdea();

        $scope.cancel();


    };
};

/* controller for the desciption pop-up on the whiteboard*/
function DescriptionPopupController($scope, $mdDialog) {

    $scope.hide = function () {
        $mdDialog.hide();
    };
    $scope.cancel = function () {
        $mdDialog.cancel();
    };

}


/*  Controlle rfor the contributor pop-up on the whiteboard */
function ContrPopupController($scope, $mdDialog, profileService) {
    
    $scope.hide = function () {
        $mdDialog.hide();
    };
    $scope.cancel = function () {
        $mdDialog.cancel();
    };

}


/* controller fo rthe milestones pop-up on the whiteboard*/
function MilestonesPopupController($scope, $mdDialog, dataService) {
    
    $scope.hide = function () {
        $mdDialog.hide();
    };
    $scope.cancel = function () {
        $mdDialog.cancel();
    };

}