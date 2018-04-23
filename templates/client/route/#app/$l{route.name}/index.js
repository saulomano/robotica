'use strict';

import <%- _.capitalize($this.name) -%>Component from './<%-$this.name-%>.component';

let routes = function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('<%-$model.module.name-%>.<%-$this.name-%>', {
      url: '<%-$this.url-%>',
      template: '<<%-$model.module.name-%>-<%-$this.name-%>></<%-$model.module.name-%>-<%-$this.name-%>>'
    });
}

<% 
  var cname = $model.module.name+_.capitalize($this.name);
-%>
export default angular.module('robotica.<%-$model.module.name-%>.<%-cname-%>', [])
                      .config(routes)
                      .component('<%-cname-%>', {
                        template: require('./<%-$this.name-%>.html'),
                        controller: <%- _.capitalize($this.name) -%>Component
                      })
                      .name;