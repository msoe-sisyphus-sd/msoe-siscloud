var config = {
  version				: '1.8.57', // Add paint to default patterns, remove RGBW toggle (CSON does it now), remove Chosen library from network selection, Regresion Testing
    debug     : true,
    env       : process.env.NODE_ENV,
    matt_dev: {
      base_dir	: '/Users/mattfox12/Documents/Sodo/Ease/app',
      port			: 3001,
      base_url  : 'http://app.dev.withease.io:3000/'
    }
};

module.exports = config;
