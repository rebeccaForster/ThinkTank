'use strict';

app.directive('validateNewMilestone', function (dataService) {
    return {
        restrict: "A",

        require: "ngModel",

        link: function (scope, element, attributes, ngModel) {
            var milestones = [];
            dataService
                .loadAllMilestones()
                .then(function (res) {
                    milestones = res;
                });
            ngModel.$validators.validateNewMilestone = function (modelValue) {
                var i = 0;
                if (modelValue != null) {
                    while (i < milestones.length) {
                        if (milestones[i].name.toLowerCase() == modelValue.toLowerCase()) {
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