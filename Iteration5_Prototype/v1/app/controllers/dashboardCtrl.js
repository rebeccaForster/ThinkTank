'use strict';

app.controller('DashboardCtrl', function ($scope, $location) {
  
    $scope.ideas = [
        {
            author: "Hans Petet 1",
            title: "Automotiva driving asdfkdasfj",
            tags: ["tag11", "tag21", "g11", "tag112", "tag212", "g112"],
            conributor: ["cont1", "cont2"],
            description: "blalfsldöfjsdafljdsakfljsdalf daksfjldfkjas dskfj sdafkljdöfjsdafljdsakfljsdalf daksfjldfkjas dskfdöfjsdafljdsakfljsdalf daksfjldfkjas dskf",
            img: "http://placehold.it/100x50"
        }, {
            author: "Hans Petet",
            title: "Automotiva driving asdfkdasfj",
            tags: ["tag1", "tag2"],
            conributor: ["cont1", "cont2"],
            description: "blalfsldöfjsdafljdsakfljsdalf daksfjldfkjas dskfj sdafklj",
            img: ""
        }, {
            author: "Hans Petet 2",
            title: "Automotiva driving asdfkdasfj",
            tags: ["tag12", "tag22"],
            conributor: ["cont1", "cont2"],
            description: "blalfsldöfjsdafljdsakfljsdalf daksfjldfkjas dskfdöfjsdafljdsakfljsdalf daksfjldfkjas dskfj sdafklj",
            img: ""
        }, {
            author: "Hans Petet 3",
            title: "Automotiva driving asdfkdasfj",
            tags: ["tag1", "tag2"],
            conributor: ["cont1", "cont2"],
            description: "blalfsldöfjsdafljdsakfljsdalf daksfjldfkjas dskfj sdafklj",
            img: "http://placehold.it/100x50"

        }, {
            author: "Hans Petet 4",
            title: "Automotiva driving asdfkdasfj",
            tags: ["tag1", "tag2"],
            conributor: ["cont1", "cont2"],
            description: "blalfsldöfjsdafljdsakfljsdalf daksfjldfkjasdöfjsdafljdsakfljsdalf daksfjldfkjasj",
            img: "http://placehold.it/100x50"
        }, {
            author: "Hans Petet 5",
            title: "Automotiva driving asdfkdasfj",
            tags: ["tag1", "tag2"],
            conributor: ["cont1", "cont2"],
            description: "blalfsldöfjsdafljdsakfljsdalf daksfjldfkjas dskfj sdafklj",
            img: "http://placehold.it/100x50"
        }, {
            author: "Hans Petet 6",
            title: "Automotiva driving asdfkdasfj",
            tags: ["tag1", "tag2"],
            conributor: ["cont1", "cont2"],
            description: "blalfsldöfjsdafljdsakfljsdalf daksfjldfkjadöfjsdafljdsakfljsdalf daksfjldfkjas dskfdöfjsdafljdsakfljsdalf daksfjldfkjas dskfs dskfj sdafklj",
            img: "http://placehold.it/100x50"
        }, {
            author: "Hans Petet 7",
            title: "Automotiva driving asdfkdasfj",
            tags: ["tag1", "tag2"],
            conributor: ["cont1", "cont2"],
            description: "blalfsldöfjsdafljdsakfljsdalf daksfjldfkjdöfjsdafljdsakfljsdalf daksfjldfkjas dskfdöfjsdafljdsakfljsdalf daksfjldfkjas dskfdöfjsdafljdsakfljsdalf daksfjldfkjas dskfdöfjsdafljdsakfljsdalf daksfjldfkjas dskfdöfjsdafljdsakfljsdalf daksfjldfkjas dskfas dskfj sdafklj",
            img: ""
      }
    ];

    $scope.commentIdea = function (index) {


    }
    $scope.followIdea = function (index) {


    }
    $scope.participateIdea = function (index) {


    }
    $scope.openWhiteboard = function () {
        $location.url("/whiteboard");
    }
});