var config = {
    version : '1.8.19', //Fixed auth_token in fetch2()
    debug   : true,
    env     : process.env.NODE_ENV,
    matt_dev: {
      base_dir	: '/Users/mattfox12/Documents/Sodo/Ease/app',
      port			: 3001,
      base_url  : 'http://app.dev.withease.io:3000/'
    }
};

module.exports = config;
