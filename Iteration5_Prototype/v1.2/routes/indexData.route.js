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
        name: 'aReis',
        priority: 0
        }, {
        name: 'wPepperoni',
        priority: 2
        },
    {
        name: 'eSausage',
        priority: 4
        },
    {
        name: 'Black Olives',
        priority: 1
        },
    {
        name: 'rGreen Peppers',
        priority: 3
        },
    {
        name: 'gSausage',
        priority: 4
        },
    {
        name: 'kBlack Olives',
        priority: 1
        },
    {
        name: 'uGreen Peppers',
        priority: 3
        },
    {
        name: 'dBlack Olives',
        priority: 1
        },
    {
        name: 'hGreen Peppers',
        priority: 3
        }, {
        name: 'kReis',
        priority: 0
        }, {
        name: 'mvPepperoni',
        priority: 2
        },
    {
        name: 'Sausage',
        priority: 4
        },
    {
        name: 'vBlack Olives',
        priority: 1
        },
    {
        name: 'dGreen Peppers',
        priority: 3
        }, {
        name: 'rPepperoni',
        priority: 2
        },
    {
        name: 'daBlack Olives',
        priority: 1
        },
    {
        name: 'fGreen Peppers',
        priority: 3
        },
    {
        name: 'nBlack Olives',
        priority: 1
        },
    {
        name: 'gGreen Peppers',
        priority: 3
        }
  ];

var milestones = [
        {
				name: "find location", 
				extratime: 0,
				icon: '' 
		},     {
				name: "get founding", 
				extratime: 0,
				icon: '' 
		},     {
				name: "define project goal", 
				extratime: 0,
				icon: '' 
		},     {
				name: "find contributors", 
				extratime: 0,
				icon: '' 
		},     {
				name:  "find business partners", 
				extratime: 0,
				icon: '' 
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

router.get('/milestones', function (req, res, next) {
    res.json(milestones);
});


module.exports = router;