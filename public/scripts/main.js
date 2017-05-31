angular
    .module('app', ['satellizer'])
    .config(function ($authProvider) {
        $authProvider.loginUrl = '/auth/login';
        $authProvider.signupUrl = '/auth/signup';
        $authProvider.tokenPrefix = 'auth'
    })