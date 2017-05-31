angular
    .module('app')
    .controller('authCtrl', function ($auth, $http) {
        var vm = this;

        vm.isAuthenticated = function() {
            return $auth.isAuthenticated();
        };

        vm.getUser = function () {
            $http.get('/users').then(function (res) {
                vm.users = res.data;
            });              
        }

        vm.logout = function () {
            $auth.logout();
        }

        vm.signup = function () {
            $auth.signup(vm.user).then(function (token) {
                $auth.setToken(token);
            })
        }
    })