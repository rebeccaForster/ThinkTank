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
        created: "25.08.2016",
        lastchanged:"29.08.2016",
        title: "Automotiva driving asdfkdasfj Automotiva driving asdfkdasfj Automotiva driving asdfkdasfj",
        description: "blalfsldöfjsdafljdsakfljsdalf daksfjldfkjas dskfj sdafkljdöfjsdafljdsakfljsdalf daksfjldfkjas dskfdöfjsdafljdsakfljsdalf daksfjldfkjas dskf",
        img: 'https://placekitten.com/600/300',
        author: 0,
        contributors: [1, 3, 4, 6, 7, 2],
        milestones: [{
				name: "find location", 
				extratime: 0,
				percentage: 100,
				icon: '' 
		},{
				name: "get founding", 
				extratime: 0,
				percentage: 0,
				icon: '' 
		}
                    ] , 
        scribble: ['https://placekitten.com/600/300'],
        tags: [ "ergonomics", "test", "hashtag"],
        livetime: 100,

        messages: [

            {
                author: 2,
                text: "asdfl ldajf dsakfjldomotiva driving asdfkdasfj Automotiva driving asdfkdasfj Automotiva dr e alkjdklfjasd ekl re akdsfjl",
                likeIdeaStatus: true,
                newInputStatus: true,
                troubleStatus: true,
                other: false,
                date: "25.5.2016"
            }, {
                author: 7,
                text: "asdfl ldajf dsakfjldf omotiva driving asdfkdasfj Automotiva driving asdfkdasfj Automotiva dromotiva driving asdfkdasfj Automotiva driving asdfkdasfj Automotiva dre alkjdklfjasd ekl re akdsfjl",
                likeIdeaStatus: true,
                newInputStatus: false,
                troubleStatus: true,
                other: false,
                date: "25.5.2016"

            },
            {
                author: 1,
                text: "asdfl ldajf dsakfjldf omotiva driving asdfkdasfj Automotiva driving asdfkdasfj Automotiva dromotiva driving asdfkdasfj Automotiva driving asdfkdasfj Automotiva dromotiva driving asdfkdasfj Automotiva driving asdfkdasfj Automotiva dre alkjdklfjasd ekl re akdsfjl",
                likeIdeaStatus: false,
                newInputStatus: false,
                troubleStatus: true,
                other: false,
                date: "25.5.2016"

            }, {
                author: 7,
                text: "asdfl ldajf dsakfjldf omotiva driving asdfkdasfj Automotiva driving asdfkdasfj Automotiva dromotiva driving asdfkdasfj Automotiva driving asdfkdasfj Automotiva dre alkjdklfjasd ekl re akdsfjl",
                likeIdeaStatus: true,
                newInputStatus: false,
                troubleStatus: true,
                other: false,
                date: "25.5.2016"

            },
            {
                author: 1,
                text: "asdfl ldajf dsakfjldf omotiva driving asdfkdasfj Automotiva driving asdfkdasfj Automotiva dromotiva driving asdfkdasfj Automotiva driving asdfkdasfj Automotiva dromotiva driving asdfkdasfj Automotiva driving asdfkdasfj Automotiva dre alkjdklfjasd ekl re akdsfjl",
                likeIdeaStatus: false,
                newInputStatus: false,
                troubleStatus: true,
                other: false,
                date: "25.5.2016"

            }, {
                author: 7,
                text: "asdfl ldajf dsakfjldf omotiva driving asdfkdasfj Automotiva driving asdfkdasfj Automotiva dromotiva driving asdfkdasfj Automotiva driving asdfkdasfj Automotiva dre alkjdklfjasd ekl re akdsfjl",
                likeIdeaStatus: true,
                newInputStatus: false,
                troubleStatus: true,
                other: false,
                date: "25.5.2016"

            },
            {
                author: 1,
                text: "asdfl ldajf dsakfjldf omotiva driving asdfkdasfj Automotiva driving asdfkdasfj Automotiva dromotiva driving asdfkdasfj Automotiva driving asdfkdasfj Automotiva dromotiva driving asdfkdasfj Automotiva driving asdfkdasfj Automotiva dre alkjdklfjasd ekl re akdsfjl",
                likeIdeaStatus: false,
                newInputStatus: false,
                troubleStatus: true,
                other: false,
                date: "25.5.2016"

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