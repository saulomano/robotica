'use strict';

import $ from 'jquery';
import _ from 'lodash';
import async from 'async';

export default angular
    .module('robotica-ui.components.waterfall', [])
    .directive('rdWaterfall', rdWaterfall)
    .name;

const DEFAULT_COLUMNS_SIZE = 5;
const DEFAULT_ITEM_WIDTH = 350;
const DEFAULT_GUTTER = 24;

class RdWaterfallController {
    /*@ngInject*/
    constructor($scope, $element, $timeout, $compile, $attrs, $mdMedia, $window){
			this.$scope = $scope;
			this.$element = $element;
			this.$timeout = $timeout;
			this.$attrs = $attrs;
			this.$compile = $compile;
			this.$window = $window;
			this.$mdMedia = $mdMedia;
			this.columnsSizes = {};
			this.lastColumn_ = null;
			this.loadMoreText = this.$scope.loadMoreText || 'Load more';
			this.maxItems = this.$scope.maxItems || 0;
			this.$scope.itemWidth = this.$scope.itemWidth || DEFAULT_ITEM_WIDTH;
			this.$scope.gutter = this.$scope.gutter	|| DEFAULT_GUTTER;
			this.searchText = '';
			

			this.$scope.$watch(() => { return this.$scope.searchText }, (value) => {
				if (this.searchText !== value) {
					this.searchText = value;
					if (this.searchText == undefined && value  == undefined ) {
						return;
					}
					//reset & fetch
					this.reset();
					this.fetch();
				}
			});

			this.$scope.$watch(() => { return this.$scope.obligareset }, (value) => {				
					//reset & fetch
					if ( value  == undefined ) {
						return;
					}

					this.reset();
					this.fetch();
				
			});



			// set sizes
			this.initColumnsSizes_();
			this.$element.addClass('rd-waterfall');
			this.currentPage = 1;



			this.limit = 20;
			if (this.maxItems!= 0){
				this.limit = this.maxItems;
			}
			this.itemCount = 0;
		}

		$onInit(){
			this.$wrapperElement = angular.element(this.$element.children()[0]);
			this.$templ = angular.element(this.$attrs.itemTemplate);			
			this.$wrapperElement.empty();

			$(this.$window).resize(() => {
				this.$timeout(() => {
					this.render_();	
				}, 200);
			});

			// fetch the first time
			this.fetch();
		}

		reset(){
			this.currentPage = 1;
			this.limit = 20;
			this.itemCount = 0;
			this.$wrapperElement.empty();
		}

		itemWidth_(){
			return this.$scope.itemWidth;
		}

		gutter_(){
			return this.$scope.gutter;
		}
		
		render_(force){
			let csize = this.columnSize_();
			if (this.rendering_ && !force) 
				return;
				
			let gutter = this.gutter_();
			let itemW = this.itemWidth_();
			this.rendering_ = true;
			this.lastColumn_ = csize;

			let colsHeights = {};
			//init counters
			for (var c = 0; c < csize; c++){
				colsHeights[c] = 0;
			}

			$(this.$wrapperElement).find('[data-grid-item]').each(function(){
				let $this = $(this);
				let idx = parseInt($this.attr('data-grid-item'));
				//let ci = idx % csize;
				// get the column with min height
				let ci = _.minBy(_.keys(colsHeights), (key) => {
					return colsHeights[key];
				});

				let tx = (itemW*(ci))+((ci)*gutter);
				let ty = colsHeights[ci];

				// set transform
				$this.css('transform', `translateX(${tx}px) translateY(${ty}px)`);

				$this.css('opacity', 1);

				// upgrade colsHeights
				colsHeights[ci] += $this.height() + gutter;
			});
			
			this.rendering_ = false;

			// upgrade the wrapper height
			let wrapperHeight = _.max(_.values(colsHeights)) + gutter;
			let wrapperWidth = (itemW*csize)+(gutter*(csize-1));
			
			$(this.$wrapperElement).height(wrapperHeight);
			$(this.$wrapperElement).width(wrapperWidth);
		}
		
		aggregate_(items) {
			this.itemCount += items.length;

			for (var i = 0; i < items.length; i++) {
				let item = items[i];
				let childScope = this.$scope.$new(false);
				childScope.item=item;
				childScope.clicked = ($event) => {
					if (!this.$scope.itemClick || item.type === 'addnew' || item.type === 'desafios' || item.type === 'desafiopropuesto') {
						return;
					}
					this.$scope.itemClick.apply(this.$scope.$parent, [$event, item]);
				};
				let clone = this.$templ.clone();				
				clone[0].innerHTML = this.$attrs.itemTemplate[0].innerHTML;
				let el = this.$compile(clone)(childScope);
				el.attr('data-grid-item', i);
				$(el).width(this.itemWidth_());
				this.$wrapperElement.append(el);
			}

			this.$timeout(()=>{
				this.render_();
			});
		}

		fetch(){
			this.fetching_ = true;
			this.$scope.fetch()
					.then(data => {
						this.currentPage = data.page;
						this.limit = data.limit;
						this.total = data.count;

						if (data.items) {
							this.aggregate_(data.items);
						}
					})
					.finally(()=>{
						this.fetching_ = false;
					});
		}

		initColumnsSizes_(){
			// init breakpoints
			let abks = { };
			for (var aname in this.$attrs.$attr){
				let htag = this.$attrs.$attr[aname];
				if (/^columns\-?/i.test(htag)) {
					abks[htag] = this.$attrs[aname]
				}
			}
			this.columnsSizes['columns'] = parseInt(abks['columns']) || DEFAULT_COLUMNS_SIZE;
			let bks = ["xs", "sm", "md", "lg", "xl"];

			bks.forEach(b => {
				if (abks[`columns-${b}`]){
					this.columnsSizes[b] = parseInt(abks[`columns-${b}`]) || this.columnsSizes['columns'];
				}
				if (abks[`columns-gt-${b}`]){
					this.columnsSizes[`gt-${b}`] = parseInt(abks[`columns-gt-${b}`]) || this.columnsSizes['columns'];
				}
			});
		}

    columnSize_(){
			let cs = Math.floor($(this.$window).width()/(this.itemWidth_()+this.gutter_()));
			return cs === 0 ? 1: cs;
    }
		
		loadingIsVisible() {
			return this.fetching_ || this.rendering_;
		}

		nomoreItems() {

			if (this.maxItems!==0 && this.maxItems <= this.itemCount)
				return true;


			if (this.itemCount === 0 || this.itemCount >= this.total){
				return true;
			}
			if (!(this.currentPage*this.limit)){
				return true;
			}
			return (this.currentPage*this.limit) >= this.total;
		}

		showMoreVisible(){

		


			return this.loadingIsVisible() || this.nomoreItems() ;//&& (this.maxItems!=0|| this.maxItems <= this.itemCount);
		}
}

function rdWaterfall(){
    'ngInject';

    return {
			restrict: 'E',
			controllerAs: '$rdWaterfallCtrl',
			controller: RdWaterfallController,
			scope: {
				'fetch': '&',
				'itemWidth': '=',
				'gutter': '=',
				'loadMoreText': '@',
				'itemClick': '=',
				'searchText': '=',
				'maxItems': '=',
				'obligareset':'=?'
			},
			template: (element, attr) => {
				attr.itemTemplate    = getItemTemplate();
				return `
				<div class="rd-waterfall__wrapper"></div>
				<div class="rd-waterfall__actions">
					<md-button class="rd-waterfall__button--load-more md-raised md-primary" ng-click="$rdWaterfallCtrl.fetch()" ng-hide="$rdWaterfallCtrl.showMoreVisible()">{{$rdWaterfallCtrl.loadMoreText}}</md-button>
					<div layout="row" layout-sm="column" layout-align="space-around" ng-if="$rdWaterfallCtrl.loadingIsVisible()">
						<md-progress-circular md-mode="indeterminate"></md-progress-circular>
					</div>
				</div>
				`;

				// helpers
			function getItemTemplate() {
					var templateTag = element.find('rd-item-template').detach(),
					html = templateTag.length ? templateTag.html() : element.html();
					let $templ = angular.element(`<div class="rd-waterfall__item" ng-click="clicked($event)">${html}</div>`);
					// copy attributes
					if (templateTag.length){
							let $templOne = templateTag[0];

							for (var i =0; i<$templOne.attributes.length; i++){
									let a = $templOne.attributes[i];
									if (/class/i.test(a.name)){
											$templ.addClass(a.value);
									} else if (/ng-click/i.test(a.name)){
											
									} else {
											$templ.attr(a.name, a.value);
									}
							}
					}

					if (!templateTag.length) element.empty();
					return $templ;
				}
			}
    };
}