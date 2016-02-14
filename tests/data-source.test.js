"use strict";
/**
 * Tests sit right alongside the file they are testing, which is more intuitive
 * and portable than separating `src` and `test` directories. Additionally, the
 * build process will exclude all `.spec.js` files from the build
 * automatically.
 */
describe('data source', function () {
  var dataSource;
  var $q;
  var $rootScope;
  beforeEach(module("data-source"));
  beforeEach(inject(function(_$rootScope_, _$q_,_dataSource_){
    $q = _$q_;
    $rootScope= _$rootScope_;
    dataSource = _dataSource_;
  }));
  it("should work", function(){
    expect(true).toBeTruthy();
  });
  
  it("should yield one item and have correct token", function(){
    var ob = dataSource(function(token){
      return $q(function(resolve, reject){
        resolve({items:[{}], totalCount:1, token:"abc"});        
      });
    });  
    expect(ob.loading).toBeTruthy();
    $rootScope.$digest();
    
    expect(ob.items.length).toBe(1);
    expect(ob.totalCount).toBe(1);
    expect(ob.token).toBe('abc');
    expect(ob.loading).not.toBeTruthy();
  });
  
  it("should yield one item and have last item as token", function(){
    var item = {};
    var ob = dataSource(function(token){
      return $q(function(resolve, reject){
        resolve({items:[item]});        
      });
    });  
    expect(ob.loading).toBeTruthy();
    $rootScope.$digest();
    
    expect(ob.items.length).toBe(1);
    expect(ob.totalCount).toBe(1);
    expect(ob.token).toEqual(item);
    console.info(ob);
    expect(ob.loading).not.toBeTruthy();
  });
  
  it("should yield 2 items and have correct token", function(){
    var ob = dataSource(function(token){
      return $q(function(resolve, reject){
        resolve({items:[{}], totalCount:2, token:"abc"});        
      });
    });  
    $rootScope.$digest();
    expect(ob.items.length).toBe(1);
    expect(ob.totalCount).toBe(2);
    expect(ob.token).toBe('abc');
    // overwrite callback
    ob.callback = function(token){
      return $q(function(resolve, reject){
        resolve({items:[{}], totalCount:2, token:"abcd"});        
      });
    };
    ob.load();
    
    
    $rootScope.$digest();
    expect(ob.firstLoad).not.toBeTruthy();
    expect(ob.items.length).toBe(2);
    expect(ob.totalCount).toBe(2);
    expect(ob.token).toBe('abcd');
  });
});
