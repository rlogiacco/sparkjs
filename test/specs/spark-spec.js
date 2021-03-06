describe('Spark', function() {
  describe('login', function() {

    describe('with access token', function() {
      it('callback', function() {
        Spark.login({accessToken: 'access_token'}, function(err, data) {
          expect(err).to.eq(null);
          expect(data.accessToken).to.eq('access_token');
          expect(Spark.ready()).to.eq(true);
        });
      });

      it('promise', function() {
        promise = Spark.login({accessToken: 'access_token'});
        return expect(promise).to.be.fulfilled;
      });
    });

    describe('with username/password', function() {
      var subject = function(callback) {
        return Spark.login({username: 'spark', password: 'spark'}, callback);
      };
      var data = {accessToken: 'access_token'};

      shared.behavesLikeAPI('login', subject, data);

      it('sets accessToken correctly');

      it('is ready');
    });
  });

  describe('listDevices', function() {
    var subject = function(callback) {
      Spark.accessToken = 'token';
      return Spark.listDevices(callback);
    };
    var data = [{id: 'id', name: 'sparky'}];

    shared.behavesLikeAPI('listDevices', subject, data);

    it('sets devices correctly');
  });

  describe('getDevice with the id', function() {
    var data = { id: 'id', name: 'sparky' };
    var subject = function(callback) {
      Spark.accessToken = 'token';
      // Not testing the cache, make sure it's not used
      return Spark.getDevice(data.id, callback, false);
    };

    shared.behavesLikeAPI('getDevice', subject, data);

    it('gets a device correctly');
  });

  describe('getDevice with the name', function() {
    var data = { id: 'id', name: 'sparky' };
    var subject = function(callback) {
      Spark.accessToken = 'token';
      // Not testing the cache, make sure it's not used
      return Spark.getDevice(data.name, callback, false);
    };

    shared.behavesLikeAPI('getDevice', subject, data);

    it('gets a device correctly');
  });

  describe('createUser', function() {
    var subject = function(callback) {
      return Spark.createUser('user@gmail.com', 'pass', callback);
    };
    var data = {ok: true};

    it('promise', function() {
      promise = Spark.login({accessToken: 'access_token'});
      return expect(promise).to.be.fulfilled;
    });

    shared.behavesLikeAPI('createUser', subject, data);

    describe('with invalid username', function() {
      it('returns correct error message', function() {
        subject = function(callback) {
          return Spark.createUser('', 'pass', callback);
        };

        shared.behavesLikeError('createUser', subject, 'Username must be an email address.');
      });
    });
  });

  describe('listAccessTokens', function() {
    var subject = function(callback) {
      return Spark.listAccessTokens('user@gmail.com', 'pass', callback);
    };
    var data = [{client:'client', expires_at:'2015-08-24T22:58:13.072Z', token:'token'}];

    shared.behavesLikeAPI('listAccessTokens', subject, data);
  });

  describe('removeAccessToken', function() {
    var subject = function(callback) {
      return Spark.removeAccessToken('user@gmail.com', 'pass', 'access_token', callback);
    };
    var data = {ok: true};

    shared.behavesLikeAPI('removeAccessToken', subject, data);
  });

  describe('claimCore', function() {
    var subject = function(callback) {
      Spark.accessToken = 'token';
      return Spark.claimCore('core_id', callback);
    };
    var data = {
      access_token: 'access_token',
      token_type: 'bearer',
      expires_in: 7776000
    };

    shared.behavesLikeAPI('claimCore', subject, data);
  });

  describe('removeCore', function() {
    var subject = function(callback) {
      Spark.accessToken = 'token';
      return Spark.removeCore('core_id', callback);
    };
    var data = {ok: true};

    shared.behavesLikeAPI('removeCore', subject, data);
  });

  describe('renameCore', function() {
    var subject = function(callback) {
      Spark.accessToken = 'token';
      return Spark.renameCore('core_id', 'new_name', callback);
    };
    var data = {ok: true};

    shared.behavesLikeAPI('renameCore', subject, data);
  });

  describe('getAttributes', function() {
    var subject = function(callback) {
      Spark.accessToken = 'token';
      return Spark.getAttributes('core_id', callback);
    };
    var data = {
      id: 'core_id',
      name: 'name',
      connected: false,
      variables: null,
      functions: null,
      cc3000_patch_version: '1.24',
      requires_deep_update: true
    };

    shared.behavesLikeAPI('getAttributes', subject, data);
  });

  describe('getVariable', function() {
    var subject = function(callback) {
      Spark.accessToken = 'token';
      return Spark.getVariable('core_id', 'var', callback);
    };
    var data = {
      'cmd': 'VarReturn',
      'name': 'var',
      'result': 10,
      'coreInfo': {
        'last_app': '',
        'last_heard': '2014-08-25T16:18:42.534Z',
        'connected': true,
        'deviceID': 'core_id'
      }
    };

    shared.behavesLikeAPI('getVariable', subject, data);
  });

  describe('signalCore', function() {
    var subject = function(callback) {
      Spark.accessToken = 'token';
      return Spark.signalCore('core_id', true, callback);
    };
    var data = {
      id: 'core_id',
      connected: true,
      signaling: true
    };

    shared.behavesLikeAPI('signalCore', subject, data);
  });

  describe('flashCore', function() {
    var subject = function(callback) {
      Spark.accessToken = 'token';
      return Spark.flashCore('core_id', [], callback);
    };
    var data = {
      id: 'core_id',
      status: 'Update started'
    };

    shared.behavesLikeAPI('flashCore', subject, data);
  });

  describe('compileCode', function() {
    var subject = function(callback) {
      Spark.accessToken = 'token';
      return Spark.compileCode([], callback);
    };
    var data = {
      ok: true
    };

    shared.behavesLikeAPI('compileCode', subject, data);
  });

  describe('downloadBinary', function() {
    var subject = function(callback) {
      Spark.accessToken = 'token';
      return Spark.downloadBinary('/v1/algo/123456789', 'file', callback);
    };
    var data = {
      ok: true
    };

    shared.behavesLikeAPI('downloadBinary', subject, data);
    it('writes file correctly')
  });

  describe('sendPublicKey', function() {
    var subject = function(callback) {
      Spark.accessToken = 'token';
      return Spark.sendPublicKey('core_id', 'buffer', callback);
    };
    var data = {
      ok: true
    };

    shared.behavesLikeAPI('sendPublicKey', subject, data);
    it('writes file correctly')
  });

  describe('callFunction', function() {
    var subject = function(callback) {
      Spark.accessToken = 'token';
      return Spark.callFunction('core_id', 'function', 'arg', callback);
    };
    var data = {
      id: 'core_id',
      name: 'core_name',
      last_app: 'last_app',
      connected: true,
      return_value: 42
    };

    shared.behavesLikeAPI('callFunction', subject, data);
  });

  describe('getEventStream', function() {
    var request;

    afterEach(function() {
      request.restore();
    });

    it('executes call to spark api', function() {
      request = sinon.stub(Spark.api, 'getEventStream')

      Spark.getEventStream(false);
      return expect(request).to.be.calledOnce;
    });

    it('passes the callback to the spark API', function() {
      request = sinon.stub(Spark.api, 'getEventStream');

      Spark.getEventStream();
      expect(request).to.be.calledWith(sinon.match.any, sinon.match.any, sinon.match.string, sinon.match.func);
    });

    describe('Processor', function() {
      it('processes data sent in multiple chunks', function(done) {
        var data = [
          'event: test\n',
          'data: {"data":"1,-50.0","ttl":',
          '60,"published_at":"2016-01-20T00:20:15.241Z","coreid":"001"}\n'
        ];
        var processor = Spark._createStreamProcessor();

        processor.onDataReady = function(e) {
          try {
            expect(e).to.deep.equal({ name: 'test', data: '1,-50.0', ttl: 60, published_at: '2016-01-20T00:20:15.241Z', coreid: '001' });
            done();
          } catch (ex) {
            done(ex);
          }
        };

        data.forEach(function(d) {
          processor.onData(d);
        });
      });

      it('processes multiple events sent in the same chunk', function(done) {
        var data = [
          'event: abcd\ndata: {"data":"woo","ttl":60,"published_at":"2016-01-20T00:20:13.241Z","coreid":"001"}\nevent: test\ndata: {"data":"1,-50.0","ttl":60,"published_at":"2016-01-20T00:20:15.241Z","coreid":"001"}\n'
        ];
        var processor = Spark._createStreamProcessor();

        var eventCount = 0;
        processor.onDataReady = function(e) {
          try {
            if (eventCount === 0) {
              expect(e).to.deep.equal({ name: 'abcd', data: 'woo', ttl: 60, published_at: '2016-01-20T00:20:13.241Z', coreid: '001' });
            } else if (eventCount === 1) {
              expect(e).to.deep.equal({ name: 'test', data: '1,-50.0', ttl: 60, published_at: '2016-01-20T00:20:15.241Z', coreid: '001' });
              done();
            }
            eventCount++;
          } catch (ex) {
            done(ex);
          }
        };

        data.forEach(function(d) {
          processor.onData(d);
        });
      });

      it('processes data sent in multiple chunks after a single line event', function(done) {
        var data = [
          'event: abcd\n',
          'data: {"data":"woo","ttl":60,"published_at":"2016-01-20T00:20:13.241Z","coreid":"001"}\n',
          'event: test\n',
          'data: {"data":"1,-50.0","ttl":',
          '60,"published_at":"2016-01-20T00:20:15.241Z","coreid":"001"}\n'
        ];
        var processor = Spark._createStreamProcessor();

        var eventCount = 0;
        processor.onDataReady = function(e) {
          try {
            if (eventCount === 0) {
              expect(e).to.deep.equal({ name: 'abcd', data: 'woo', ttl: 60, published_at: '2016-01-20T00:20:13.241Z', coreid: '001' });
            } else if (eventCount === 1) {
              expect(e).to.deep.equal({ name: 'test', data: '1,-50.0', ttl: 60, published_at: '2016-01-20T00:20:15.241Z', coreid: '001' });
              done();
            }
            eventCount++;
          } catch (ex) {
            done(ex);
          }
        };

        data.forEach(function(d) {
          processor.onData(d);
        });
      });
    });
  });

  describe('getAttributesForAll', function() {
    var data = [ {id: '1', name: 'sparki'} ];
    var device = new Device(data[0], Spark);

    shared.stubRequest('listDevices', null, data);

    it('returns devices attributes', function() {
      subject = function() {
        return Spark.getAttributesForAll();
      }
      return expect(subject()).to.eventually.become([device]);
    });
  });

  describe('publishEvent', function() {
    var subject = function(callback) {
      Spark.accessToken = 'token';
      return Spark.publishEvent('event_name', 'data', callback);
    };
    var data = {
      ok: true,
    };

    shared.behavesLikeAPI('publishEvent', subject, data);
  });

  describe('createWebhook', function() {
    var subject = function(callback) {
      Spark.accessToken = 'token';
      return Spark.createWebhook('event_name', 'url', 'core_id', callback);
    };
    var data = {
      ok: true,
    };

    shared.behavesLikeAPI('createWebhook', subject, data);
  });

  describe('deleteWebhook', function() {
    var subject = function(callback) {
      Spark.accessToken = 'token';
      return Spark.deleteWebhook('hook_id', callback);
    };
    var data = {
      ok: true,
    };

    shared.behavesLikeAPI('deleteWebhook', subject, data);
  });

  describe('listWebhooks', function() {
    var subject = function(callback) {
      Spark.accessToken = 'token';
      return Spark.listWebhooks(callback);
    };
    var data = [];

    shared.behavesLikeAPI('listWebhooks', subject, data);
  });
});
