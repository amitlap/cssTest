var app = angular.module("myApp", [
    'ui.router'
]);

app.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider.state("home",{
        url: '/',
        abstract: false,
        views: {
            'menuBarView': {
                templateUrl: '/menuBar.tmpl.html',
                // templateUrl: 'https://github.com/amitlap/cssTest/blob/master/test1.html',
                controller: 'menuBarCtrl'
            },
            'screenView': {
                templateUrl: "/screen.tmpl.html",
                controller: 'screenCtrl'
            }
        }
    });
})

app.controller('screenCtrl', function($scope,$timeout){

    $scope.tiles = [
        {'id':0, 'name':'', 'icon':'start-icon', 'video':'vid1' ,'number':null, 'members':null},
        {'id':1, 'name':'', 'icon':'start-icon', 'video':'vid2' ,'number':null, 'members':null},
        {'id':2, 'name':'', 'icon':'start-icon', 'video':'vid3' ,'number':null, 'members':null},
        {'id':3, 'name':'', 'icon':'start-icon', 'video':'vid1' ,'number':null, 'members':null},
        {'id':4, 'name':'', 'icon':'start-icon', 'video':'vid2' ,'number':null, 'members':null},
        {'id':5, 'name':'', 'icon':'start-icon', 'video':'vid3' ,'number':null, 'members':null},
        {'id':6, 'name':'', 'icon':'start-icon', 'video':'vid1' ,'number':null, 'members':null},
        {'id':7, 'name':'', 'icon':'start-icon', 'video':'vid2' ,'number':null, 'members':null},
        {'id':8, 'name':'', 'icon':'start-icon', 'video':'vid3' ,'number':null, 'members':null},
    ];

    $scope.tiles2 = [
        {'id':0, 'name':'', 'icon':'start-icon', 'video':'vid1' ,'number':null, 'members':null},
        {'id':1, 'name':'', 'icon':'start-icon', 'video':'vid2' ,'number':null, 'members':null},
        {'id':2, 'name':'', 'icon':'start-icon', 'video':'vid3' ,'number':null, 'members':null},
        {'id':3, 'name':'', 'icon':'start-icon', 'video':'vid1' ,'number':null, 'members':null},
        {'id':4, 'name':'', 'icon':'start-icon', 'video':'vid2' ,'number':null, 'members':null},
        {'id':5, 'name':'', 'icon':'start-icon', 'video':'vid3' ,'number':null, 'members':null},
        {'id':6, 'name':'', 'icon':'start-icon', 'video':'vid1' ,'number':null, 'members':null},
        {'id':7, 'name':'', 'icon':'start-icon', 'video':'vid2' ,'number':null, 'members':null},
        {'id':8, 'name':'', 'icon':'start-icon', 'video':'vid3' ,'number':null, 'members':null},
    ];

    $scope.redButtons = [
        {'id':0},
        {'id':1},
        {'id':2}
    ];

    var clubsNames = ['SpiderMan', 'IronMan', 'Captian America‬‏', 'Hulk', 'Thor', 'Star-Lord', 'Black Punter', 'Ant Man', 'hawkeye',];
    var clubsIcons = ['livePlace1', 'livePlace2', 'livePlace3', 'livePlace3', 'livePlace1', 'livePlace2', 'livePlace2', 'livePlace1', 'livePlace3',];
    var clubsVideos =['vid1', 'vid2', 'vid3', 'vid2', 'vid3', 'vid1', 'vid1', 'vid3', 'vid2',];
    var clubsNumbers = [0,1,2,3,4,5,6,7,8];
    var clubsMembers = [12, 20, 40, 61, 11, 32, 44, 58, 37];

    //init the data using timeout
    var API = function(){
        var i=0;
        $timeout(function(){
            for(i=0; i<clubsVideos.length; i++){
               $scope.tiles[i].video = clubsVideos[i];
            }
        },100);
        $timeout(function(){
            for(i=0; i<clubsNames.length; i++){
                $scope.tiles[i].name = clubsNames[i];
            }
        },200);
        $timeout(function(){
            for(i=0; i<clubsIcons.length; i++){
              $scope.tiles[i].icon = clubsIcons[i];
            }
        },300);
        $timeout(function(){
            for(i=0; i<clubsNumbers.length; i++){
                $scope.tiles[i].number = clubsNumbers[i];
            }
        },400);
        $timeout(function(){
            for(i=0; i<clubsMembers.length; i++){
               $scope.tiles[i].members = clubsMembers[i];
            }
        },500);
    }

    API();

    $scope.currentRedButton = $scope.redButtons[0];
    $scope.leftTile = $scope.tiles[0];
    $scope.tilesInDiv = 3;
    $scope.n = '4';

    function isCurrentRedButton(redButton) {
        return($scope.currentRedButton !== null && $scope.currentRedButton.id === redButton.id )
    }

    function setCurrentRedButton(redButton) {
        $scope.currentRedButton = redButton;
    }

    function goToButton(redButtonId){
        var temp = $scope.redButtons[redButtonId];
        setCurrentRedButton(temp);
    }

    function equal(num1, num2){
        return num1 === num2;
    }

    function goPrev(current,from){
        var tempId;
        if(from === 'redButton'){
            tempId = mod((current.id - 1),$scope.redButtons.length);
            goToButton(tempId);
        }
        if(from === "lastClubs"){
            tempId = mod((current.id - $scope.tilesInDiv),$scope.tiles.length);
            $scope.leftTile = $scope.tiles[tempId];
        }
    }

    function goNext(current,from){
        var tempId;
        if(from === "redButton"){
            tempId = mod((current.id + 1),$scope.redButtons.length);
            goToButton(tempId);
        }
        if(from === "lastClubs"){
            tempId = mod((current.id + $scope.tilesInDiv),$scope.tiles.length);
            $scope.leftTile = $scope.tiles[tempId];
        }
    }

    function mod(n, m) {
        return ((n % m) + m) % m;
    }

    function playVideo(videoId){
        var vid = document.getElementById(videoId);
        vid.muted = true;
        vid.play();
    }

    function stopVideo(videoId){
        var vid = document.getElementById(videoId);
        vid.pause();
    }

    //make functions public
    $scope.stopVideo = stopVideo;
    $scope.playVideo = playVideo;
    $scope.goPrev = goPrev;
    $scope.goNext = goNext;
    $scope.equal = equal;
    $scope.goToButton = goToButton;
    $scope.setCurrentRedButton = setCurrentRedButton;
    $scope.isCurrentRedButton = isCurrentRedButton;
})

app.controller('menuBarCtrl', function ($scope,$timeout) {

    $scope.categories = [
        {"id":0, "name":"Go back to club" , "url":""},
        {"id":1,  "name":"", "url": ""},
        {"id":2, "name":"" , "url":""}

    ];

    $scope.profile = {"id":0, "name":"", "club":"", "photo":"", "balance":0, "notifications":0};

    var names = ["Last season top club", "Top club" ];
    var locations = ["last-season", "current-season"];

    //init the data using timeout
    var API = function(){
        var i=0;
        $timeout(function(){
            for(i=0; i<names.length; i++){
                $scope.categories[i+1].name = names[i] ;
            }
        },100);
        $timeout(function(){
            for(i=0; i<locations.length; i++){
                $scope.categories[i+1].url = locations[i] ;
            }
        },200);
        $timeout(function(){
            $scope.profile.id = 0;
            $scope.profile.name = "Amit";
            $scope.profile.club = "New Club";
            $scope.profile.photo = "username-logo";
            $scope.profile.balance = 1200;
            $scope.profile.notifications = 3;
        },300);
    }

    API();

    $scope.currentCategory = null;

    function setCurrentCategory(category) {
        $scope.currentCategory = category;
    }

    function isCurrentCategory(category) {

        return $scope.currentCategory !== null && $scope.currentCategory.name === category.name;
    }

    function goToElement(elementId){
        var element = document.getElementById(elementId);
        element.scrollIntoView();
    }

    function equal(num1, num2){
        return num1 === num2;
    }

    //make the function public
    $scope.equal = equal;
    $scope.goToElement = goToElement;
    $scope.setCurrentCategory = setCurrentCategory;
    $scope.isCurrentCategory = isCurrentCategory;
    //----------------------------------------------------------------------------//
});


app.directive("clubTileDirective", function() {
    return {
        templateUrl: '/clubCarousel.tmpl.html'
    };
});

app.directive("clubTileDirectiveTow", function() {
    return {
        templateUrl: '/clubCarousel.tmpl.html'
    };
});
app.directive("clubTileDirectiveTow", function () {
    return {
        restrict: 'E',
        scope: {
            n: '='
        },
        link: function(scope) {
            scope.$watch('n', function() {
               n='2';
            });
        }
    };
})
