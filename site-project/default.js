(function($, window, undefined) {

  if ($ === undefined) {
    throw("This site requires jQuery");
  }

  var $window = $(window),
      $document = $(window.document),
      name = 'project',
      version = '0.0.1';

  /*
   * Project setup
   */

  $.ProjectName = (function() {
    var self = function(fn) {
          if (typeof fn === 'function') {
            fn.apply(self, [ $, window ]);
          }
          return self;
        };

    self.extend =  function(methods) {
      $.extend(self, methods);
    };

    return self;
  }());


  $.ProjectName(function() {
    var self = this;

    self.name = name;
    self.version = version;


    /*
     * Trigger deferred code on DOM ready or after 1000ms
     */

    var _triggerDeferredCalled,
        _triggerDeferred = function() {
          if (!_triggerDeferredCalled) {
            _triggerDeferredCalled = true;
            clearTimeout(_triggerTimeout);
            $window.trigger(self.name+':ready');
          }
        },
        _triggerTimeout = setTimeout(_triggerDeferred, 1000);

    $document.ready(_triggerDeferred);
    //$window.on('load', _triggerDeferred);

    self.extend({

      defer: function(fn) {
        var callback = function() { self(fn); };
        if (_triggerDeferredCalled) {
          setTimeout(callback, 0);
        }else{
          $window.on(self.name+':ready', callback);
        }

      }

    });

  });


  /*
   * Extend the project with custom methods
   */

  $.ProjectName.extend({

    foo: function() {
      return 'bar';
    }

  });


  /*
   * Testing deferred execution
   */

  $.ProjectName.defer(function() {
    //console.log('deferred code executed', this, arguments);
  });


}(jQuery, window));
