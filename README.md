# ng-data-source
[![Build Status](https://travis-ci.org/FDIM/ng-data-source.svg?branch=master)](https://travis-ci.org/FDIM/ng-data-source)
[![Coverage Status](https://coveralls.io/repos/github/FDIM/ng-data-source/badge.svg?branch=master)](https://coveralls.io/github/FDIM/ng-data-source?branch=master)

A factory to help you deal with infinite loading. 

## usage

#controller
```
module.controller('myController', ['dataSource',function(dataSource){
  var model = this;
  model.dataSource = dataSource(loadItems);

  function loadItems(token){
    // token = last item in collection or a token returned from you service call
    return myService.fetchItems();
    // should return {items:[], totalCount:0, token:'myToken'}
  }
}]);
```
#html

example below uses https://github.com/sroze/ngInfiniteScroll
```
<div infinite-scroll="model.dataSource.load()" infinite-scroll-container="'.my-container'" infinite-scroll-distance="2">
  <my-item ng-repeat="i in model.dataSource.items" item="i"></my-item>
  <div class="infinite-scroll-loading-indicator" layout layout-align="center center">
    <md-icon md-svg-icon="ripple" ng-if="model.dataSource.loading"></md-icon>
  </div>
</div>
```
## installation
As simple as "bower install ng-data-source" :)
