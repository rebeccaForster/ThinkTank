var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Comment = require('../models/comment.js');
var Idea = require('../models/idea.js');
var Person = require('../models/users.js');
var Scibble = require('../models/scibble.js');
var Dash = [];

//Test for connection: 
var idea = {
    _id: "ObjectID(AAAAA)",
    created: 1234567,
    lastchanged: 123456,
    title: "Test Idea",
    abstract: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,",
    picture: "/uploads/pictures/938378229.png",
    author: "ObjectID(BABAA)",
    contirubutors: ["ObjectID(CADSSA)", "ObjectID(ASDAS)"],
    tags: "#ergonomics #test #hashtag",
    livetime: 1584694,
    scribbles: ["/uploads/scribbles/65466.svg", "/uploads/scribbles/861654.svg"]
}

var ideas = [
    {
        id: 0,
        author: 6,
        title: "Automotiva driving asdfkdasfj Automotiva driving asdfkdasfj Automotiva driving asdfkdasfj",
        tags: [ "ergonomics", "test", "hashtag"],
        contributors: [1, 3, 4, 6, 7, 2],
        description: "blalfsldöfjsdafljdsakfljsdalf daksfjldfkjas dskfj sdafkljdöfjsdafljdsakfljsdalf daksfjldfkjas dskfdöfjsdafljdsakfljsdalf daksfjldfkjas dskf",
        img: 'https://placekitten.com/600/300',
        scribble: 'https://placekitten.com/600/300',
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
        dayMax: 100,
        dayLeft: 25,
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
        tags: [ "ergonomics", "test", "hashtag"],
        contributors: [1, 3, 6],
        description: "blalfsldöfjsdafljdsakfljsdalf daksfjldfkjas dskfj sdafkljdöfjsdafljdsakfljsdalf daksfjldfkjas dskfdöfjsdafljdsakfljsdalf daksfjldfkjas dskf",
        img: "https://placekitten.com/600/300",
        scribble: 'https://placekitten.com/600/300',
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
        dayMax: 330,
        dayLeft: 10,
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
        tags: [ "ergonomics", "test", "hashtag"],
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
        dayMax: 300,
        dayLeft: 100,
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
        tags: [ "ergonomics", "test", "hashtag"],
        contributors: ["cont1", "cont2"],
        description: "blalfsldöfjsdafljdsakfljsdalf daksfjldfkjas dskfj sdafklj",
        img: "https://placekitten.com/600/300",
        scribble: 'https://placekitten.com/600/300',
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
        dayMax: 300,
        dayLeft: 100,
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
        title: "Idee 5 Automotiva driving asdfkdasfj",
        tags: [ "ergonomics", "test", "hashtag"],
        contributors: [4, 3, 6],
        description: "blalfsldöfjsdafljdsakfljsdalf daksfjldfkjasdöfjsdafljdsakfljsdalf daksfjldfkjasj",
        img: "https://placekitten.com/600/300",
        scribble: 'https://placekitten.com/600/300',
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
        dayMax: 300,
        dayLeft: 100,
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
        title: " Idee 6 Automotiva driving asdfkdasfj",
        tags: [ "ergonomics", "test", "hashtag"],
        contributors: [1, 2, 6],
        description: "blalfsldöfjsdafljdsakfljsdalf daksfjldfkjas dskfj sdafklj",
        img: "https://placekitten.com/600/300",
        scribble: 'https://placekitten.com/600/300',
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
        dayMax: 300,
        dayLeft: 100,
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
        author: "6",
        title: "Automotiva driving asdfkdasfj",
        tags: [ "ergonomics", "test", "hashtag"],
        contributors: [1, 3, 7],
        description: "blalfsldöfjsdafljdsakfljsdalf daksfjldfkjadöfjsdafljdsakfljsdalf daksfjldfkjas dskfdöfjsdafljdsakfljsdalf daksfjldfkjas dskfs dskfj sdafklj",
        img: "https://placekitten.com/600/300",
        scribble: 'https://placekitten.com/600/300',
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
        dayMax: 300,
        dayLeft: 100,
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

var users = [
    {
        id: 0,
        name: "Marius Mülle0",
        profileImg: "app/img/user.jpg",
        url: "https://www.lfe.mw.tum.de/author/bengler/",
        tags: [ "ergonomics", "test", "hashtag"],
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
        tags: [ "ergonomics", "test", "hashtag"],
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
        tags: [ "ergonomics", "test", "hashtag"],
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
        tags: [ "ergonomics", "test", "hashtag"],
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
        tags: [ "ergonomics", "test", "hashtag"],
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
        tags: [ "ergonomics", "test", "hashtag"],
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
        tags: [ "ergonomics", "test", "hashtag"],
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
        ideas: [3, 2]
        }, {
        id: 7,
        name: "Marius Mülle7",
        profileImg: "app/img/user.jpg",
        url: "https://www.lfe.mw.tum.de/author/bengler/",
        tags: [ "ergonomics", "test", "hashtag"],
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
    ];

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   Idea.find(function (err, todos) {
//     if (err) return next(err);
//     res.json(todos);
//   });

// });

router.get('/ideas', function (req, res, next) {
    res.json(ideas);
});

router.get('/users', function (req, res, next) {
    res.json(users);
});

// router.get('/dashboardData/:query/:sort', function(req, res, next) {
//   Dash.push(findById(req.params.query, function (err, post) {
//     if (err) return next(err);


//     res.json(post);
//   }));
// });

module.exports = router;