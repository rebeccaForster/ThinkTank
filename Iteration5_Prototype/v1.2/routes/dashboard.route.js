var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Comment = require('../models/comment.model.js');
var Idea = require('../models/idea.model.js');
var Person = require('../models/users.model.js');
var Scibble = require('../models/scibble.model.js');
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
        tags: ["tag11", "tag21", "g11", "tag112", "tag212", "g112"],
        contributors: [1, 3, 4, 6, 7, 2],
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
        title: "Idee 5 Automotiva driving asdfkdasfj",
        tags: ["tag1", "tag2"],
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
        title: " Idee 6 Automotiva driving asdfkdasfj",
        tags: ["tag1", "tag2"],
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
        author: "6",
        title: "Automotiva driving asdfkdasfj",
        tags: ["tag1", "tag2"],
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


router.get('/allideas', function (req, res, next) {
    //$scope.ideas = Idea.find();

    res.json(ideas);
});

router.get('/bytags/:tags', function (req, res, next) {
    var tagsList = req.params.tags.split(',');
    //$scope.ideas = Idea.find( { tags: { $in: tagsList } });

    res.json(ideas);
});

router.get('/byquery/:query', function (req, res, next) {
    var query = req.params.query;
    //$scope.ideas = Idea.find( { });

    res.json(ideas);
});



module.exports = router;