'use strict';

app.controller('DashboardProfileCtrl', function ($scope, $location, $mdDialog, $mdMedia) {
    $scope.users = [
        {
            id: 0,
            name: "Marius Mülle0",
            profileImg: "app/img/user.jpg",
            url: "https://www.lfe.mw.tum.de/author/bengler/",
            tags: ["tag11", "tag21", "g11", "tag112", "tag212", "g112"],
            groups: [
                {
                    name: "ergonomics",
                    owner: true
                },
                {
                    name: "automotive driving",
                    owner: false
                }
            ],
            ideas: [1, 6, 3, 2]

        }, {
            id: 1,
            name: "Marius Mülle1",
            profileImg: "app/img/user.jpg",
            url: "https://www.lfe.mw.tum.de/author/bengler/",
            tags: ["tag11", "tag21", "g11", "tag112", "tag212", "g112"],
            groups: [
                {
                    name: "ergonomics",
                    owner: true
                },
                {
                    name: "automotive driving",
                    owner: false
                }
            ],
            ideas: [1, 6, 3, 2]
        }, {
            id: 2,
            name: "Marius Mülle2",
            profileImg: "app/img/user.jpg",
            url: "https://www.lfe.mw.tum.de/author/bengler/",
            tags: ["tag11", "tag21", "g11", "tag112", "tag212", "g112"],
            groups: [
                {
                    name: "ergonomics",
                    owner: true
                },
                {
                    name: "automotive driving",
                    owner: false
                }
            ],
            ideas: [1, 4, 3, 2]
        }, {
            id: 3,
            name: "Marius Mülle3",
            profileImg: "app/img/user.jpg",
            url: "https://www.lfe.mw.tum.de/author/bengler/",
            tags: ["tag11", "tag21", "g11", "tag112", "tag212", "g112"],
            groups: [
                {
                    name: "ergonomics",
                    owner: true
                },
                {
                    name: "automotive driving",
                    owner: false
                }
            ],
            ideas: [1, 5, 3, 2]
        }, {
            id: 4,
            name: "Marius Mülle4",
            profileImg: "app/img/user.jpg",
            url: "https://www.lfe.mw.tum.de/author/bengler/",
            tags: ["tag11", "tag21", "g11", "tag112", "tag212", "g112"],
            groups: [
                {
                    name: "ergonomics",
                    owner: true
                },
                {
                    name: "automotive driving",
                    owner: false
                }
            ],
            ideas: [1, 6, 3, 2]
        }, {
            id: 5,
            name: "Marius Mülle5",
            profileImg: "app/img/user.jpg",
            url: "https://www.lfe.mw.tum.de/author/bengler/",
            tags: ["tag11", "tag21", "g11", "tag112", "tag212", "g112"],
            groups: [
                {
                    name: "ergonomics",
                    owner: true
                },
                {
                    name: "automotive driving",
                    owner: false
                }
            ],
            ideas: [1, 2]
        }, {
            id: 6,
            name: "Marius Mülle6",
            profileImg: "app/img/user.jpg",
            url: "https://www.lfe.mw.tum.de/author/bengler/",
            tags: ["tag11", "tag21", "g11", "tag112", "tag212", "g112"],
            groups: [
                {
                    name: "ergonomics",
                    owner: true
                },
                {
                    name: "automotive driving",
                    owner: false
                }
            ],
            ideas: [1, 5, 3, 2]
        }, {
            id: 7,
            name: "Marius Mülle7",
            profileImg: "app/img/user.jpg",
            url: "https://www.lfe.mw.tum.de/author/bengler/",
            tags: ["tag11", "tag21", "g11", "tag112", "tag212", "g112"],
            groups: [
                {
                    name: "ergonomics",
                    owner: true
                },
                {
                    name: "automotive driving",
                    owner: false
                }
            ],
            ideas: [1, 5, 3, 2]
        }
    ]
    $scope.ideas = [
        {
            id: 0,
            author: 6,
            title: "Automotiva driving asdfkdasfj Automotiva driving asdfkdasfj Automotiva driving asdfkdasfj",
            tags: ["tag11", "tag21", "g11", "tag112", "tag212", "g112"],
            contributors: [1, 3, 4, 6, 7, 2],
            description: "blalfsldöfjsdafljdsakfljsdalf daksfjldfkjas dskfj sdafkljdöfjsdafljdsakfljsdalf daksfjldfkjas dskfdöfjsdafljdsakfljsdalf daksfjldfkjas dskf",
            img: "http://placehold.it/100x50",
            scribble: 'http://placehold.it/150x100',
            milestones: [
                {
                    name: "find location",
                    status: true
                }, {
                    name: "get founding",
                    status: true
                }, {
                    name: "define project goal",
                    status: false
                }, {
                    name: "find contributors",
                    status: false
                }, {
                    name: "find business partners",
                    status: true
                }
            ],
            percentage: 40,
            dayLeft: "6",
            messages: [

                {
                    author: 2,
                    text: "asdfl ldajf dsakfjldomotiva driving asdfkdasfj Automotiva driving asdfkdasfj Automotiva dr e alkjdklfjasd ekl re akdsfjl",
                    likeIdeaStatus: true,
                    newInputStatus: true,
                    troubleStatus: true,
                    other: false
            }, {
                    author: 7,
                    text: "asdfl ldajf dsakfjldf omotiva driving asdfkdasfj Automotiva driving asdfkdasfj Automotiva dromotiva driving asdfkdasfj Automotiva driving asdfkdasfj Automotiva dre alkjdklfjasd ekl re akdsfjl",
                    likeIdeaStatus: true,
                    newInputStatus: false,
                    troubleStatus: true,
                    other: false
            },
                {
                    author: 1,
                    text: "asdfl ldajf dsakfjldf omotiva driving asdfkdasfj Automotiva driving asdfkdasfj Automotiva dromotiva driving asdfkdasfj Automotiva driving asdfkdasfj Automotiva dromotiva driving asdfkdasfj Automotiva driving asdfkdasfj Automotiva dre alkjdklfjasd ekl re akdsfjl",
                    likeIdeaStatus: false,
                    newInputStatus: false,
                    troubleStatus: true,
                    other: false
            }, {
                    author: 7,
                    text: "asdfl ldajf dsakfjldf omotiva driving asdfkdasfj Automotiva driving asdfkdasfj Automotiva dromotiva driving asdfkdasfj Automotiva driving asdfkdasfj Automotiva dre alkjdklfjasd ekl re akdsfjl",
                    likeIdeaStatus: true,
                    newInputStatus: false,
                    troubleStatus: true,
                    other: false
            },
                {
                    author: 1,
                    text: "asdfl ldajf dsakfjldf omotiva driving asdfkdasfj Automotiva driving asdfkdasfj Automotiva dromotiva driving asdfkdasfj Automotiva driving asdfkdasfj Automotiva dromotiva driving asdfkdasfj Automotiva driving asdfkdasfj Automotiva dre alkjdklfjasd ekl re akdsfjl",
                    likeIdeaStatus: false,
                    newInputStatus: false,
                    troubleStatus: true,
                    other: false
            }, {
                    author: 7,
                    text: "asdfl ldajf dsakfjldf omotiva driving asdfkdasfj Automotiva driving asdfkdasfj Automotiva dromotiva driving asdfkdasfj Automotiva driving asdfkdasfj Automotiva dre alkjdklfjasd ekl re akdsfjl",
                    likeIdeaStatus: true,
                    newInputStatus: false,
                    troubleStatus: true,
                    other: false
            },
                {
                    author: 1,
                    text: "asdfl ldajf dsakfjldf omotiva driving asdfkdasfj Automotiva driving asdfkdasfj Automotiva dromotiva driving asdfkdasfj Automotiva driving asdfkdasfj Automotiva dromotiva driving asdfkdasfj Automotiva driving asdfkdasfj Automotiva dre alkjdklfjasd ekl re akdsfjl",
                    likeIdeaStatus: false,
                    newInputStatus: false,
                    troubleStatus: true,
                    other: false
            }

            ]
    }, {
            id: 1,
            author: 2,
            title: "Automotiva driving asdfkdasfj",
            tags: ["tag11", "tag21", "g11", "tag112", "tag212", "g112"],
            contributors: [1, 3, 6],
            description: "blalfsldöfjsdafljdsakfljsdalf daksfjldfkjas dskfj sdafkljdöfjsdafljdsakfljsdalf daksfjldfkjas dskfdöfjsdafljdsakfljsdalf daksfjldfkjas dskf",
            img: "http://placehold.it/100x50",
            scribble: 'http://placehold.it/150x100',
            milestones: [
                {
                    name: "find location",
                    status: true
                }, {
                    name: "get founding",
                    status: true
                }, {
                    name: "define project goal",
                    status: false
                }, {
                    name: "find contributors",
                    status: false
                }, {
                    name: "find business partners",
                    status: true
                }
            ],
            percentage: 50,
            dayLeft: "7",
            messages: [

                {
                    author: 2,
                    text: "asdfl ldajf dsakfjldf e alkjdklfjasd ekl re akdsfjl",
                    likeIdeaStatus: true,
                    newInputStatus: true,
                    troubleStatus: true,
                    other: false
            }, {
                    author: 7,
                    text: "asdfl ldajf dsakfjldf e alkjdklfjasd ekl re akdsfjl",
                    likeIdeaStatus: true,
                    newInputStatus: true,
                    troubleStatus: true,
                    other: false
            },
                {
                    author: 1,
                    text: "asdfl ldajf dsakfjldf e alkjdklfjasd ekl re akdsfjl",
                    likeIdeaStatus: true,
                    newInputStatus: true,
                    troubleStatus: true,
                    other: false
            }

            ]
    }, {
            id: 2,
            author: 0,
            title: "Automotiva driving asdfkdasfj",
            tags: ["tag12", "tag22"],
            contributors: [1, 4, 6],
            description: "blalfsldöfjsdafljdsakfljsdalf daksfjldfkjas dskfdöfjsdafljdsakfljsdalf daksfjldfkjas dskfj sdafklj",
            img: "",
            scribble: '',
            milestones: [
                {
                    name: "find location",
                    status: true
                }, {
                    name: "get founding",
                    status: true
                }, {
                    name: "define project goal",
                    status: false
                }, {
                    name: "find contributors",
                    status: false
                }, {
                    name: "find business partners",
                    status: true
                }
            ],
            percentage: 60,
            dayLeft: "8",
            messages: [

                {
                    author: 2,
                    text: "asdfl ldajf dsakfjldf e alkjdklfjasd ekl re akdsfjl",
                    likeIdeaStatus: true,
                    newInputStatus: true,
                    troubleStatus: true,
                    other: false
            }, {
                    author: 7,
                    text: "asdfl ldajf dsakfjldf e alkjdklfjasd ekl re akdsfjl",
                    likeIdeaStatus: true,
                    newInputStatus: true,
                    troubleStatus: true,
                    other: false
            },
                {
                    author: 1,
                    text: "asdfl ldajf dsakfjldf e alkjdklfjasd ekl re akdsfjl",
                    likeIdeaStatus: true,
                    newInputStatus: true,
                    troubleStatus: true,
                    other: false
            }

            ]
    }, {
            id: 3,
            author: 3,
            title: "Automotiva driving asdfkdasfj",
            tags: ["tag1", "tag2"],
            contributors: ["cont1", "cont2"],
            description: "blalfsldöfjsdafljdsakfljsdalf daksfjldfkjas dskfj sdafklj",
            img: "http://placehold.it/100x50",
            scribble: 'http://placehold.it/150x100',
            milestones: [
                {
                    name: "find location",
                    status: true
                }, {
                    name: "get founding",
                    status: true
                }, {
                    name: "define project goal",
                    status: false
                }, {
                    name: "find contributors",
                    status: false
                }, {
                    name: "find business partners",
                    status: true
                }
            ],
            percentage: 70,
            dayLeft: "9",
            messages: [

                {
                    author: 2,
                    text: "asdfl ldajf dsakfjldf e alkjdklfjasd ekl re akdsfjl",
                    likeIdeaStatus: true,
                    newInputStatus: true,
                    troubleStatus: true,
                    other: false
            }, {
                    author: 7,
                    text: "asdfl ldajf dsakfjldf e alkjdklfjasd ekl re akdsfjl",
                    likeIdeaStatus: true,
                    newInputStatus: true,
                    troubleStatus: true,
                    other: false
            },
                {
                    author: 1,
                    text: "asdfl ldajf dsakfjldf e alkjdklfjasd ekl re akdsfjl",
                    likeIdeaStatus: true,
                    newInputStatus: true,
                    troubleStatus: true,
                    other: false
            }

            ]

    }, {
            id: 4,
            author: 6,
            title: "Automotiva driving asdfkdasfj",
            tags: ["tag1", "tag2"],
            contributors: [4, 3, 6],
            description: "blalfsldöfjsdafljdsakfljsdalf daksfjldfkjasdöfjsdafljdsakfljsdalf daksfjldfkjasj",
            img: "http://placehold.it/100x50",
            scribble: 'http://placehold.it/150x100',
            milestones: [
                {
                    name: "find location",
                    status: true
                }, {
                    name: "get founding",
                    status: true
                }, {
                    name: "define project goal",
                    status: false
                }, {
                    name: "find contributors",
                    status: false
                }, {
                    name: "find business partners",
                    status: true
                }
            ],
            percentage: 80,
            dayLeft: "10",
            messages: [

                {
                    author: 2,
                    text: "asdfl ldajf dsakfjldf e alkjdklfjasd ekl re akdsfjl",
                    likeIdeaStatus: true,
                    newInputStatus: true,
                    troubleStatus: true,
                    other: false
            }, {
                    author: 7,
                    text: "asdfl ldajf dsakfjldf e alkjdklfjasd ekl re akdsfjl",
                    likeIdeaStatus: true,
                    newInputStatus: true,
                    troubleStatus: true,
                    other: false
            },
                {
                    author: 1,
                    text: "asdfl ldajf dsakfjldf e alkjdklfjasd ekl re akdsfjl",
                    likeIdeaStatus: true,
                    newInputStatus: true,
                    troubleStatus: true,
                    other: false
            }

            ]
    }, {
            id: 5,
            author: 7,
            title: "Automotiva driving asdfkdasfj",
            tags: ["tag1", "tag2"],
            contributors: [1, 2, 6],
            description: "blalfsldöfjsdafljdsakfljsdalf daksfjldfkjas dskfj sdafklj",
            img: "http://placehold.it/100x50",
            scribble: 'http://placehold.it/150x100',
            milestones: [
                {
                    name: "find location",
                    status: true
                }, {
                    name: "get founding",
                    status: true
                }, {
                    name: "define project goal",
                    status: false
                }, {
                    name: "find contributors",
                    status: false
                }, {
                    name: "find business partners",
                    status: true
                }
            ],
            percentage: 90,
            dayLeft: "11",
            messages: [

                {
                    author: 2,
                    text: "asdfl ldajf dsakfjldf e alkjdklfjasd ekl re akdsfjl",
                    likeIdeaStatus: true,
                    newInputStatus: true,
                    troubleStatus: true,
                    other: false
            }, {
                    author: 7,
                    text: "asdfl ldajf dsakfjldf e alkjdklfjasd ekl re akdsfjl",
                    likeIdeaStatus: true,
                    newInputStatus: true,
                    troubleStatus: true,
                    other: false
            },
                {
                    author: 1,
                    text: "asdfl ldajf dsakfjldf e alkjdklfjasd ekl re akdsfjl",
                    likeIdeaStatus: true,
                    newInputStatus: true,
                    troubleStatus: true,
                    other: false
            }

            ]
    }, {
            id: 6,
            author: 6,
            title: "Automotiva driving asdfkdasfj",
            tags: ["tag1", "tag2"],
            contributors: [1, 3, 7],
            description: "blalfsldöfjsdafljdsakfljsdalf daksfjldfkjadöfjsdafljdsakfljsdalf daksfjldfkjas dskfdöfjsdafljdsakfljsdalf daksfjldfkjas dskfs dskfj sdafklj",
            img: "http://placehold.it/100x50",
            scribble: 'http://placehold.it/150x100',
            milestones: [
                {
                    name: "find location",
                    status: true
                }, {
                    name: "get founding",
                    status: true
                }, {
                    name: "define project goal",
                    status: false
                }, {
                    name: "find contributors",
                    status: false
                }, {
                    name: "find business partners",
                    status: true
                }
            ],
            percentage: 100,
            dayLeft: "123",
            messages: [

                {
                    author: 2,
                    text: "asdfl ldajf dsakfjldf e alkjdklfjasd ekl re akdsfjl",
                    likeIdeaStatus: true,
                    newInputStatus: true,
                    troubleStatus: true,
                    other: false
            }, {
                    author: 7,
                    text: "asdfl ldajf dsakfjldf e alkjdklfjasd ekl re akdsfjl",
                    likeIdeaStatus: true,
                    newInputStatus: true,
                    troubleStatus: true,
                    other: false
            },
                {
                    author: 1,
                    text: "asdfl ldajf dsakfjldf e alkjdklfjasd ekl re akdsfjl",
                    likeIdeaStatus: true,
                    newInputStatus: true,
                    troubleStatus: true,
                    other: false
            }

            ]
    }
    ];

    $scope.maxColumn = 3;
    $scope.maxProfileColumn = 2;

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

    $scope.showProfile = function (index, ev) {
        $mdDialog.show({
                controller: ProfilePopupController,
                templateUrl: 'app/views/profile-popup.html',
                targetEvent: ev,
                scope: $scope, // use parent scope in template
                preserveScope: true,
                clickOutsideToClose: true,
                fullscreen: true,
                locals: {
                    profileIndex: index
                }
            })
            .then(function () {
            }, function () {
            });


    };


    $scope.user = $scope.users[3];

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
    $scope.showIdea = function (index, ev) {
        $mdDialog.show({
                controller: IdeaPopupController,
                templateUrl: 'app/views/idea-popup.html',
                scope: $scope, // use parent scope in template
                preserveScope: true,
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: true,
                locals: {
                    ideaIndex: index
                }
            })
            .then(function () {
            }, function () {
            });


    };



});



function IdeaPopupController($scope, $mdDialog, ideaIndex) {
    $scope.selectedIdea = $scope.ideas[ideaIndex];

    $scope.hide = function () {
        $mdDialog.hide();
    };
    $scope.cancel = function () {
        $mdDialog.cancel();
    };

}

function ProfilePopupController($scope, $mdDialog, profileIndex) {
    $scope.user = $scope.users[profileIndex];

    $scope.hide = function () {
        $mdDialog.hide();
    };
    $scope.cancel = function () {
        $mdDialog.hide();
    };

}
