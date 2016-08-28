'use strict';

app.directive('validateNewMilestone', function (indexData) {
    return {
        restrict: "A",

        require: "ngModel",

        link: function (scope, element, attributes, ngModel) {
            var milestones = [];
            indexData
                .loadAllMilestones()
                .then(function (res) {
                    milestones = res;
                });
            ngModel.$validators.validateNewMilestone = function (modelValue) {
                var i = 0;
                if (modelValue != null) {
                    while (i < milestones.length) {
                        if (milestones[i].toLowerCase() == modelValue.toLowerCase()) {
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