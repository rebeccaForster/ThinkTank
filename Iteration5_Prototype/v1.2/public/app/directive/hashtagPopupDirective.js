'use strict';

app.directive('validateNewHastag', function (indexData) {
    return {
        restrict: "A",

        require: "ngModel",

        link: function (scope, element, attributes, ngModel) {
            var hashtags = [];
            indexData
                .getAllTags()
                .then(function (res) {
                    hashtags = res;
                });
            ngModel.$validators.validateNewHastag = function (modelValue) {
                var i = 0;
                while (i < hashtags.length) {
                    if (hashtags[i].name.toLowerCase() == modelValue.toLowerCase()) {
                        return false;

                    }
                    i++;
                }
                return true;
            }
        }
    };

});