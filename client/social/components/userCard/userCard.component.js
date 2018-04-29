'use strict';

export default angular
    .module('robotica.social.components.userCard', [])
    .directive('userCard', userCard)
    .name;

class UserCardController {
    /*@ngInject*/
    constructor($scope, $element, $state, $http){
        this.$scope = $scope;
        this.$element = $element;
        this.$state = $state;
        this.$http =$http;
        this.$element.addClass('resource-card');
        this.showInfo = true;

        this.user = this.$scope.user;
        this.editable = this.$scope.editable === true;
    }

    editUser(id, role){
        // this.$state.go(`curador.recurso`, { uid: _id });
        const host = window.location.host;
        const protocol = window.location.protocol;
        const payload = {
            id: id,
            role: role
        };
        this.$http.post(`${protocol}//${host}/users/editUser`, payload).then(function(success) {
            console.log(success);
        }, function(err) {
            console.log(err);
        });
    }

    deleteUser(id){
        // this.$state.go(`curador.recurso`, { uid: this.user._id, action: 'remove' });
    }
}

function userCard($log){
    'ngInject';

    return {
        restrict: 'E',
        controller: UserCardController,
        controllerAs: '$ctrl',
        scope: {
            user: '=',
            editable: '='
        },
        template: require('./userCard.html')
    }
}