var app = angular.module('phonecatApp',['ngRoute']);

app.config(['$routeProvider',function ($routerProvider) {
    $routerProvider

        // phones列表
        .when('/phones', {
        templateUrl: 'partials/phone-list.html',
        controller: PhoneListCtrl
        })

        // 详情页
        .when('/phones/:phoneId', {
        templateUrl: 'partials/phone-details.html',
        controller: PhoneDetailCtrl
        })

        // 其他情况
        .otherwise({redirectTo: '/phones'})
}]);


app.controller('PhoneListController', PhoneListCtrl);
app.controller('PhoneDetailController', PhoneDetailCtrl);


// 列表
function PhoneListCtrl($scope, $http) {
    // 1.6版本的angularjs 用then、catch 代替了success error
    $http.get('phones/phones.json').then(function (data) {
        console.log(data);
        $scope.phones = data.data;
    });

    $scope.orderProp = 'age';
}

// 详情
function PhoneDetailCtrl($scope, $routeParams, $http) {
    $http.get('phones/phone' + $routeParams.phoneId + '.json').then(function (data) {
        $scope.phone = data.data;
        $scope.mainImgUrl = data.data.images[0];
    }).catch(function (e) {
        console.log(e);
    });

    $scope.setImage = function (imgUrl) {
        $scope.mainImgUrl = imgUrl;
    }
}
