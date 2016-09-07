'use strict';

app.directive('validateNewHastag', function (dataService) {
    return {
        restrict: "A",

        require: "ngModel",

        link: function (scope, element, attributes, ngModel) {
            var hashtags = [];
            dataService
                .getAllTags()
                .then(function (res) {
                    hashtags = res;
                });
            ngModel.$validators.validateNewHastag = function (modelValue) {
                var i = 0;
                if (modelValue != null) {
                    while (i < hashtags.length) {
                        if (hashtags[i].name.toLowerCase() == modelValue.toLowerCase()) {
                            return false;

                        }
                        i++;
                    }
                }
                return true;
            }
        }
    };

});