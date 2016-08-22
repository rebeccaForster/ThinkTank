//indexData.route 

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Comment = require('../models/comment.model.js');
var Idea = require('../models/idea.model.js');
var Person = require('../models/users.model.js');
var Scibble = require('../models/scibble.model.js');

//Test for connection: 
var hashtags = [
        {
            id: 0,
            name: 'aReis',
            priority: 0
        }, {
            id: 1,
            name: 'wPepperoni',
            priority: 2
        },
        {
            id: 2,
            name: 'eSausage',
            priority: 4
        },
        {
            id: 3,
            name: 'Black Olives',
            priority: 1
        },
        {
            id: 4,
            name: 'rGreen Peppers',
            priority: 3
        },
        {
            id: 5,
            name: 'gSausage',
            priority: 4
        },
        {
            id: 6,
            name: 'kBlack Olives',
            priority: 1
        },
        {
            id: 7,
            name: 'uGreen Peppers',
            priority: 3
        },
        {
            id: 8,
            name: 'dBlack Olives',
            priority: 1
        },
        {
            id: 9,
            name: 'hGreen Peppers',
            priority: 3
        }, {
            id: 10,
            name: 'kReis',
            priority: 0
        }, {
            id: 11,
            name: 'mvPepperoni',
            priority: 2
        },
        {
            id: 12,
            name: 'Sausage',
            priority: 4
        },
        {
            id: 13,
            name: 'vBlack Olives',
            priority: 1
        },
        {
            id: 14,
            name: 'dGreen Peppers',
            priority: 3
        }, {
            id: 15,
            name: 'rPepperoni',
            priority: 2
        },
        {
            id: 16,
            name: 'daBlack Olives',
            priority: 1
        },
        {
            id: 17,
            name: 'fGreen Peppers',
            priority: 3
        },
        {
            id: 18,
            name: 'nBlack Olives',
            priority: 1
        },
        {
            id: 19,
            name: 'gGreen Peppers',
            priority: 3
        }
  ];

var users = [
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
    ];




router.get('/users', function (req, res, next) {
    res.json(users);
});

router.get('/tags', function (req, res, next) {
    res.json(hashtags);
});


module.exports = router;