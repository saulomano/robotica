import angular from 'angular';
import _ from 'lodash';

function truncate(){
  'ngInject';
  return function(value, count){
    return _.truncate(value, { 
      'length': count,
      'separator': ' '
    });
  }
}

function filterByText(){
  'ngInject';
  return function(value, filterText){
    if (value === undefined || filterText == undefined || filterText == ''){
      return value;
    }

    let fil = _.lowerCase(_.trim(filterText));
    fil = fil.replace(/\s+/ig, '|')
    fil = '(' + fil + ')';
    fil = new RegExp(fil, 'ig');

    let filtered = _.filter(value, v =>{
      let toFilter = _.map(_.keys(v), prop => {
        if (typeof v[prop] === 'string'){
          return v[prop];
        }
        return '';
      });
      toFilter = _.filter(toFilter, f => { return f !== ''});
      return _.some(toFilter, s => {
        return fil.test(s);
      })
    });

    return filtered;
  }
}

module.exports = angular
                  .module('robotica.social.filters', [])
                  .filter('truncate', truncate)
                  .filter('filterByText', filterByText)
									.name;
