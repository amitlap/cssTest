angular.module('myApp', [ 'ngMaterial' ])

    .config(function($sceProvider) {
        $sceProvider.enabled(false);
    })

    .controller('screenController', ['tileService', '$mdBottomSheet', '$mdSidenav', ScreenController ])
    .service('tileService', ['$q', TileService])

    .controller('menubarController', ['menubarService', '$mdBottomSheet', '$mdSidenav', MenuBarController ])
    .service('menubarService', ['$q','$timeout', MenubarService]);

//menubar controller
function MenuBarController(menubarService)  {
    var self = this;
    self.currentCategory = null;
    self.profile = {};
    self.categories = [];

    menubarService
        .loadCategories()
        .then(function (categories) {
            self.categories = [].concat(categories);
        });

    menubarService
        .loadProfileDate()
        .then(function (profile) {
            self.profile = profile;
        });

    //public functions
    function setCurrentCategory(category) {
        self.currentCategory = category;
    }
    self.setCurrentCategory = setCurrentCategory;

    function isCurrentCategory(category) {

        return self.currentCategory !== null && self.currentCategory.name === category.name;
    }
    self.isCurrentCategory = isCurrentCategory;

    function equal(num1, num2){
        return num1 === num2;
    }
    self.equal = equal;
}

//screenController
function ScreenController( tileService ) {
    var self = this;

    //screen variables
    self.tilesArr = [];
    self.tilesInDiv = 3;
    self.leftTiles = [
                      {'id': 0, 'tile' : null},
                      {'id': 2, 'tile' : null},
                     ];
    self.redButtons = [
                        {'id' : 0},
                        {'id' : 1},
                        {'id' : 2}
                                   ];
    self.currentRedButton = self.redButtons[0];
    self.clubs = [
        {'id' : 0, 'name' : 'lastClubs', 'header' : 'Last season top club'},
        {'id' : 1, 'name' : 'CurrentClubs', 'header' : 'Top club' }
    ]


    tileService
        .loadTiles()
        .then(function (tiles) {
            self.tilesArr.push(tiles);
            self.leftTiles[0].tile =  tiles[0];
        });

    tileService
        .loadTiles2()
        .then(function (tiles2) {
            self.tilesArr.push(tiles2);
            self.leftTiles[1].tile =  tiles2[0];
        });


    //public functions
    function moveInSlider(direction, carouselType, clubId){
        var tempId;
        var sign = 1;
        if(direction === 'left'){
            sign = -1
        }
        if(carouselType === 'clubs'){
            tempId = mod((self.leftTiles[clubId].tile.id + sign * self.tilesInDiv),self.tilesArr[clubId].length);
            self.leftTiles[clubId].tile = self.tilesArr[clubId][tempId];
            return;
        }
        if(carouselType === 'joinClub'){
            tempId = mod((self.currentRedButton.id  + sign), self.redButtons.length);
            goToButton(tempId);
            return;
        }

    }
    self.moveInSlider = moveInSlider;

    function goToButton(redButtonId){
        var temp = self.redButtons[redButtonId];
        setCurrentRedButton(temp);
    }
    self.goToButton= goToButton;

    function isCurrentRedButton(redButton) {
        return(self.currentRedButton !== null && self.currentRedButton.id === redButton.id )
    }
    self.isCurrentRedButton = isCurrentRedButton;

    function playVideo(videoId){
        var vid = document.getElementById(videoId);
        vid.muted = true;
        vid.play();
    }
    self.playVideo = playVideo;

    function stopVideo(videoId){
        var vid = document.getElementById(videoId);
        vid.pause();
    }
    self.stopVideo = stopVideo;

    function equal(num1, num2){
        return num1 === num2;
    }
    self.equal = equal;

    function getVid(tilesId, clubId){
        return 'vids/' + self.tilesArr[clubId][tilesId].video + '.mp4';
    }
    self.getVid = getVid;

    //private functions
    function mod(n, m) {
        return ((n % m) + m) % m;
    }

    function setCurrentRedButton(redButton) {
        self.currentRedButton = redButton;
    }

}

function MenubarService($q) {
    var categories = [
        {
            id : 0,
            name : "Go back to club" ,
            url : ""
        },
        {
            id : 1,
            name : "Top last season clubs",
            url : "lastClubsHeader"
        },
        {
            id : 2,
            name : "Top clubs" ,
            url : "CurrentClubsHeader"
        }
    ];
    var profile =
        {
            name : "Amit",
            balance : 1200,
            notifications : 5,
            club : "New Club",
            photo : "username-logo"
        }

    // Promise-based API
    return{
        loadCategories : function () {
                return $q.when(categories);
        },
        loadProfileDate : function () {
            return $q.when(profile);
        }
    };
}

function TileService($q){
    var tiles = [
        {
            id : 0,
            name : 'SpiderMan',
            icon : 'livePlace1',
            video : 'vid2',
            number : 1,
            members : 22
        },
        {
            id : 1,
            name : 'IronMan',
            icon : 'livePlace3',
            video : 'vid3',
            number : 2,
            members : 44
        },
        {
            id : 2,
            name : 'captain America',
            icon : 'livePlace2',
            video : 'vid1',
            number : 3,
            members : 75
        },
        {
            id : 3,
            name : 'Hulk',
            icon : 'livePlace2',
            video : 'vid1',
            number : 4,
            members : 109
        },
        {
            id : 4,
            name : 'Thor',
            icon : 'livePlace3',
            video : 'vid3',
            number : 5,
            members : 23
        },
        {
            id : 5,
            name : 'Star-Lord',
            icon : 'livePlace1',
            video : 'vid2',
            number : 6,
            members : 42
        },
        {
            id : 6,
            name : 'Vision',
            icon : 'livePlace2',
            video : 'vid1',
            number : 7,
            members : 65
        },
        {
            id : 7,
            name : 'Black Punter',
            icon : 'livePlace3',
            video : 'vid2',
            number : 8,
            members : 82
        },
        {
            id : 8,
            name : 'Ant Man',
            icon : 'livePlace1',
            video : 'vid3',
            number : 9,
            members : 38
        },
    ];
    var tiles2 = [
        {
            id : 0,
            name : 'Black widow',
            icon : 'livePlace1',
            video : 'vid1',
            number : 1,
            members : 34
        },
        {
            id : 1,
            name : 'Gamora',
            icon : 'livePlace3',
            video : 'vid2',
            number : 2,
            members : 99
        },
        {
            id : 2,
            name : 'Nebula',
            icon : 'livePlace2',
            video : 'vid3',
            number : 3,
            members : 153
        },
        {
            id : 3,
            name : 'Captain marvel',
            icon : 'livePlace2',
            video : 'vid1',
            number : 4,
            members : 54
        },
        {
            id : 4,
            name : 'The wasp',
            icon : 'livePlace3',
            video : 'vid3',
            number : 5,
            members : 87
        },
        {
            id : 5,
            name : 'Mantis',
            icon : 'livePlace1',
            video : 'vid2',
            number : 6,
            members : 63
        },
        {
            id : 6,
            name : 'valkyrie',
            icon : 'livePlace2',
            video : 'vid1',
            number : 7,
            members : 79
        },
        {
            id : 7,
            name : 'The ancient one',
            icon : 'livePlace3',
            video : 'vid2',
            number : 8,
            members : 105
        },
        {
            id : 8,
            name : 'Scarlet witch',
            icon : 'livePlace1',
            video : 'vid3',
            number : 9,
            members : 32
        },
    ];

    // Promise-based API
    return {
        loadTiles : function() {
            return $q.when(tiles);
        },
        loadTiles2 : function() {
            return $q.when(tiles2);
        }
    };
}