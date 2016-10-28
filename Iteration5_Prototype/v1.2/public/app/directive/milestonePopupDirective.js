'use strict';
/* directive which verify the entered new milestone, if the milestone is in the list or not
    independency the validator return a true or fals. 
    if it returns true the new entered milestone is new and can be added
    if it return false the milestone exist */
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