'use strict';

app.controller('DashboardCtrl', function ($scope, $location, $mdDialog, $mdMedia) {

    $scope.ideas = [
        {
            id: 1,
            author: "Hans Petet 1",
            title: "Automotiva driving asdfkdasfj",
            tags: ["tag11", "tag21", "g11", "tag112", "tag212", "g112"],
            conributor: ["cont1", "cont2"],
            description: "blalfsldöfjsdafljdsakfljsdalf daksfjldfkjas dskfj sdafkljdöfjsdafljdsakfljsdalf daksfjldfkjas dskfdöfjsdafljdsakfljsdalf daksfjldfkjas dskf",
            img: "http://placehold.it/100x50"
        }, {
            id: 2,
            author: "Hans Petet 2",
            title: "Automotiva driving asdfkdasfj",
            tags: ["tag12", "tag22"],
            conributor: ["cont1", "cont2"],
            description: "blalfsldöfjsdafljdsakfljsdalf daksfjldfkjas dskfdöfjsdafljdsakfljsdalf daksfjldfkjas dskfj sdafklj",
            img: ""
        }, {
            id: 3,
            author: "Hans Petet 3",
            title: "Automotiva driving asdfkdasfj",
            tags: ["tag1", "tag2"],
            conributor: ["cont1", "cont2"],
            description: "blalfsldöfjsdafljdsakfljsdalf daksfjldfkjas dskfj sdafklj",
            img: "http://placehold.it/100x50"

        }, {
            id: 4,
            author: "Hans Petet 4",
            title: "Automotiva driving asdfkdasfj",
            tags: ["tag1", "tag2"],
            conributor: ["cont1", "cont2"],
            description: "blalfsldöfjsdafljdsakfljsdalf daksfjldfkjasdöfjsdafljdsakfljsdalf daksfjldfkjasj",
            img: "http://placehold.it/100x50"
        }, {
            id: 5,
            author: "Hans Petet 5",
            title: "Automotiva driving asdfkdasfj",
            tags: ["tag1", "tag2"],
            conributor: ["cont1", "cont2"],
            description: "blalfsldöfjsdafljdsakfljsdalf daksfjldfkjas dskfj sdafklj",
            img: "http://placehold.it/100x50"
        }, {
            id: 6,
            author: "Hans Petet 6",
            title: "Automotiva driving asdfkdasfj",
            tags: ["tag1", "tag2"],
            conributor: ["cont1", "cont2"],
            description: "blalfsldöfjsdafljdsakfljsdalf daksfjldfkjadöfjsdafljdsakfljsdalf daksfjldfkjas dskfdöfjsdafljdsakfljsdalf daksfjldfkjas dskfs dskfj sdafklj",
            img: "http://placehold.it/100x50"
        }, {
            id: 7,
            author: "Hans Petet 7",
            title: "Automotiva driving asdfkdasfj",
            tags: ["tag1", "tag2"],
            conributor: ["cont1", "cont2"],
            description: "blalfsldöfjsdafljdsakfljsdalf daksfjldfkjdöfjsdafljdsakfljsdalf daksfjldfkjas dskfdöfjsdafljdsakfljsdalf daksfjldfkjas dskfdöfjsdafljdsakfljsdalf daksfjldfkjas dskfdöfjsdafljdsakfljsdalf daksfjldfkjas dskfdöfjsdafljdsakfljsdalf daksfjldfkjas dskfas dskfj sdafklj",
            img: ""
      }, {
            id: 8,
            author: "Hans Petet 4",
            title: "Automotiva driving asdfkdasfj",
            tags: ["tag1", "tag2"],
            conributor: ["cont1", "cont2"],
            description: "blalfsldöfjsdafljdsakfljsdalf daksfjldfkjasdöfjsdafljdsakfljsdalf daksfjldfkjasj",
            img: "http://placehold.it/100x50"
        }, {
            id: 9,
            author: "Hans Petet 5",
            title: "Automotiva driving asdfkdasfj",
            tags: ["tag1", "tag2"],
            conributor: ["cont1", "cont2"],
            description: "blalfsldöfjsdafljdsakfljsdalf daksfjldfkjas dskfj sdafklj",
            img: "http://placehold.it/100x50"
        }, {
            id: 10,
            author: "Hans Petet 6",
            title: "Automotiva driving asdfkdasfj",
            tags: ["tag1", "tag2"],
            conributor: ["cont1", "cont2"],
            description: "blalfsldöfjsdafljdsakfljsdalf daksfjldfkjadöfjsdafljdsakfljsdalf daksfjldfkjas dskfdöfjsdafljdsakfljsdalf daksfjldfkjas dskfs dskfj sdafklj",
            img: "http://placehold.it/100x50"
        }, {
            id: 11,
            author: "Hans Petet 7",
            title: "Automotiva driving asdfkdasfj",
            tags: ["tag1", "tag2"],
            conributor: ["cont1", "cont2"],
            description: "blalfsldöfjsdafljdsakfljsdalf daksfjldfkjdöfjsdafljdsakfljsdalf daksfjldfkjas dskfdöfjsdafljdsakfljsdalf daksfjldfkjas dskfdöfjsdafljdsakfljsdalf daksfjldfkjas dskfdöfjsdafljdsakfljsdalf daksfjldfkjas dskfdöfjsdafljdsakfljsdalf daksfjldfkjas dskfas dskfj sdafklj",
            img: ""
      }
    ];

    $scope.maxColumn = 3
    $scope.commentIdea = function (index, ev) {
        $mdDialog.show(
            $mdDialog.alert()
            .parent(angular.element(document.querySelector('#popupContainer')))
            .clickOutsideToClose(true)
            .title('Comment Idea')
            .textContent('Index: ' + index)
            .ariaLabel('Alert Dialog Demo')
            .ok('Got it!')
            .targetEvent(ev)
        );

    }
    $scope.followIdea = function (index, ev) {
        $mdDialog.show(
            $mdDialog.alert()
            .clickOutsideToClose(true)
            .title('Follow Idea')
            .textContent('Index: ' + index)
            .ariaLabel('Alert Dialog Demo')
            .ok('Got it!')
            .targetEvent(ev)
        );

    }
    $scope.participateIdea = function (index, ev) {
        $mdDialog.show(
            $mdDialog.alert()
            .clickOutsideToClose(true)
            .title('Participate Idea')
            .textContent('Index: ' + index)
            .ariaLabel('Alert Dialog Demo')
            .ok('Got it!')
            .targetEvent(ev)
        );

    }

    $scope.showAuthor = function (ev) {
        $mdDialog.show(
            $mdDialog.alert()
            .clickOutsideToClose(true)
            .title('Show Author')
            .textContent()
            .ariaLabel('Alert Dialog Demo')
            .ok('Got it!')
            .targetEvent(ev)
        );

    }


    $scope.addSearchTag = function (indexIdea, IndexTag, ev) {
        $mdDialog.show(
            $mdDialog.alert()
            .clickOutsideToClose(true)
            .title('Add Hashtag')
            .textContent('Index Idea: ' + indexIdea + '  Index Tag: ' + IndexTag)
            .ariaLabel('Alert Dialog Demo')
            .ok('Got it!')
            .targetEvent(ev)
        );
    }

    $scope.openWhiteboard = function () {
        $location.url("/whiteboard");
    }

    $scope.showIdea = function (ev) {
        $mdDialog.show({
                controller: DialogController,
                templateUrl: 'app/views/idea-popup.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: true
            })
            .then(function (answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function () {
                $scope.status = 'You cancelled the dialog.';
            });
    };

   
    
});

app.controller('gridListDemoCtrl', function ($scope) {
    this.column1 = buildGridModel(0, $scope.maxColumn, $scope.ideas);
    this.column2 = buildGridModel(1, $scope.maxColumn, $scope.ideas);
    this.column3 = buildGridModel(2, $scope.maxColumn, $scope.ideas);

    function buildGridModel(start, column, tileTmpl) {
        var it, results = [];
        var j = start;
        while (j < tileTmpl.length) {
            it = angular.extend({}, tileTmpl[j]);

            results.push(it);
            j = j + column;
        }
        return results;
    }
})

function DialogController($scope, $mdDialog) {
    $scope.hide = function () {
        $mdDialog.hide();
    };
    $scope.cancel = function () {
        $mdDialog.cancel();
    };

}