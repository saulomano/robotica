'use strict';
import angular from 'angular';
import AppComponent from '../app.component';
import _ from 'lodash';
import $ from 'jquery';

export default class LoginComponent extends AppComponent {
  user = {
    name: '',
    email: '',
    password: ''
  };
  errors = {
    login: undefined
  };
  submitted = false;
  Auth;
  $state;

  /*@ngInject*/
  constructor($scope, $element, $q, $http, Auth, $state, $stateParams, $timeout, ngMeta) {
    super({$element});
    this.$scope = $scope;
    this.$http = $http;
    this.Auth = Auth;
    this.$state = $state;
    this.$stateParams = $stateParams;
    this.loadingGoogle = false;
    this.$timeout = $timeout;
    this.loading = false;

    ngMeta.setTitle('Login');
    ngMeta.setTag('description', 'Inicio de sesion en el entorno Ronda.');
  }

  googleLogin(){
    this.loading = true;
    function PopupCenter(url, title, w, h) {
        // Fixes dual-screen position                         Most browsers      Firefox
        var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
        var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;
    
        var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
        var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;
    
        var left = ((width / 2) - (w / 2)) + dualScreenLeft;
        var top = ((height / 2) - (h / 2)) + dualScreenTop;
        var newWindow = window.open(url, title, 'menubar=false,location=false,resizable=false, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
    
        // Puts focus on the newWindow
        if (window.focus) {
            newWindow.focus();
        }

        return newWindow;
    }

    let host = window.location.host;
    let protocol = window.location.protocol;

    let url = `${protocol}//${host}/auth/google`;
    let loginWindow = PopupCenter(url, 'Google Login', 350, 350);

    /*
    loginWindow.addEventListener('closed', e => { 
      if (e.userRole == 'user'){
        this.errors.login = 'El email no se encuentra habilitado.';
        this.$scope.$apply();
        return;
      }

      this.$state.go('curador.dashboard');
    }, false);

    loginWindow.onunload = (e) => {
      console.log('window unload');
      console.log(loginWindow.user);
      console.log(loginWindow.userRole);
    };
    */

    let interval = setInterval(() => {
      if (loginWindow.closed == true){
        if (loginWindow.userRole == 'user'){
          this.errors.login = 'El email no se encuentra habilitado.';
          this.$scope.$apply();
          return;
        }

        this.$timeout(() => {
          //this.$state.go('curador.dashboard');
          window.location.href = `${protocol}//${host}/tablero`;
        }, 500);
        clearInterval(interval);
      }
    }, 500);
    
  }
  
  login(form) {
    this.submitted = true;

    if(form.$valid) {
      this.Auth.login({
        email: this.user.email,
        password: this.user.password
      })
      .then(() => {
        // Logged in, redirect to home
        this.$state.go('curador.dashboard');
      })
      .catch(err => {
        this.errors.login = err.message;
      });
    }
  }
	
}
