var config = {
	version	      : '1.8.60', //if(session_data.user_id && session_data.user_id !== 'false')added to _processing_signup and added spinner for download community tracks
    debug         : true,
    env           : process.env.NODE_ENV,
    matt_dev: {
      base_dir	  : '/Users/mattfox12/Documents/Sodo/Ease/app',
      port			  : 3001,
      base_url    : 'http://app.dev.withease.io:3000/'
    }
};

module.exports = config;
