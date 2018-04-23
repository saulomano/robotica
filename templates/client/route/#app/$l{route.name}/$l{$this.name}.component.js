'use strict';
import angular from 'angular';
import <%- _.capitalize($model.module.name) -%>Component from '../<%-$model.module.name-%>.component';

export default class <%- _.capitalize($this.name) -%>Component extends <%- _.capitalize($model.module.name) -%>Component {
  /*@ngInject*/
  constructor($element) {
    super({$element});
	}
	
}
