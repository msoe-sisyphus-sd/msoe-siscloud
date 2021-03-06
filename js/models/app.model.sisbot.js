app.model.sisbot = {
	polling_timeout: null,
	_retry_find: false,
	_listeners_set: false, // are the listeners active?
	defaults: function (data) {
		var obj = {
			id				: data.id,
			type			: 'sisbot',

			passcode_entry	: 'false', // for user to enter passcode
			new_passcode		: 'false', // for entering a new passcode
			passcode_confirmed	: 'false', // prove passcode before changing
			passcode_error	: 'false', // shake input
			show_passcode		: 'false',

			wifi_networks   : [],
			wifi   : {
				name				: '',
				password		: ''
			},
			wifi_error: 'false',
			wifi_connecting: 'false',
			fetching_cloud: 'false',
			show_wifi_list: 'false',
			input_ssid: 'false', // manually type ssid
			show_password: 'false',

			is_master_branch: 'false',
			is_legacy_branch: 'false',

			branch_labels: 'false',
			local_branches: {
				proxy: 'master',
				app: 'master',
				api: 'master',
				sisbot: 'master',
			},
			sisbot_version: 0, // number based on local_branches.sisbot value
			local_versions: {
				proxy: '-',
				app: '-',
				api: '-',
				sisbot: '-',
			},
			remote_versions: {
				proxy: '-',
				app: '-',
				api: '-',
				sisbot: '-',
			},

			csons: 'false', // available cson files

			has_software_update: 'false',
			is_connected: false,
			is_socket_connected: 'false',
			is_polling: 'true',
			is_polling_waiting: 'false', // is in wait to start polling
			polling_delay: 30, // seconds to wait before polling on restart/reboot
			wifi_polling_delay: 15, // seconds to wait before polling on join network
			is_jogging: false,
			jog_type: '',
			updating_hostname: 'false',
			updating_tablename: 'false',

			timestamp: 'false',

			is_firmware_update_available: 'false',
			force_onboarding: 'false',

			default_playlist_id: 'false',

			default_settings: {},
			default_settings_error: 'false',

			// log_date						: moment().format('MM/DD/YYYY'),
			// log_type						: 'sisbot',		// sisbot|plotter|proxy
			log_file: 'false', // currently selected for download
			log_files: [],
			uploading_track: 'false',
			regenerating_thumbnails: 'false',

			wait_for_send: 'false', // don't send request before hearing response

			rem_pattern: 'false',
			rem_primary_color: '0xFFFFFFFF',
			rem_secondary_color: '0x00FFFFFF',
			show_picker: 'true',

			rem_alert_color: '#FFA500FF',
			rem_angry_color: '#FF0000FF',
			rem_calm_color: '#00CD00FF',
			rem_disgust_color: '#800080FF',
			rem_happy_color: '#FFFF00FF',
			rem_neutral_color: '#FFF1E0FF',
			rem_relaxed_color: '#00A5FFFF',
			rem_sad_color: '#0000FFFF',

			track_total_time: 0,
			track_remaining_time: 0,
			remaining_time_str: '0:00', // time left in current track
			past_time_str: '0:00', // time past on current track
			track_time_percent: 0,

			edit: {},
			data: {
				id: data.id,
				type: 'sisbot',
				version: this.current_version,

				passcode: 'false',

				name: 'Default Name',
				timezone_offset: '0',					// 0 greenwich
				hostname: 'false',				// sisyphus.local
				local_ip: '',					// 192.168.0.1:3001
				mac_address: 'false',              // set to false if no data comes from sisbot
				do_not_remind: 'false',				// wifi
				hostname_prompt: 'false',				// hostname change

				reason_unavailable: 'false',				// connect_to_wifi|reset_to_hotspot|resetting|restarting|rebooting|shutdown
				installing_updates: 'false',
				update_status: 'false', 			// knowing where in the software update process we are
				update_text: 'false', 			// more info about what is going on in the update
				factory_resetting: 'false',
				fault_status: 'false', // allows for navigation after Servo fault
				corruption_status: 'false', // check if fs was corrupted (and fixed)

				pi_id: '',
				firmware_version: '0.5.1',

				is_hotspot: 'true',

				is_network_separate: 'false',
				is_internet_connected: 'false',
				is_network_connected: 'false',
				is_network_separate: 'false',
				input_network: 'false',
				wifi_network: '',
				wifi_password: '',
				failed_to_connect_to_wifi: 'false',
				wifi_forget: 'false',

				playlist_ids: [],
				default_playlist_id: 'false',
				favorite_playlist_id: 'false',
				all_tracks_playlist_id: 'false',
				track_ids: [],

				active_playlist_id: 'false',
				active_track_id: 'false',
				active_track: 'false',
				thumbnail_queue_length: 0,	// how many thumbnails are waiting to be generated

				current_time: 0,					// seconds

				state: 'waiting',			// playing|homing|paused|waiting

				is_homed: 'false',				// Not used
				is_serial_open: 'true',				// Not used
				is_servo: 'false', 				//setting for alert()'s

				is_shuffle: 'true',
				is_loop: 'false',
				brightness: 0.8,
				speed: 0.3,
				is_autodim_allowed: 'true',
				is_autodim: 'true',
				is_nightlight: 'false',
				is_play_on_wake: 'false',
				is_sleeping: 'false',
				timezone_offset: moment().format('Z'),
				nightlight_brightness: 0.2,
				sleep_time: '10:00 PM',					// 10:00 PM sleep_time
				wake_time: '8:00 AM',					// 8:00 AM  wake_time

				is_calculating_track_time: 'false',
				is_paused_between_tracks: 'false', // do we wait when hitting the end of a track
				is_paused_time_enabled: 'false',
				paused_track_time: 15, // this is minutes
				is_waiting_between_tracks: 'false', // table is currently paused after a track finish
				share_log_files: 'false',
				is_mood_lighting: 'false',

				cson: 'false',
				is_cson_missing: 'false', // assume it is set, table will override
				table_settings: {}, // Advanced table settings, overrides CSON on reboot

				led_enabled: 'false',
				led_pattern_ids: ['white', 'solid', 'fade', 'spread', 'comet', 'rainbow', 'paint', 'demo'],
				led_pattern: 'white',
				led_offset: 0,
				led_primary_color: '0xFFFFFFFF', // Hex
				led_secondary_color: '0x00FFFFFF', // Hex

				mood_alert_color: '#FFA500FF',
				mood_angry_color: '#FF0000FF',
				mood_calm_color: '#00CD00FF',
				mood_disgust_color: '#800080FF',
				mood_happy_color: '#FFFF00FF',
				mood_neutral_color: '#FFF1E0FF',
				mood_relaxed_color: '#00A5FFFF',
				mood_sad_color: '#0000FFFF',

				mood_alert_color_text: 'white',
				mood_angry_color_text: 'white',
				mood_calm_color_text: 'white',
				mood_disgust_color_text: 'white',
				mood_happy_color_text: 'black',
				mood_neutral_color_text: 'black',
				mood_relaxed_color_text: 'white',
				mood_sad_color_text: 'white'
			}
		};

		return obj;
	},
	current_version: 1,
	polling_timeout: null, // setTimeout before polling on restart/reboot
	ignore_errors: [], // 'Unable to load network list'
	getting_wifi: false, // throttle multiple requests to get_wifi
	sisbot_listeners: function () {
		if (this._listeners_set) return; // don't set more than once

		this.listenTo(app, 'sisbot:update_playlist', this.update_playlist);
		this.listenTo(app, 'sisbot:set_track', this.set_track);
		this.listenTo(app, 'sisbot:save', this.save_to_sisbot);
		this.listenTo(app, 'sisbot:playlist_add', this.playlist_add);
		this.listenTo(app, 'sisbot:playlist_remove', this.playlist_remove);
		this.listenTo(app, 'sisbot:track_add', this.track_add);
		this.listenTo(app, 'sisbot:track_remove', this.track_remove);

		this.listenTo(app, 'socket:connect', this._socket_connect);
		this.listenTo(app, 'socket:reconnect', this._socket_connect);
		this.listenTo(app, 'socket:disconnect', this._socket_disconnect);
		this.listenTo(app, 'socket:error', this._socket_error);

		// this.on('change:data.is_serial_open', 				this._check_serial);
		this.on('change:data.state', this.state_change);
		this.on('change:data.failed_to_connect_to_wifi', this.wifi_failed_to_connect);
		this.on('change:data.is_network_connected', this.wifi_connected);
		this.on('change:data.wifi_forget', this.wifi_connected);
		this.on('change:data.installing_updates', this.check_force_onboarding);
		this.on('change:data.installing_updates', this.install_updates_change);
		this.on('change:data.is_sleeping', this.nightmode_sleep_change);
		this.on('change:data.software_version', this.check_for_version_update);
		this.on('change:data.reason_unavailable', this.check_for_unavailable);
		this.on('change:data', this.nightmode_sleep_change);

		this.on('change:data.active_track', this.active_track_change);

		this.on('change:data.is_calculating_track_time', this.update_calculating);

		this.on('change:data.update_status', this.check_for_update_failure);

		this.on('change:edit.is_paused_between_tracks', this.pause_between_tracks);
		this.on('change:edit.is_paused_time_enabled', this.pause_between_tracks);
		this.on('change:edit.paused_track_time', this.pause_between_tracks);

		this.on('change:data.is_paused_between_tracks', this.pause_time_change);
		this.on('change:data.is_paused_time_enabled', this.pause_time_change);
		this.on('change:data.paused_track_time', this.pause_time_change);

		this.on('change:data.is_mood_lighting', this.toggle_mood_lighting);

		this.on('change:edit.led_pattern', this._change_led_pattern);
		this.on('change:data.led_pattern', this.led_pattern_change);

		if (this.get('data.is_network_separate') == 'false') {
			this.update_network();
			this.on('change:data.is_network_connected', this.update_network);
			this.on('change:data.is_internet_connected', this.update_network);
			this.on('change:is_network_separate', this.update_network);
		}

		if (this.get('data.favorite_playlist_id') == 'false' || app.collection.get(this.get('data.favorite_playlist_id')) == undefined)
			this.setup_favorite_playlist();

		if (this.get('data.failed_to_connect_to_wifi') == 'true')
			this.wifi_failed_to_connect();

		if (this.get('data.installing_updates') == 'true')
			this.install_updates_change();

		if (this.get('data.is_sleeping') == 'true')
			this.nightmode_sleep_change();

		if (this.get('data.sleep_time') == 'false') // fix is_sleep_enabled toggle
			this.set('data.is_sleep_enabled', 'false');

		if (this.get('data.led_pattern') != 'false') {
			this.setup_edit();
			this._update_pattern_colors();
		}

    // listen for changing page
		this.listenTo(app, 'app:is_visible', this.check_track_time);
		this.on('change:data.state', this.check_track_time);
		this.listenTo(app.session, 'change:active', this.stop_track_time);

		this._poll_state();

		this._listeners_set = true;
	},
	clear_listeners: function () {
		this.stopListening();

		this._listeners_set = false;
	},
	state_change: function() {
		// app.log("Sisbot state changed", this.id, this.get('data.state'));
		app.trigger('sisbot:state_change',{
			'state': this.get('data.state')
		});
	},
	update_network: function () {
		if (this.get('data.is_network_separate') == 'false') {
			this.set('data.is_network_connected', this.get('data.is_internet_connected'));
		} else {
			this.off('change:data.is_internet_connected', this.update_network);
			this.off('change:data.is_network_separate', this.update_network);
		}
	},
	after_export: function () {
		app.current_session().set_active({ sisbot_id: 'false' });
	},
	_update_sisbot_msg: function (obj) {
		this._update_sisbot(obj.endpoint, obj.data, obj.cb);
	},
	_fetch_log: function (data) {
		app.log("_fetch_log()");
		var data = this.get('data');
		var obj = {
			// _url	:  app.config.get_sisbot_url(),
			_type: 'POST',
			_timeout: 60000,
			endpoint: 'get_log',
			data: data
		};

		app.log("Fetch log", obj);
		// app.post.fetch(obj, function(resp) {
		// 	// handle cloud differently
		// }, 0);
	},
	update_network: function () {
		if (this.get('data.is_network_separate') == 'false') {
			this.set('data.is_network_connected', this.get('data.is_internet_connected'));
		} else {
			this.off('change:data.is_internet_connected', this.update_network);
			this.off('change:data.is_network_separate', this.update_network);
		}
		app.log('in the update_network', this.get('data.is_network_separate'), this.get('data.is_internet_connected'),
			this.get('data.is_network_connected'));

	},
	present_siri: function (data) {
		var self = this;

		app.log("Present Siri", data);
		// TESTING: Siri shortcut
		if (data && app.is_app && app.platform == 'iOS') {

			if (!cordova) return; // exit for testing
			if (!data.action) return app.log("Siri: Missing Action");
			if (!data.phrase) return app.log("Siri: Missing Phrase");

			var info_obj = {
				model: self.id,
				action: data.action
			};
			if (data.msg) info_obj.msg = data.msg;
			var identifier = self.id + '_' + data.action;
			if (data.identifier) identifier = self.id + '_' + data.identifier;

			var present_data = {
				persistentIdentifier: identifier,
				title: data.phrase,
				suggestedInvocationPhrase: self.get('data.name') + ' ' + data.phrase,
				userInfo: info_obj
			};

			app.log("Siri: Present", JSON.stringify(present_data));
			cordova.plugins.SiriShortcuts.present(present_data, function (resp) {
				app.log("Siri: Successful Presented Shortcut", resp);
			}, function (err) {
				app.log("Siri: Presented Shortcut Error", err);
			});
		}
	},
	_donate_siri: function (data) {
		var self = this;

		// TESTING: Siri shortcut
		if (data && app.is_app && app.platform == 'iOS') {

			if (!data.action) return app.log("Siri: Missing Action");
			if (!data.phrase) return app.log("Siri: Missing Phrase");

			var info_obj = {
				model: self.id,
				action: data.action
			};
			if (data.msg) info_obj.msg = data.msg;
			var identifier = self.id + '_' + data.action;
			if (data.identifier) identifier = self.id + '_' + data.identifier;

			var donate_data = {
				persistentIdentifier: identifier,
				title: data.phrase,
				suggestedInvocationPhrase: self.get('data.name') + ' ' + data.phrase,
				userInfo: info_obj
			};

			app.log("Siri: Donate", JSON.stringify(donate_data));
			cordova.plugins.SiriShortcuts.donate(donate_data, function (resp) {
				app.log("Siri: Successful Donated Shortcut", resp);
			}, function (err) {
				app.log("Siri: Donated Shortcut Error", err);
			});
		}
	},
	_update_sisbot: function (endpoint, data, cb, _timeout) {
		// app.log("_update_sisbot()", endpoint, JSON.stringify(data));
		if (!_timeout) _timeout = 5000;

		if (app.config.env == 'alpha') {
			app.log('ALPHA is_internet_connected ==', this.get('data.is_internet_connected'));
			this.set('data.is_internet_connected', 'true'); //setting to true for Apple to test Community
			return cb({ err: null, resp: this.get('data') });
		}

		var self = this;
		var address = this.get('data.local_ip');

		// app.log("_update_sisbot()", address);

		// if (app.platform == 'iOS')	address = this.get('data.hostname');
		// 192.168.42.1 | iOS | state

		var obj = {
			_url: 'http://' + address + '/',
			_type: 'POST',
			_timeout: _timeout,
			endpoint: 'sisbot/' + endpoint,
			data: data
		};
		app.post.fetch(obj, function (resp) {
			if (resp.err == 'Could not make request' && app.config.env !== 'alpha') {
				self._poll_failure();
				if (cb) cb(resp);
			} else {
				if (resp.err) {
					// alert error if it is not in the list of errors to ignore
					if (self.ignore_errors.indexOf(resp.err) < 0) app.plugins.n.notification.alert(resp.err);

					app.log(address, endpoint, resp);
					if (cb) cb(resp);
					return;
				}

				if (resp.err == null) self.check_for_unavailable();

				self.trigger('change:data.active_track._index');	// fix bug
				if (cb) cb(resp);

				// self._update_cloud(); debugging maybe
			}
		}, 0);
	},
	_check_serial: function () {
		app.log("_check_serial()");

		/* TODO: Fix
		if (this.get('data.is_serial_open') == 'false') {
			if (!this._active) {
				this._active = app.current_session().get('active');
				app.current_session().set('active.primary', 'serial');
			}
		} else {
			if (this._active) {
				app.current_session().set('active', this._active);
				this._active = false;
			}
		}
		*/
	},
	_update_timestamp: function () {
		// app.log("_update_timestamp()");
		this.set('timestamp', '' + Date.now());
		// app.log("Update Timestamp", ''+Date.now(), this.get('timestamp'));
	},
	check_for_update_failure: function() {
		if (this.get('data.update_status') == 'Failure') {
			// Show failure notice modal
			app.trigger('modal:open', {
				'template': 'modal-software-update-failure-tmp'
			});
		}
	},
	/**************************** sockets ********************************/
	_socket_connect: function () {
		var self = this;

		app.log("Sisbot: Socket Connect");

		this.set('is_socket_connected', 'true');
		this.set('is_polling', "false");

		clearTimeout(this.polling_timeout);

		self.check_for_unavailable();

		this.wifi_connected();

		// setTimeout(function() {
		// 	self._update_sisbot('state', {}, function (obj) {
		// 		if (obj.resp) app.manager.intake_data(obj.resp);
		// 	});
		// }, 10000);
	},
	_socket_disconnect: function () {
		// app.log("_socket_disconnect()");
		this.set('is_socket_connected', 'false');

		var self = this;
		// app.log("Sisbot: Socket Disconnect");

		app.log('Sisbot: socket disconnect', this.get('data.reason_unavailable'));

		// don't poll if document is in background
		if (app.is_visible && this.get('is_polling') == "false") {
			app.log('Sisbot: start polling (disconnect)', self.get('data.reason_unavailable'));

			// TODO: delay polling if reason_unavailable is resetting/restarting/rebooting
			var timeout = 500;
			var reason = self.get('data.reason_unavailable');
			if (reason == 'resetting' || reason == 'restarting' || reason == 'rebooting' || reason == 'shutdown') {
				timeout = self.get('polling_delay') * 1000;
				if (reason == 'rebooting') timeout *= 2; // make twice as long if full reboot
				self.set('is_polling_waiting', 'true');
			} else if (reason == 'connect_to_wifi' || reason == 'reset_to_hotspot') {
				timeout = self.get('wifi_polling_delay') * 1000;
				self.set('is_polling_waiting', 'true');
			}

			self.polling_timeout = setTimeout(function () {
				app.log('Sisbot: start polling (after timeout)', self.get('data.reason_unavailable'));
				self.set('is_polling_waiting', 'false');
				self.set('is_polling', "true");
				self._poll_state();
			}, timeout);
		}
	},
	_socket_error: function (data) {
		app.log("Sisbot: Socket Error", data);
		if (app.is_visible && this.get('is_polling') == "false") {
			app.log('Sisbot: start polling (error)');
			this.set('is_polling', "true");
			this._poll_state();
		}
	},
	/**************************** POLLING *************************************/
	_poll_timer: false,
	_poll_failure: function () {
		// app.log("_poll_failure()");
		if (this._poll_timer == false) {
			this._poll_timer = moment();
			this._retry_find = true;
		}

		var disconnect_length = moment().diff(this._poll_timer);
		this.set('disconnect_length', disconnect_length);

		if (this.get('data.reason_unavailable') != 'rebooting' && app.manager.get('did_update') == 'false' && this._retry_find && disconnect_length > 20000) { // extended to catch the fallback to hotspot
			app.log("Poll Failure, find_sisbots()", disconnect_length, this.get('data.reason_unavailable'));

			app.manager.set('is_sisbot_available', 'false'); // table can't be found, go to unavailable page

			app.manager.find_sisbots(); // Try to find any tables again

			this._retry_find = false; // don't bother more than once
		}

		if (this.get('data.reason_unavailable') == 'rebooting' || this.get('data.installing_updates') == 'true' || this.get('data.wifi_forget') == 'true' || this.get('data.factory_resetting') == 'true') {
			// extended stop timeout in this case
			if (disconnect_length > app.config.extended_timeout_to_stop_polling) {
				app.log("Extended Stop polling", disconnect_length, this.get('data.reason_unavailable'));
				this._poll_failure_stop();
			}
		} else { // shorter timeout otherwise
			if (this.get('data.installing_updates') == 'true' || this.get('data.wifi_forget') == 'true' || this.get('data.factory_resetting') == 'true') {
				// do nothing.. We haven't timed out
			} else if (this.is_legacy() == true && disconnect_length > 10000) {
				this._poll_failure_stop();
			} else if (this.is_legacy() == false && disconnect_length > app.config.disconnect_timeout_to_stop_polling) {
				if (this.get('is_socket_connected') == 'true') {
					// we have polling from old requests that have timed out after socket reconnected. Ignore
				} else {
					app.log("Stop polling", disconnect_length, this.get('data.reason_unavailable'));
					this._poll_failure_stop();
				}
			}
		}

		return this;
	},
	_poll_failure_stop: function () {
		app.log("_poll_failure_stop()");
		if (this._poll_then_reset_bool == true) {
			window.location.reload();
		}
		this.set('is_polling', 'false');
		app.manager.set('is_sisbot_available', 'false')
			.set('sisbot_reconnecting', 'false');
	},
	_poll_restart: function () {
		app.log("_poll_restart()");
		this._poll_timer = false;
		this.set('is_polling', 'true');
		this._poll_state();
	},
	_poll_then_reset_bool: false,
	_poll_then_reset: function () {
		// app.log("_poll_then_reset()");
		this._poll_then_reset_bool = true;
		this._poll_restart();
	},
	_poll_state: function () {
		// app.log("_poll_state()");
		var self = this;

		if (app.config.env == 'alpha') {
			// FOR APPLE TESTING...
			app.manager.set('is_sisbot_available', 'true');
			this.set('data.is_internet_connected', 'true');
			return this;
		}

		// skip polling if this is not the currently connected bot
		if (app.manager.get('sisbot_id') != this.id) return this.set('is_polling', 'false');
		if (this.get('data.local_ip') == '') return this.set('is_polling', 'false');

		if (this.get('is_master_branch') == 'false') app.log("Get State: ", app.manager.get('is_sisbot_available'), this.get('is_polling'));

		this._update_sisbot('state', {}, function (obj) {
			if (obj.resp) {
				self._poll_timer = false;

				// clear values in case it was waiting
				clearTimeout(self.polling_timeout);
				self.set('is_polling_waiting', 'false');

				self.check_for_unavailable();

				app.manager.intake_data(obj.resp);
				if (self.get('is_polling') == "true") {
					app.log("Reconnected:", self.get('data.local_ip'));
					app.config.set_sisbot_url(self.get('data.local_ip'));
					app.socket.initialize();		// try to connect to socket
				}
			} else if (obj.err) {
				self._poll_failure();
			}
		}, 500);

		if (this.get('is_polling') == "true") {
			this.polling_timeout = setTimeout(function () {
				self._poll_state();
			}, 1000);
		}

		return this;
	},
	/**************************** TIME *******************************************/
	track_time_interval: null,
	is_requesting_track_time: false,
	get_track_time: function(data) {
		var self = this;

		if (parseInt(this.get('sisbot_version')) < 1010072) return app.log("API endpoint not available: get_track_time", this.get('sisbot_version'));
		if (this.is_requesting_track_time) return app.log("...waiting for response from get_track_time");

		app.log("Get Track Time", Date.now(), data);
		var send_data = {};
		if (data && data.clear_cache) send_data = {clear_cache: data.clear_cache};

		this.is_requesting_track_time = true;
		this._update_sisbot('get_track_time', send_data, function(obj) {
			self.is_requesting_track_time = false;

			if (obj.err) return app.log("Get Track Time error", obj.err);

			if (obj.resp) {
				app.log("Track time:", obj.resp);

				var total_time = Math.round(obj.resp.total_time/1000);
				self.set('track_total_time', total_time);

				var remaining_time = Math.round(obj.resp.remaining_time/1000);
				self.set('track_remaining_time', remaining_time);

				self.update_track_time();

				clearInterval(self.track_time_interval);
				if (self.get('data.state') == 'playing' && remaining_time > 0) {
					self.track_time_interval = setInterval(function() {
						if (self.get('data.state') == 'playing') {
							var remaining_time = self.get('track_remaining_time');
							remaining_time--;
							if (remaining_time < 0) {
								remaining_time = 0;
								// self.check_track_time();

								// clear cache and get time
								app.log("Clear cache!");
								clearInterval(self.track_time_interval);
								self.get_track_time({clear_cache: true});
							}

							self.set('track_remaining_time', remaining_time);

							self.update_track_time();
						}
					}, 1000);
				} else {
					if (self.get('data.is_waiting_between_tracks') == 'true') {
						app.log("Finished track, set remaining time to zero", self.get('track_remaining_time'), moment().format('x'));

						self.set('track_remaining_time', 0);
						self.update_track_time();
					}

					app.log("Don't update track time", self.get('data.state'), remaining_time);
					// self.get_track_time({clear_cache: true});
				}
			} else {
				// No err, no resp: calculating already in progress, wait for socket message
				if (parseInt(self.get('sisbot_version')) >= 1010079) {
					self.set('data.is_calculating_track_time', 'true');
					app.log("Currently calculating, wait to show values");
				} else { // maintain old functionality
					setTimeout(function() {
						self.get_track_time(data);
					}, 2000);
				}
			}
		});
	},
	check_track_time: function() {
		if (app.is_visible) {
			app.log("Check Track Time", app.session.get('active.primary'));
			if ((this.get('data.state') == 'playing' || this.get('data.state') == 'waiting') && app.session.get('active.primary') == 'current') {
				this.get_track_time();
			};
		} else clearInterval(this.track_time_interval);
	},
	stop_track_time: function() {
		var primary = app.session.get('active.primary');
		if (primary != 'current') {
			// app.log("Stop track_time_interval", primary);
			clearInterval(this.track_time_interval);
		}
	},
	update_calculating: function() {
		var is_calculating_track_time = this.get('data.is_calculating_track_time');
		if (is_calculating_track_time != 'true') this.get_track_time();
	},
	update_track_time: function() {
		var self = this;

		var total_time = this.get('track_total_time');
		var remaining_time = this.get('track_remaining_time');
		if (remaining_time < 0) remaining_time = 0;

		var remaining_hours = Math.floor(remaining_time/3600);
		var remaining_minutes = Math.floor(remaining_time/60) - remaining_hours * 60;
		var remaining_seconds = Math.floor(remaining_time) - remaining_hours * 3600 - remaining_minutes * 60;
		var remaining_str = "";
		if (remaining_hours > 0) remaining_str += remaining_hours+":";
		if (remaining_minutes < 10) remaining_str += "0";
		remaining_str += remaining_minutes+":";
		if (remaining_seconds < 10) remaining_str += "0";
		remaining_str += remaining_seconds;
		// app.log("Remaining:", remaining_time, remaining_str);
		self.set('remaining_time_str', remaining_str);

		var past_time = total_time - remaining_time;
		var past_hours = Math.floor(past_time/3600);
		var past_minutes = Math.floor(past_time/60) - past_hours * 60;
		var past_seconds = Math.floor(past_time) - past_hours * 3600 - past_minutes * 60;
		var past_str = "";
		if (past_hours > 0) past_str += past_hours+":";
		if (past_minutes < 10) past_str += "0";
		past_str += past_minutes+":";
		if (past_seconds < 10) past_str += "0";
		past_str += past_seconds;
		// app.log("Past:", past_time, past_str);
		self.set('past_time_str', past_str);

		// calc percent for progress bar
		self.set('track_time_percent', Math.round(past_time/total_time*100));

		// app.log("Updated track time", this.get('data.is_calculating_track_time'), past_str, past_time, total_time, Math.round(past_time/total_time*100));
	},
	/**************************** PASSCODE ***************************************/
	enter_passcode: function () {
		this.set('passcode_error', 'false');

		app.trigger('modal:open', {
			'template': 'modal-enter-passcode-tmp'
		});
	},
	confirm_passcode: function () { // for changing the passcode in Settings
		// clear errors
		this.set('errors', []);

		this.set('passcode_error', 'false');

		var passcode = this.get('data.passcode');
		var new_passcode = this.get('new_passcode');
		if (passcode != 'false' || (new_passcode != 'false' && new_passcode != '')) {
			this.set('passcode_confirmed', 'false')
				.set('passcode_entry', 'false');

			app.trigger('modal:open', {
				'template': 'modal-enter-passcode-tmp'
			});
		} else {
			this.set('passcode_confirmed', 'true')
				.set('passcode_entry', 'false');
		}
	},
	save_passcode: function () {
		var self = this;
		var passcode_entry = this.get('new_passcode');
		var show_passcode = this.get('show_passcode');

		// clear errors
		this.set('errors', []);

		var do_save = false;

		var regex = /^[0-9a-zA-Z_]+$/;
		var is_match = passcode_entry.match(regex);

		app.log("Passcode test", passcode_entry, is_match);

		if (passcode_entry == '' && this.get('data.passcode') != 'false') {
			app.plugins.n.notification.confirm("Do you want to remove the passcode from your Sisyphus?",
				function (resp_num) {
					if (resp_num == 1) {
						return self;
					} else {
						self._save_passcode();
					}
				}, 'No Passcode?', ['Cancel', 'Yes']);
		} else if (!is_match) {
			this.add('errors', 'Passcode contains invalid characters, please use alphanumeric and underscores');
		} else if (passcode_entry.length < 8) {
			this.add('errors', 'Passcode too short, must be 8 or more characters');
		} else if (passcode_entry.length >= 8) {
			if (show_passcode == 'true') do_save = true;
			else this.confirm_passcode();
		}
		if (do_save) {
			this._save_passcode();
			app.plugins.n.notification.alert('New Passcode Saved.');
		}
	},
	_save_passcode: function () {
		var self = this;
		var passcode_entry = this.get('new_passcode');
		if (passcode_entry == '') passcode_entry = 'false';
		app.log("Save Passcode", passcode_entry);

		this.set('errors', []);

		var data = this.get('data');
		data.passcode = passcode_entry;

		if (app.config.env == 'alpha') {
			this.set('data.passcode', passcode_entry);
			return app.trigger('session:active', { secondary: 'advanced_settings' });
		}

		this._update_sisbot('save', data, function (obj) {
			if (obj.err) {
				self.set('errors', [obj.err]);
			} else if (obj.resp) {
				app.manager.intake_data(obj.resp);

				self.set('new_passcode', 'false'); // clear edit field

				app.trigger('session:active', { secondary: 'advanced_settings' });
			}
		});
	},
	submit_passcode: function () {
		var passcode_entry = this.get('passcode_entry');
		var new_passcode = this.get('new_passcode');
		var passcode = this.get('data.passcode');

		if (new_passcode != 'false' && new_passcode != passcode) {
			if (passcode_entry == new_passcode) {
				app.manager.set('is_passcode_required', 'false');
				this.set('passcode_confirmed', 'true');
				app.plugins.n.notification.alert('New Passcode Saved.');
				this._save_passcode();
				app.trigger('modal:close');
			} else {
				app.manager.set('is_passcode_required', 'false');
				if (this.get('passcode_confirmed') == 'false') app.plugins.n.notification.alert('New Passcode not confirmed.');
				this.set('passcode_confirmed', 'true');
				this.set('new_passcode', passcode); // reset new_passcode field
				app.trigger('modal:close');
			}
		} else if (passcode_entry == passcode) {
			app.manager.set('is_passcode_required', 'false');
			this.set('passcode_confirmed', 'true');
			this.set('new_passcode', passcode); // update new_passcode field
			app.trigger('modal:close');
		} else {
			this.set('passcode_error', 'false')
				.set('passcode_entry', 'false');
			this.set('passcode_error', 'true');
		}
		app.log("Submit passcode:", passcode_entry, passcode);
	},
	/**************************** ADMIN ***************************************/
	check_for_unavailable: function () {
		// app.log("Check Unavailable", this.get('data.reason_unavailable'));
		if (this.get('data.reason_unavailable') !== 'false') {
			// make sure we say the sisbot is unavailable
			app.manager.set('is_sisbot_available', 'false');

			app.trigger('modal:close');

			// set value for is_polling_waiting right away, so we don't see the buttons for a split second
			var reason = this.get('data.reason_unavailable');
			if (reason == 'resetting' || reason == 'restarting' || reason == 'rebooting' || reason == 'shutdown') {
				this.set('is_polling_waiting', 'true');
			}
		} else {
			app.manager.set('is_sisbot_available', 'true');
		}
	},
	defaults_setup: function () {
		var data = this.get('data');

		var defaults = {
			do_not_remind: 'true',
			timezone_offset: moment().format('Z'),
			name: data.name,
			brightness: data.brightness,
			is_autodim: data.is_autodim,
			share_log_files: 'true',
			is_sleep_enabled: 'true',
			sleep_time: '10:00 PM',
			wake_time: '8:00 AM',
			is_nightlight: data.is_nightlight,
			nightlight_brightness: data.nightlight_brightness,
			is_play_on_wake: 'false'
		}

		this.set('default_settings', defaults);
	},
	defaults_brightness: function (level) {
		this.set('default_settings.brightness', level);
	},
	defaults_nightlight_brightness: function (data) {
		app.log("Defaults nightlight brightness", data);

		this.set('default_settings.nightlight_brightness', +data.value);

		// preview the value
		if (data.preview && data.preview == 'true') this.nightlight_brightness(data);
	},
	defaults_save: function () {
		var self = this;
		var data = this.get('data');
		var reg_data = this.get('default_settings');
		var endpoint = (this.is_legacy()) ? 'stop_wifi_reminder' : 'onboard_complete';

		_.extend(data, reg_data)

		app.manager.set('show_nightlight_page', 'false');

		setTimeout(function () { // add delay in case we are planning to restart.. Makes it appear snappier
			app.trigger('session:active', { secondary: 'false', primary: 'current' });
		}, 2500);

		this._update_sisbot(endpoint, data, function (obj) {
			if (obj.err && obj.err == 'Could not make request') {
				// do nothing
			} else if (obj.resp) {
				app.manager.intake_data(obj.resp);
				self.setup_favorite_playlist();
			}
		});
	},
	get_networks: function () {
		app.log("get_networks()");
		var self = this;
		var wifi_networks = [];
		this.set('show_wifi_list', 'false');
		this.set('input_ssid', 'false');

		if (app.config.env == 'alpha') {
			this.set('wifi_networks', ['test', 'test 2', 'test 3']);
			return this;
		}

		// prevent duplicate sends
		if (this.getting_wifi == true) return this;
		else this.getting_wifi = true;

		this._update_sisbot('get_wifi', { iface: 'wlan0' }, function (obj) {
			self.getting_wifi = false;

			if (obj.err) {
				self.get_networks();
			}
			_.each(obj.resp, function (network_obj) {
				wifi_networks.push(network_obj.ssid);
			})
			var uniq_wifi = _.uniq(wifi_networks.sort());

			app.log("Wifi SSIDs", uniq_wifi);

			var current_ssid = app.manager.get('current_ssid');
			var current_name = self.get('wifi.name');

			if (uniq_wifi.indexOf(current_ssid) > -1) {
				self.set('wifi.name', current_ssid);
			} else if (uniq_wifi.length > 0 && uniq_wifi.indexOf(current_name) < 0) {
				self.set('wifi.name', uniq_wifi[0]);
			}

			self.set('wifi_networks', uniq_wifi);
			self.set('show_wifi_list', 'true');
		}, 10000); // wait ten seconds before retrying
	},
	wifi_failed_to_connect: function () {
		app.log("wifi_failed_to_connect()", this.get('data.failed_to_connect_to_wifi'));
		if (this.get('data.failed_to_connect_to_wifi') == 'true') {
			this.set('wifi_error', 'incorrect')
				.set('wifi_connecting', 'false');

			app.log("wifi_error", this.get('wifi_error'), "connecting", this.get('wifi_connecting'));

			if (this.is_legacy()) this.set('data.reason_unavailable', 'connect_to_wifi');
		} else {
			this.set('wifi_error', 'false');
		}
	},
	wifi_connected: function () {
		app.log("wifi_connected()");
		var active = app.session.get('active');

		if (this.get('data.is_network_connected') == 'true' && this.get('data.wifi_forget') == 'false' && active.primary == 'settings' && active.secondary == 'wifi') {
			app.trigger('sisbot:wifi_connected');
			app.session.set('active.secondary', 'advanced_settings');
		} else if (this.get('data.is_network_connected') == 'true' && app.manager.get('show_wifi_page') == 'true') {
			app.trigger('sisbot:wifi_connected');
		}

		// correct values
		if (this.get('wifi_connecting') == 'true') {
			this.set({
				wifi_error: 'false',
				wifi_connecting: 'false',
			});
		}
		this.set('data.wifi_password', 'false');

		if (this.get('data.is_internet_connected') == 'true' && this.is_legacy()) {
			app.trigger('session:active', { secondary: 'software-update', primary: 'settings' });
		}
	},
	clear_wifi_errors: function () {
		app.log("Clear Wifi Errors");

		this.set('wifi_error', 'false');
		this.set('wifi_connecting', 'false');
		this.set('data.wifi_password', 'false');
	},
	connect_to_wifi: function () {
		app.log("connect_to_wifi()");

		this.set('wifi_error', 'false')
			.set('wifi_connecting', 'false');

		var self = this;
		var credentials = this.get('wifi');
		if (credentials.password == '') {
			app.plugins.n.notification.confirm("You did not enter a password, are you sure you want to submit",
				function (resp_num) {
					if (resp_num == 1) {
						return self;
					} else {
						self._connect_to_wifi();
					}
				}, 'No Password?', ['No', 'Yes']);
		} else if (credentials.password.length > 0 && (credentials.password.length < 8 || credentials.password.length > 63)) {
			this.set('wifi_error', 'true');
			app.plugins.n.notification.alert('Your Wi-Fi password must be between 8-63 characters.');
			return this;
		} else {
			this._connect_to_wifi();
		}
	},
	_connect_to_wifi: function () {
		var self = this;
		var credentials = this.get('wifi');
		var endpoint = (this.is_legacy()) ? 'change_to_wifi' : 'connect_to_wifi';

		this.set('data.failed_to_connect_to_wifi', 'false')
			.set('data.is_hotspot', 'false')
			.set('data.wifi_forget', 'true')
			.set('wifi_connecting', 'true');

		app.log("Manager Sisbots:", app.manager.get('sisbots_networked'));

		this._update_sisbot(endpoint, { ssid: credentials.name, psk: credentials.password, is_hidden: this.get('input_ssid') }, function (obj) {
			if (obj.err && obj.err !== 'Could not make request') {
				app.log('wifi err', obj.err);
				self.set('wifi_error', 'true')
					.set('wifi_connecting', 'false');
			} else if (obj.resp) {
				app.manager.intake_data(obj.resp);

				self.set('data.local_ip', ''); // TODO: test reconnect

				// setTimeout for rescanning for sisbots
				if (app.is_app) {
					function rescan_networks() {
						app.log("Rescan Networks");

						app.manager.get_network_ip_address(function (ip_address) {
							var ip_add = ip_address.split('.');
							ip_add.pop();
							var ip_base = ip_add.join('.');

							if (ip_base == '192.168.42') {
								// wait another 5 seconds
								setTimeout(function () {
									rescan_networks();
								}, 5000);
							} else app.manager.reconnect_to_sisbot();
						});
					}

					// rescan, after wifi_polling_delay seconds
					setTimeout(function () {
						rescan_networks();
					}, self.get('wifi_polling_delay') * 1000);
				}
			}

			if (self.is_legacy()) {
				setTimeout(function () {
					self.set('data.failed_to_connect_to_wifi', 'false')
						.set('data.reason_unavailable', 'connect_to_wifi')
						.set('data.is_hotspot', 'false')
						.set('data.wifi_forget', 'true');

					setTimeout(function () {
						self.set('data.failed_to_connect_to_wifi', 'false')
							.set('data.reason_unavailable', 'connect_to_wifi')
							.set('data.is_hotspot', 'false')
							.set('data.wifi_forget', 'true');
					}, 200);
				}, 200);
			}
		});
	},
	disconnect_wifi: function (data) {
		app.log("disconnect_wifi()", data);
		var self = this;
		var passcode = self.get('data.passcode');

		if (passcode !== 'false') {
			// confirm passcode is the right length
			if (passcode.length > 0 && (passcode.length < 8 || passcode.length > 63)) {
				passcode = 'false'; // do not use
			}
		}

		app.plugins.n.notification.confirm('Are you sure you want to disconnect your Sisyphus from WiFi',
		on_disconnect, 'WiFi Disconnect', ['Cancel', 'Disconnect']);

		function on_disconnect(status) {
			if (status == 1) return self;

			var opts = {};
			if (passcode && passcode != 'false' && passcode != '') opts.password = passcode;

			self._update_sisbot('disconnect_wifi', opts, function (obj) {
				// do nothing
				self.set('is_polling', 'false')
					.set('wifi.password', '')
					.set('data.is_internet_connected', 'false')
					.set('data.is_network_connected', 'false')
					.set('data.is_hotspot', 'true')
					.set('data.wifi_forget', 'false')
					.set('data.wifi_network', 'false')
					.set('data.wifi_password', 'false')
					.set('data.reason_unavailable', 'disconnect_from_wifi')
					.set('data.local_ip', '192.168.42.1'); // change right away

				app.manager.set('sisbot_reconnecting', 'false');
				app.session.clear_sisbots(); // forget sisbots in session
				app.config.set_sisbot_url('192.168.42.1'); // change right away
				app.socket.reset_socket = true; // force recreating socket
				self.check_for_unavailable();
			});
		}
	},
	reboot: function (data) {
		app.log("reboot()", data);
		var self = this;

		app.plugins.n.notification.confirm('Are you sure you want to reboot your Sisyphus?',
		on_reboot, 'Reboot', ['Cancel', 'Confirm']);

		function on_reboot(status) {
			if (status == 1) return self;

			var opts = {};

			self._update_sisbot('reboot', opts, function (obj) {
				// do nothing

				app.manager.set('sisbot_reconnecting', 'false');
				app.session.clear_sisbots(); // forget sisbots in session
				app.socket.reset_socket = true; // force recreating socket
				self.check_for_unavailable();
			});
		}
	},
	shutdown: function (data) {
		app.log("shutdown()", data);
		var self = this;

		app.plugins.n.notification.confirm('Are you sure you want to shutdown your Sisyphus? You will need to power cycle to make it run again',
		on_shutdown, 'Shutdown', ['Cancel', 'Confirm']);

		function on_shutdown(status) {
			if (status == 1) return self;

			var opts = {};

			self._update_sisbot('shutdown', opts, function (obj) {
				// do nothing

				app.manager.set('sisbot_reconnecting', 'false');
				app.session.clear_sisbots(); // forget sisbots in session
				app.socket.reset_socket = true; // force recreating socket
				self.check_for_unavailable();
			});
		}
	},
	is_internet_connected: function () {
		app.log("is_internet_connected()");
		var self = this;

		this._update_sisbot('is_internet_connected', {}, function (obj) {
			if (obj.resp == true) {
				self.set('data.is_internet_connected', 'true');
			} else {
				self.set('data.is_internet_connected', 'false')
					.set('data.wifi_network', 'false')
					.set('data.wifi_password', 'false');
			}
		});
	},
	install_update_alert: function () {
		let self = this;
		let is_servo = self.get('data.is_servo');
		let true_text = "Your ball will home to the middle and the table will restart. This may take sometime. Are you sure you want to continue?";
		let false_text = "Your table will restart this may take sometime. Are you sure you want to continue?";
		if (is_servo == 'true') {
			if (app.plugins.n.notification.confirm(true_text,
				function (resp_num) {
					if (resp_num == 1) {
						return self;
					}
					self.install_updates();
				}, 'Update Table?', ['Cancel', 'OK'])
			);

		} else if (is_servo == 'false') {
			if (app.plugins.n.notification.confirm(false_text,
				function (resp_num) {
					if (resp_num == 1) {
						return self;
					}
					self.install_updates();
				}, 'Update Table?', ['Cancel', 'OK'])
			);

		}
	},
	install_updates: function () {
		app.log("install_updates()");
		if (this.get('data.installing_updates') == 'true') return this;

		var self = this;

		this.set('force_onboarding', 'true');

		var cksum = app.manager.get('remote_versions.cksum');
		var filesize = app.manager.get('remote_versions.filesize');

		var req_data = {};
		if (cksum) req_data.cksum = cksum;
		if (filesize) req_data.filesize = filesize;

		// close modal if open
		app.trigger('modal:close');

		this._update_sisbot('install_updates', req_data, function (obj) {
			if (obj.err) {
				app.log("Install Updates err:", obj.err);
				self.set('data.installing_updates_error', 'There was an error updating your Sisbot');
				app.manager.set('did_update', 'false');
			} else if (obj.resp) {
				app.log("Install Updates resp:", obj.resp);
				app.manager.set('did_update', 'true');
				app.manager.intake_data(obj.resp);
			}
		});

		return this;
	},
	install_updates_change: function () {
		app.log("install_updates_change()");
		var status = this.get('data.installing_updates');

		if (status == 'false') app.manager.set('show_software_update_page', 'false');
		else app.manager.set('show_software_update_page', 'true');
	},
	check_force_onboarding: function () {
		app.log("check_force_onboarding()");
		if (this.get('data.installing_updates') == 'false' && this.get('force_onboarding') == 'true') {
			app.manager.should_show_onboarding();
			this.set('force_onboarding', 'false');
		}
	},
	regenerate_thumbnails: function () {
		app.log("regenerate_thumbnails()");
		if (this.get('regenerating_thumbnails') == 'true') return this;

		var self = this;

		app.plugins.n.notification.confirm('Are you sure you want to regenerate all of your Sisyphus tracks? This will take a lengthy amount of time, depending on the number of tracks.',
			function (resp_num) {
				if (resp_num == 1) return self;

				self.set('regenerating_thumbnails', 'true');

				self._update_sisbot('regenerate_thumbnails', {}, function (obj) {
					if (obj.err) app.log("Regenerate Thumbnails err", obj.err);

					self.set('regenerating_thumbnails', 'false');
				});
			}, 'Proceed?', ['Cancel', 'OK']);
	},
	factory_reset: function () {
		app.log("factory_reset()");
		if (this.get('data.factory_resetting') == 'true') return this;

		var self = this;
		app.plugins.n.notification.confirm('Are you sure you want to RESET your Sisyphus table to factory settings? This cannot be undone and will take some time.',
			function (resp_num) {
				if (resp_num == 1) return self;

				app.collection.remove('favorite_playlist_id'); // Remove Favorite Playlist.

				self.set('data.factory_resetting', 'true');
				self._update_sisbot('factory_reset', {}, function (obj) {
					if (obj.err) {
						self.set('data.factory_resetting_error', 'There was an error resetting your Sisbot');
					} else if (obj.resp) {
						app.manager.intake_data(obj.resp);

						// reset IP to hotspot
						self.set('data.local_ip', '192.168.42.1'); // change right away
						app.config.set_sisbot_url('192.168.42.1'); // change right away
					}
				});
			}, 'Factory Reset?', ['Cancel', 'OK']);
	},
	setup_update_hostname: function () {
		app.log("setup_update_hostname()");
		this.set('hostname', this.get('data.hostname').replace('.local', ''))
			.set('errors', []);

		return this;
	},
	update_hostname: function () {
		app.log("update_hostname()");
		var self = this;
		var hostname = this.get('hostname');
		var errors = [];

		this.set('errors', []);
		this.set('updating_hostname', 'true');

		var valid_hostname = new RegExp("^[a-zA-Z][a-zA-Z0-9\-]*$");

		if (hostname == '')
			errors.push('Hostname cannot be empty');

		if (hostname.search(valid_hostname) == -1)
			errors.push('Hostname cannot contain invalid characters. Must start with a letter and consist of letters, numbers, and "-".');

		if (errors.length > 0)
			return this.set('updating_hostname', 'false').set('errors', errors);

		// Remember hostname for refresh
		var to_remember = hostname + '.local';
		app.current_session().add_nx('sisbot_hostnames', to_remember);
		app.current_session().save_session();

		this._update_sisbot('set_hostname', { hostname: hostname }, function (obj) {
			self.set('updating_hostname', 'false');

			if (obj.err) {
				self.set('errors', [obj.err]);
			} else if (obj.resp) {
				app.trigger('session:active', { secondary: 'false' });
				app.manager.intake_data(obj.resp);
			}
		});
	},
	setup_edit: function () {
		this.set('edit', this.get('data')).set('errors', []);
		app.log("Sisbot edit", this.get('edit'));

		return this;
	},
	active_track_change: function() {
		app.trigger('sisbot:active_track', this.get('data.active_track'));
	},
	nightmode_disable_toggle_setup: function () {
		var status = this.get('default_settings.sleep_time');

		if (status == 'false') {
			this.set('default_settings.sleep_time', '10:00 PM')
				.set('default_settings.wake_time', '8:00 AM')
				.set('default_settings.is_nightlight', 'false')
				.set('default_settings.is_sleep_enabled', 'true');
		} else {
			this.set('default_settings.sleep_time', 'false')
				.set('default_settings.wake_time', 'false')
				.set('default_settings.is_sleep_enabled', 'false');
		}

		return this;
	},
	nightmode_disable_toggle: function () {
		var status = this.get('edit.is_sleep_enabled');

		if (status == 'false') {
			this.set('edit.sleep_time', '10:00 PM')
				.set('edit.wake_time', '8:00 AM')
				.set('edit.is_nightlight', 'false')
				.set('edit.is_sleep_enabled', 'true');
		} else {
			this.set('edit.sleep_time', 'false')
				.set('edit.wake_time', 'false')
				.set('edit.is_sleep_enabled', 'false');
		}

		return this;
	},
	update_nightmode: function () {
		if (app.config.env == 'alpha') return app.trigger('session:active', { secondary: 'false' });

		var self = this;
		var edit = _.pick(this.get('edit'), 'is_sleep_enabled', 'is_nightlight', 'sleep_time', 'wake_time', 'nightlight_brightness', 'is_play_on_wake');
		var errors = [];

		this.set('errors', []);
		var data = this.get('data');
		_.extend(data, edit);

		data.timezone_offset = moment().format('Z');
		this.set('data.is_sleep_enabled', edit.is_sleep_enabled);
		this._update_sisbot('set_sleep_time', data, function (obj) {
			if (obj.err) {
				self.set('errors', [obj.err]);
			} else if (obj.resp) {
				app.manager.intake_data(obj.resp);
				if (obj.resp.sleep_time == 'false') {
					self.set('data.is_sleep_enabled', 'false');
				} else {
					self.set('data.is_sleep_enabled', 'true');
				}
				app.trigger('session:active', { secondary: 'false' });
			}
		});
	},
	nightmode_sleep_change: function () {
		if (this.is_legacy()) return this;

		var status = this.get('data.is_sleeping');

		if (this.get('_is_sleeping') !== status) {
			if (status == 'true') {
				if (this.get('data.is_nightlight') == 'false') this.set('data.nightlight_brightness', 0); // turn nightlight brightness off for slider
				app.manager.set('show_sleeping_page', 'true');
			} else {
				app.manager.set('show_sleeping_page', 'false')
					.trigger('change:show_sleeping_page');
			}
		}

		this.set('_is_sleeping', status);
	},
	wake_up: function () {
		var self = this;

		this.set('data.is_sleeping', 'false')

		if (app.config.env == 'alpha') return this;

		this._update_sisbot('wake_sisbot', {}, function (obj) {
			if (obj.err) {
				self.set('errors', [obj.err]);
			} else if (obj.resp) {
				app.manager.intake_data(obj.resp);
				// TESTING: Siri shortcut
				self._donate_siri({
					action: 'wake_up',
					phrase: 'Wake up'
				});
			}
		});
	},
	is_legacy: function () {
		var firmware = this.get('data.software_version').split('.');

		if (+firmware[1] < 1) {
			this.set('is_legacy_branch', 'true');
			return true;
		} else {
			this.set('is_legacy_branch', 'false');
			return false;
		}
	},
	sleep: function () {
		var self = this;

		if (this.is_legacy()) return app.plugins.n.notification.alert('This feature is unavailable because your Sisyphus firmware is not up to date. Please update your version in order to enable this feature');

		this.set('data.is_sleeping', 'true');
		if (this.get('data.is_nightlight') == 'false') this.set('data.nightlight_brightness', 0);

		if (app.config.env == 'alpha') return this;

		this._update_sisbot('sleep_sisbot', {}, function (obj) {
			if (obj.err) {
				self.set('errors', [obj.err]);
			} else if (obj.resp) {
				app.manager.intake_data(obj.resp);
				self.nightmode_sleep_change();

				// TESTING: Siri shortcut
				self._donate_siri({
					action: 'sleep',
					phrase: 'Sleep'
				});
			}
		});
	},
	update_tableName_alert: function () {
		let self = this;
		let is_servo = self.get('data.is_servo');
		let servo_text = "Your ball will home to the middle and the table will restart. This may take a few moments. Are you sure you want to continue?";
		let not_servo_text = "Your table will restart this may take a few moments. Are you sure you want to continue?";

		if (is_servo == 'true') {
			if (app.plugins.n.notification.confirm(servo_text,
				function (resp_num) {
					if (resp_num == 1) {
						return self;
					}
					self.update_tablename();
				}, 'Change Table Name?', ['No', 'Yes'])
			);

		} else if (is_servo == 'false') {
			if (app.plugins.n.notification.confirm(not_servo_text,
				function (resp_num) {
					if (resp_num == 1) {
						return self;
					}
					self.update_tablename();
				}, 'Change Table Name?', ['No', 'Yes'])
			);
		}
	},
	update_tablename: function () {
		if (this.is_legacy()) {
			app.plugins.n.notification.alert('This feature is unavailable because your Sisyphus firmware is not up to date. Please update your version in order to enable this feature');
			return app.trigger('session:active', { secondary: 'advanced_settings' });
		}

		var self = this;
		var name = this.get('edit.name');
		var errors = [];

		this.set('errors', []);
		this.set('updating_tablename', 'true');

		if (errors.length > 0)
			return this.set('updating_tablename', 'false').set('errors', ['Table Name cannot be empty']);

		var data = this.get('data');
		data.name = name;

		if (app.config.env == 'alpha') {
			return app.trigger('session:active', { secondary: 'advanced_settings' });
			this.set('data.name', name);
		}

		this._update_sisbot('save', data, function (obj) {
			self.set('updating_tablename', 'false');

			if (obj.err) {
				self.set('errors', [obj.err]);
			} else if (obj.resp) {
				app.manager.intake_data(obj.resp);
				app.trigger('session:active', { secondary: 'advanced_settings' });
			}
		});

	},
	restart: function () {
		this.set('data.reason_unavailable', 'restarting');
		this.set('data.is_available', 'false');

		this._update_sisbot('restart', {}, function (obj) {
			app.log('RESTART');
		});
	},
	save_to_sisbot: function (data, cb) {
		var self = this;
		if (!cb) cb = function (obj) { };
		app.log("Save to Sisbot");

		this._update_sisbot('save', data, cb);
	},
	save_log_sharing: function (data) {
		if (this.is_legacy()) {
			app.plugins.n.notification.alert('This feature is unavailable because your Sisyphus firmware is not up to date. Please update your version in order to enable this feature');
			return app.trigger('session:active', { secondary: 'advanced_settings' });
		}

		var self = this;
		var logfiles = this.get('edit.share_log_files');
		var errors = [];

		this.set('errors', []);

		var data = this.get('data');
		data.share_log_files = logfiles;

		if (app.config.env == 'alpha') {
			return app.trigger('session:active', { secondary: 'advanced_settings' });
			this.set('data.share_log_files', logfiles);
		}

		this._update_sisbot('save', data, function (obj) {
			if (obj.err) {
			} else if (obj.resp) {
				self.set('errors', [obj.err]);
				app.manager.intake_data(obj.resp);
				app.trigger('session:active', { secondary: 'advanced_settings' });
			}
		});
	},
	load_log_files: function () {
		app.log("Load Log Files");
		var self = this;

		// load log files from sisbot
		this._update_sisbot('get_log_filenames', {}, function (obj) {
			if (obj.err) return app.log("Error loading log files", obj.err);

			if (obj.resp && _.isArray(obj.resp)) {
				self.set('log_files', obj.resp);
				if (obj.resp.indexOf('proxy.log') >= 0) self.set('log_file', 'proxy.log');
				else if (obj.resp.length > 0) self.set('log_file', obj.resp[0]);
			}
		});
	},
	get_log_file: function () {
		// { filename: 'YYYYMMDD_sisbot|plotter|proxy', }

		// var date 		= this.get('log_date').split('/');
		// var type 		= this.get('log_type');
		// var file 		= date[2] + date[0] + date[1] + '_' + type;
		var file = this.get('log_file');
		var file_url = 'http://' + this.get('data.local_ip') + '/sisbot/download_log_file/' + file;

		app.plugins.file_download(file_url);
	},
	pause_time_change: function(data) {
		app.log("pause_track_change", this.get('data.paused_track_time'));
		this.set('edit.is_paused_between_tracks', this.get('data.is_paused_between_tracks'), {silent: true});
		this.set('edit.is_paused_time_enabled', this.get('data.is_paused_time_enabled'), {silent: true});
		this.set('edit.paused_track_time', this.get('data.paused_track_time'), {silent: true});
	},
	pause_between_tracks: function (data) {
		if (this.is_legacy())
			return app.plugins.n.notification.alert('This feature is unavailable because your Sisyphus firmware is not up to date. Please update your version in order to enable this feature');
		var self = this;

		app.log("Pause Between Tracks", data);

		this._update_sisbot('set_pause_between_tracks', {
			is_paused_between_tracks: self.get('edit.is_paused_between_tracks'),
			is_paused_time_enabled: self.get('edit.is_paused_time_enabled'),
			paused_track_time: self.get('edit.paused_track_time')
			}, function (obj) {
				if (obj.err) {
					self.set('errors', [obj.err]);
				} else if (obj.resp) {
					app.manager.intake_data(obj.resp);
				}
		});
	},
	toggle_mood_lighting: function () {
		var address = this.get('data.local_ip');
		
		var endpoint = this.get('data.is_mood_lighting') === 'true' ? '/mood_lighting_begin': '/mood_lighting_end'
		var obj = {
			_url: 'http://' + address + ':5000',
			_type: 'GET',
			_timeout: 5000,
			endpoint: endpoint,
		};
		
		app.post.fetch(obj, function (resp) {
			if (resp.err) {
				app.plugins.n.notification.alert(resp.err);

				app.log(address, endpoint, resp);
				console.error(resp.err);
				return;
			}

			app.log("Toggle Mood Lighting return", resp);
		}, 0);
	},
	/**************************** PLAYBACK ************************************/
	play_playlist: function (data) {
		app.log("Siri: play playlist", JSON.stringify(data));

		var playlist = app.collection.get(data.id);
		if (playlist) {
			if (data.is_shuffle) playlist.play_shuffled();
			else playlist.play();
		}
	},
	update_playlist: function (playlist_data) {
		var self = this;

		// check for fault
		if (this.get('data.fault_status') != 'false') {
			return app.plugins.n.notification.alert('Please fix fault status',
				function (resp_num) {
					if (resp_num == 1) {
						return;
					}
				}, 'Unable to Play Playlist', ['OK']);
		}

		app.log("Update Playlist", playlist_data);
		this._update_sisbot('set_playlist', playlist_data, function (obj) {
			//get back playlist obj
			if (obj.resp && obj.resp.id !== 'false') {
				app.manager.intake_data(obj.resp);

				var playlist = app.collection.get(playlist_data.id);
				app.log("Playlist Tracks", playlist.get('sorted_tracks'), playlist.get('next_tracks'));

				// TESTING: Siri shortcut
				var siri_obj = {
					action: 'play_playlist',
					phrase: 'Play ' + playlist_data.name + ' Playlist',
					identifier: 'play_' + playlist_data.id,
					msg: {
						id: playlist_data.id,
						is_shuffle: playlist_data.is_shuffle
					}
				};
				if (playlist_data.is_shuffle == 'true') {
					siri_obj.identifier = 'shuffle_' + playlist_data.id;
					siri_obj.phrase = 'Shuffle ' + playlist_data.name + ' Playlist';
				}
				self._donate_siri(siri_obj);
			}
		});

		this.set('data.is_loop', playlist_data.is_loop);
		this.set('data.is_shuffle', playlist_data.is_shuffle);
		this.set('data.active_playlist_id', playlist_data.id);
		this.set('data.active_track_id', playlist_data.active_track_id);
		this.set('data.state', 'playing');

		app.trigger('session:active', { 'primary': 'current', 'secondary': 'false' });
	},
	play_track: function (data) {
		app.log("Siri: play track", JSON.stringify(data));

		var track = app.collection.get(data.id);
		if (track) track.play(); // call on model, in case model needs to make adjustments
	},
	set_track: function (data) {
		var self = this;

		// check for fault
		if (this.get('data.fault_status') != 'false') {
			return app.plugins.n.notification.alert('Please fix fault status',
				function (resp_num) {
					if (resp_num == 1) {
						return;
					}
				}, 'Unable to Play Track', ['OK']);
		}

		this._update_sisbot('set_track', data, function (obj) {
			if (obj.resp) app.manager.intake_data(obj.resp);

			// TESTING: Siri shortcut
			self._donate_siri({
				action: 'play_track',
				phrase: 'Play ' + data.name + ' Track',
				identifier: 'play_' + data.id,
				msg: { id: data.id }
			});

			app.trigger('session:active', { secondary: 'false', primary: 'current' });
		});

		this.set('data.active_playlist_id', 'false');
		this.set('data.active_track_id', data.id);
		this.set('data.state', 'playing');
	},
	setup_default_playlist: function () {
		this.set('default_playlist_id', this.get('data.default_playlist_id')).set('errors', []);
		return this;
	},
	set_default_playlist: function () {
		var self = this;

		var data = {
			default_playlist_id: this.get('default_playlist_id')
		};

		this._update_sisbot('set_default_playlist', data, function (obj) {
			if (obj.err) {
				self.set('errors', resp.err);
			} else if (obj.resp) {
				app.manager.intake_data(obj.resp);
				app.trigger('session:active', { secondary: 'false' });
			}
		});

		return this;
	},
	setup_favorite_playlist: function () {
		if (this.is_legacy()) return this;

		app.log('Setup Favorite Playlist', this.get('data.favorite_playlist_id'));

		if (this.get('data.favorite_playlist_id') !== 'false' && app.collection.get(this.get('data.favorite_playlist_id')) !== undefined) return this;

		var self = this;

		var playlist = app.collection.add({
			id: "favorite_playlist_id",
			type: 'playlist',
			name: 'Favorites',
			description: 'Tracks marked as Favorites',
			is_shuffle: 'true'
		});

		this.set('data.favorite_playlist_id', playlist.id);

		this._update_sisbot('save', this.get('data'), function (obj) {
			if (obj.err) {

			} else {
				app.log("Setup Favorite Playlist");
				self.playlist_add(playlist);
			}
		});

		if (app.config.env == 'alpha') // so it works in alpha
			self.playlist_add(playlist);
	},
	nightlight_brightness_max: function () {
		this.nightlight_brightness(1);
	},
	nightlight_brightness_min: function () {
		this.nightlight_brightness(0);
	},
	nightlight_brightness: function (data) {
		app.log("Nightlight Brightness:", data);
		var self = this;
		var level;
		if (_.isObject(data)) level = +data.value;
		else level = +data;
		this.set('edit.nightlight_brightness', level);

		var nightlight_slider = document.getElementById("nightlight-slider");
		if (nightlight_slider) nightlight_slider.style.background = 'linear-gradient(to right, #00b1fa 0%, #00b1fa ' + (level * 100) + '%, #efefef ' + (level * 100)  + '%, #efefef 100%)';

		if (parseInt(this.get('sisbot_version')) >= 1010075 && this.get('wait_for_send') == 'false') {
			// var start = +new Date();
			this.set('wait_for_send', 'true');

			var remember_level = level;
			var send_obj = { value: remember_level };
			if (_.isObject(data) && data.preview) send_obj.preview = data.preview;

			this._update_sisbot('set_nightlight_brightness', send_obj, function (obj) {
				// do nothing
				app.log("Nightlight Brightness resp", obj);

				// var end = +new Date();
				// app.log("Brightness Response (millis):", end-start);
				self.set('wait_for_send', 'false');

				// app.log("Tail Brightness", remember_level, self.get('edit.brightness'));

				if (self.get('edit.nightlight_brightness') !== remember_level) {
					self.nightlight_brightness(self.get('edit.nightlight_brightness'));
				}
			});
		} else {
			// app.log("New Nightlight Brightness", level);
		}
	},
	//for adding color to slider
	nightlight_slider_update: function(data) {
		if (app.manager.get('show_nightlight_page') == 'true') {
			var level = this.get('default_settings.nightlight_brightness')
		} else {
			var level = this.get('edit.nightlight_brightness');
		}
		app.log('nightlight_slider_update', data, level);
		//Night Light Slider
		var nightlight_slider = document.getElementById("nightlight-slider");
		if (nightlight_slider) nightlight_slider.style.background = 'linear-gradient(to right, #00b1fa 0%, #00b1fa ' + (level * 100) + '%, #efefef ' + (level * 100)  + '%, #efefef 100%)';
	},
	default_brightness: function (level) {
		var self = this;
		this.set('default_settings.brightness', +level);
		this.brightness(level);
	},
	//for adding color to slider
	brightness_slider_update: function (data) {
		app.log('brightness_slider_update', data);
		var level = this.get('data.brightness');
		var brightness_slider = document.getElementById("brightness-slider");
		if (brightness_slider) brightness_slider.style.background = 'linear-gradient(to right, #00b1fa 0%, #00b1fa ' + (level * 100) + '%, #efefef ' + (level * 100)  + '%, #efefef 100%)';
	},
	brightness: function (level) {
		var self = this;

		// Brightness Sliders
		var brightness_slider = document.getElementById("brightness-slider");
		if (brightness_slider) brightness_slider.style.background = 'linear-gradient(to right, #00b1fa 0%, #00b1fa ' + (level * 100) + '%, #efefef ' + (level * 100)  + '%, #efefef 100%)';

		app.log("Brightness:", level, this.get('data.brightness'), this.get('edit.brightness'));
		this.set('data.brightness', +level).set('edit.brightness', +level);

		if (this.get('wait_for_send') == 'false') {
			// var start = +new Date();
			this.set('wait_for_send', 'true');
			var remember_level = +level;
			this._update_sisbot('set_brightness', { value: remember_level }, function (obj) {
				// do nothing
				app.log("Brightness resp", obj);

				// var end = +new Date();
				// app.log("Brightness Response (millis):", end-start);
				self.set('wait_for_send', 'false');

				// app.log("Tail Brightness", remember_level, self.get('edit.brightness'));

				if (self.get('edit.brightness') !== remember_level) {
					self.brightness(self.get('edit.brightness'));
				}
			});
		} else {
			// app.log("New Brightness", level);
		}
	},
	brightness_up: function () {
		var level = +this.get('data.brightness');
		if (level <= .95) level = level + .05;
		this.brightness(level);
	},
	brightness_down: function () {
		var level = +this.get('data.brightness');
		if (level >= .05) level = level - .05;
		this.brightness(level);
	},
	brightness_max: function () {
		this.brightness(1);
	},
	brightness_min: function () {
		this.brightness(0);
	},
	set_autodim_default: function () {
		var opp = app.plugins.bool_opp[this.get('default_settings.is_autodim')];
		this.set('default_settings.is_autodim', opp);
		this.autodim_toggle();
	},
	autodim_toggle: function () {
		var data = this.get('data');
		data.is_autodim = app.plugins.bool_opp[data.is_autodim];
		this.set('data', data);
		this.trigger('change:data.is_autodim');
		this._update_sisbot('set_autodim', { value: data.is_autodim }, function (obj) {
			if (obj.resp) app.manager.intake_data(obj.resp);
		});
	},
	update_speed: function () {
		var level = this.get('data.speed');
		var speed_slider = document.getElementById("speed-slider");
		if (speed_slider) speed_slider.style.background = 'linear-gradient(to right, #00b1fa 0%, #00b1fa ' + (level * 100) + '%, lightgrey ' + (level * 100)  + '%, #efefef 100%)';
	},
	speed: function (level) {
		var self = this;
		var speed_slider = document.getElementById("speed-slider");
		if (speed_slider) speed_slider.style.background = 'linear-gradient(to right, #00b1fa 0%, #00b1fa ' + (level * 100) + '%, #efefef ' + (level * 100) + '%, #efefef 100%)'

		this.set('data.speed', +level).set('edit.speed', +level);

		if (this.get('wait_for_send') == 'false') {
			this.set('wait_for_send', 'true');
			var remember_level = +level;
			this._update_sisbot('set_speed', { value: remember_level }, function (obj) {
				self.set('wait_for_send', 'false');

				if (self.get('edit.speed') !== remember_level) {
					// app.log("Tail Speed", remember_level, self.get('edit.speed'));
					self.speed(self.get('edit.speed'));
				}
			});
		}
	},
	speed_up: function () {
		var level = +this.get('data.speed');
		if (level <= .95) level = level + .05;
		this.speed(level);
	},
	speed_down: function () {
		var level = +this.get('data.speed');
		if (level >= .05) level = level - .05;
		this.speed(level);
	},
	speed_max: function () {
		this.speed(1);
	},
	speed_min: function () {
		this.speed(0);
	},
	set_shuffle: function () {
		this.set('data.is_shuffle', app.plugins.bool_opp[this.get('data.is_shuffle')]);

		this._update_sisbot('set_shuffle', { value: this.get('data.is_shuffle') }, function (obj) {
			if (obj.resp) app.manager.intake_data(obj.resp);
		});
	},
	set_loop: function () {
		var self = this;
		this.set('data.is_loop', app.plugins.bool_opp[this.get('data.is_loop')]);
		this._update_sisbot('set_loop', { value: this.get('data.is_loop') }, function (obj) {
			if (obj.resp) app.manager.intake_data(obj.resp);
		});
	},
	enable_led: function () {
		var self = this;
		// send to sisbot
		this._update_sisbot('set_led', { is_rgbw: 'true' }, function (obj) {
			// set as enables
			// app.log("LED resp", obj);
			self.set('data.led_enabled', obj.resp.is_rgbw);
		});
	},
	demo_pattern: function () {
		var self = this;
		if (this.get('edit.led_pattern') != 'demo') {
			this.set('edit.led_pattern', 'demo');
		}
	},
	calibrate_pattern: function () {
		var self = this;
		if (this.get('edit.led_pattern') != 'calibrate') {
			// app.log("Switch to Calibrate, remember", this.get('data.led_pattern'));
			this.set('rem_pattern', this.get('data.led_pattern'));

			this.set('edit.led_pattern', 'calibrate');

			this.listenToOnce(app.session, 'change:active.secondary', function () {
				// app.log("Reset pattern to", self.get('rem_pattern'));
				self.set('edit.led_pattern', self.get('rem_pattern'));
			});
		}
	},
	led_pattern_change: function() {
		app.log("led_pattern_change", this.get('data.led_pattern'));
		this.set('edit.led_pattern', this.get('data.led_pattern'), {silent: true});
	},
	_change_led_pattern: function () {
		var self = this;

		var new_pattern = this.get('edit.led_pattern');

		if (new_pattern != 'false' && this.get('data.led_pattern') != new_pattern) {
			this.set('data.led_pattern', new_pattern);

			// send to sisbot
			var pattern = app.collection.get(new_pattern);
			if (pattern) {
				app.log("Update LED Pattern", pattern.get('data'));
				self._update_sisbot('set_led_pattern', pattern.get('data'), function (obj) {
					if (obj.err) return console.error(obj.err);

					// fix possible incorrect return value
					if (_.isObject(obj.resp.led_primary_color)) {
						var colors = obj.resp.led_primary_color;
						var red = colors.red.toString(16);
						if (red.length < 2) red = '0' + red;
						var green = colors.green.toString(16);
						if (green.length < 2) green = '0' + green;
						var blue = colors.blue.toString(16);
						if (blue.length < 2) blue = '0' + blue;
						var white = colors.white.toString(16);
						if (white.length < 2) white = '0' + white;
						obj.resp.led_primary_color = '0x' + red + green + blue + white;
						app.log("Fix Primary", JSON.stringify(colors), obj.resp.led_primary_color);
					}
					if (_.isObject(obj.resp.led_secondary_color)) {
						var colors = obj.resp.led_secondary_color;
						var red = colors.red.toString(16);
						if (red.length < 2) red = '0' + red;
						var green = colors.green.toString(16);
						if (green.length < 2) green = '0' + green;
						var blue = colors.blue.toString(16);
						if (blue.length < 2) blue = '0' + blue;
						var white = colors.white.toString(16);
						if (white.length < 2) white = '0' + white;
						obj.resp.led_secondary_color = '0x' + red + green + blue + white;
						app.log("Fix Secondary", JSON.stringify(colors), obj.resp.led_secondary_color);
					}

					// intake data
					app.manager.intake_data(obj.resp);

					// TESTING: Siri shortcut
					self._donate_siri({
						action: 'set',
						identifier: 'pattern_' + new_pattern,
						phrase: pattern.get('data.name') + ' Light Pattern',
						msg: { 'edit.led_pattern': new_pattern }
					});
					app.log("Set LED Pattern return", obj);
				});
			}
		}
	},
	_update_pattern_colors: function () {
		var do_save = false;

		// load last used color from this pattern
		var pattern = app.collection.get(this.get('data.led_pattern'));
		app.log("Update Pattern Colors", pattern.get('data'), this.get('edit.led_primary_color'), this.get('edit.led_secondary_color'));
		if (pattern) {
			if (pattern.get('data.is_white') == 'true') {
				// app.log("Update white from led_pattern", pattern.get('data'));
				this.set('edit.led_primary_color', pattern.get_white_color());
				this.led_color();
			} else if (pattern.get('data.is_primary_color') == 'true' || pattern.get('data.is_secondary_color') == 'true') {
				// app.log("Update colors from led_pattern", pattern.get('data'));
				if (pattern.get('data.is_primary_color') == 'true' && pattern.get('data.led_primary_color') != 'false') this.set('edit.led_primary_color', pattern.get('data.led_primary_color'));
				if (pattern.get('data.is_secondary_color') == 'true' && pattern.get('data.led_secondary_color') != 'false') this.set('edit.led_secondary_color', pattern.get('data.led_secondary_color'));
				this.led_color();
			} else {
				app.log("No color update from led_pattern", pattern.get('data'));
				do_save = true;
			}
		} else do_save = true;

		return do_save;
	},
	remember_colors: function (data) {
		app.log("Remember LED_Colors", this.get('data.led_primary_color'), this.get('data.led_secondary_color'));

		this.set('rem_primary_color', this.get('data.led_primary_color'));
		this.set('rem_secondary_color', this.get('data.led_secondary_color'));

		app.log("Remeber Mood Colors & Text");
		
		this.set('rem_alert_color', this.get('data.mood_alert_color'));
		this.set('rem_angry_color', this.get('data.mood_angry_color'));
		this.set('rem_calm_color', this.get('data.mood_calm_color'));
		this.set('rem_disgust_color', this.get('data.mood_disgust_color'));
		this.set('rem_happy_color', this.get('data.mood_happy_color'));
		this.set('rem_neutral_color', this.get('data.mood_neutral_color'));
		this.set('rem_relaxed_color', this.get('data.mood_relaxed_color'));
		this.set('rem_sad_color', this.get('data.mood_sad_color'));
	},
	cancel_color: function (data) {
		this.set('edit.led_primary_color', this.get('rem_primary_color'));
		this.set('edit.led_secondary_color', this.get('rem_secondary_color'));

		this.led_color();

		app.trigger('session:active', { 'secondary': 'false' });
	},
	cancel_mood_colors: function () {
		console.log('running mood cancel');
		this.set('edit.mood_alert_color', this.get('rem_alert_color'));
		this.set('edit.mood_angry_color', this.get('rem_angry_color'));
		this.set('edit.mood_calm_color', this.get('rem_calm_color'));
		this.set('edit.mood_disgust_color', this.get('rem_disgust_color'));
		this.set('edit.mood_happy_color', this.get('rem_happy_color'));
		this.set('edit.mood_neutral_color', this.get('rem_neutral_color'));
		this.set('edit.mood_relaxed_color', this.get('rem_relaxed_color'));
		this.set('edit.mood_sad_color', this.get('rem_sad_color'));

		this.update_mood_colors();

		app.trigger('session:active', { 'secondary': 'false' });
	},
	toggle_mood_picker: function() {
		this.set('show_picker', 'false');
		this.update_mood_colors();
		this.set('show_picker', 'true');
	},
	toggle_picker: function (data) {
		app.log("Toggle Picker", this.get('edit.led_primary_color'), this.get('edit.led_secondary_color'));

		this.set('show_picker', 'false');

		this.led_color(null);

		this.set('show_picker', 'true');
	},
	update_mood_colors: function() {
		const dataKeys = [
			'data.mood_alert_color',
			'data.mood_angry_color',
			'data.mood_calm_color',
			'data.mood_disgust_color',
			'data.mood_happy_color',
			'data.mood_neutral_color',
			'data.mood_relaxed_color',
			'data.mood_sad_color'
		];

		const editKeys = [
			'edit.mood_alert_color',
			'edit.mood_angry_color',
			'edit.mood_calm_color',
			'edit.mood_disgust_color',
			'edit.mood_happy_color',
			'edit.mood_neutral_color',
			'edit.mood_relaxed_color',
			'edit.mood_sad_color'
		];

		const textKeys = [
			'data.mood_alert_color_text',
			'data.mood_angry_color_text',
			'data.mood_calm_color_text',
			'data.mood_disgust_color_text',
			'data.mood_happy_color_text',
			'data.mood_neutral_color_text',
			'data.mood_relaxed_color_text',
			'data.mood_sad_color_text'
		];


		const oldColors = dataKeys.map(k => this.get(k));
		const colors = editKeys.map(k => this.get(k));

		const checkedColors = colors.map((color, index) => {
			let verifiedColor = color;
			if (color) {
				if (color.match(/^0x/)) {
					verifiedColor = color.replace(/^0x/, '#');
				}

				if (!verifiedColor.match(/^#[0-9a-f]{8}$/i)) {
					verifiedColor = oldColors[index];
				}
			}
			return verifiedColor;
		});

		// Unify state
		checkedColors.forEach((color, index) => {
			this.set(dataKeys[index], color);
			this.set(editKeys[index], color);
		});

		// Set Text
		checkedColors.forEach((color, index) => {
			const red = parseInt(color.substr(1, 2), 16);
			const green = parseInt(color.substr(3, 2), 16);
			const blue = parseInt(color.substr(5, 2), 16);

			const average = (red + green + blue) / 3;

			if (average > 165) {
				this.set(textKeys[index], 'black');
			} else {
				this.set(textKeys[index], 'white');
			}
		});

		this.update_sislisten_settings(checkedColors);
	},
	update_sislisten_settings: function(checkedColors) {
		const moodNames = [
			"alert",
			"angry",
			"calm",
			"disgust",
			"happy",
			"neutral",
			"relaxed",
			"sad"
		];
		const dataDict = {};
		checkedColors.forEach((color, index) => {
			const red = parseInt(color.substr(1, 2), 16);
			const green = parseInt(color.substr(3, 2), 16);
			const blue = parseInt(color.substr(5, 2), 16);
			dataDict[moodNames[index]] = [red, green, blue];
		});
		/**
		 * Settings schema:
		 * { "settings": 
		 * 	{
		 * 		"mood": [color] (x8)
		 * 	}
		 * }
		*/
		const requestData = { 'settings': dataDict };
		const address = this.get('data.local_ip');
		app.log("Broadcasting settings");
		// Code copied from _update_sisbot endpoint
		var custom_req = {
			_url : 'http://' + address + ':5000',
			_type: 'POST',
			_timeout: 5000,
			endpoint: '/mood_lighting_settings',
			data: requestData
		}; 

		app.post.fetch(custom_req, function(resp) {
			if (resp.err) {
				app.plugins.n.notification.alert(resp.err);
				app.log("error in changing sislisten values!", address, endpoint, resp);
			} else {
				app.log("sucessfully updated sislisten settings!");
			}
		}, 0);
	},
	led_color: function (data) {
		app.log("Sisbot LED_Color", data, this.get('edit.led_primary_color'), this.get('edit.led_secondary_color'));
		var self = this;
		var color_data = {};

		var led_pattern = this.get_model('data.led_pattern');

		// check for primary change
		var edit_primary = this.get('edit.led_primary_color');

		// fix possible errors
		if (edit_primary) {
			if (edit_primary.match(/^0x/)) edit_primary = edit_primary.replace(/^0x/, '#');
			if (!edit_primary.match(/^#[0-9a-f]{8}$/i)) {
				edit_primary = this.get('data.led_primary_color');
				this.set('edit.led_primary_color', edit_primary);
			}
		}

		// include white_value
		if (led_pattern.get('data.is_white')) {
			color_data.white_value = led_pattern.get('data.white_value');
		}

		// app.log("Compare Primary Color", this.get('data.led_primary_color'), edit_primary);
		if (this.get('data.led_primary_color') != edit_primary) {
			this.set('data.led_primary_color', edit_primary);

			app.log("Update Primary Color", this.get('data.led_primary_color'));

			color_data.led_primary_color = edit_primary;

			// update the led_pattern
			if (led_pattern) led_pattern.set('data.led_primary_color', edit_primary);
		}

		// check for secondary change
		var edit_secondary = this.get('edit.led_secondary_color');

		// fix possible errors
		if (edit_secondary) {
			if (edit_secondary.match(/^0x/)) edit_secondary = edit_secondary.replace(/^0x/, '#');
			if (!edit_secondary.match(/^#[0-9a-f]{8}$/i)) {
				edit_secondary = this.get('data.led_secondary_color');
				this.set('edit.led_secondary_color', edit_secondary);
			}
		}

		// app.log("Compare Secondary Color", this.get('data.led_secondary_color'), edit_secondary);
		if (this.get('data.led_secondary_color') != edit_secondary) {
			this.set('data.led_secondary_color', edit_secondary);

			app.log("Update Secondary Color", this.get('data.led_secondary_color'));

			color_data.led_secondary_color = edit_secondary;

			// update the led_pattern
			if (led_pattern) led_pattern.set('data.led_secondary_color', edit_secondary);
		}

		// send to sisbot
		app.log("Save color data?", color_data);
		if (!_.isEmpty(color_data)) {
			app.log("Save color data", this.get('data.led_primary_color'), this.get('data.led_secondary_color'));
			// var save_data = [this.get('data')];
			// if (led_pattern) save_data.push(led_pattern.get('data'));
			// app.log("Save data", save_data);
			// this.save_to_sisbot(save_data);
			color_data._save = true;

			this._update_sisbot('set_led_color', color_data, function (obj) { app.log("Color Set", obj); });
		}
	},
	led_offset_up: function () {
		var level = +this.get('data.led_offset');
		level += 1;
		if (level > 180) level = 180;
		this.led_offset(level);
	},
	led_offset_down: function () {
		var level = +this.get('data.led_offset');
		level -= 1;
		if (level < -180) level = -180;
		this.led_offset(level);
	},
	led_offset_zero: function () {
		var level = 0;
		this.led_offset(level);
	},
	led_offset: function (level) {
		var self = this;
		var remember_level = +level;

		app.log("OFFSET:", level, this.get('data.led_offset'));
		this.set('data.led_offset', remember_level).set('edit.led_offset', remember_level);

		this._update_sisbot('set_led_offset', { offset: remember_level }, function (obj) {
			self.save_to_sisbot(self.get('edit'), null); // save value
		});
	},
	homing_offset: function (level) {
		app.log("Homing Offset: ", level);
		this.set('edit.table_settings.homingOffset', +level);
	},
	homing_offset_up: function () {
		var level = +this.get('edit.table_settings.homingOffset');
		level += 0.01;
		if (level > 0.12) level = 0.12;
		this.set('edit.table_settings.homingOffset', level);
	},
	homing_offset_down: function () {
		var level = +this.get('edit.table_settings.homingOffset');
		level -= 0.01;
		if (level < -0.12) level = -0.12;
		this.set('edit.table_settings.homingOffset', level);
	},
	disconnect: function () {
		app.plugins.n.notification.confirm('Are you sure you want to disconnect from the Sisyphus?', function (resp_num) {
			if (resp_num == 1) return self;

			app.current_session().clear_sisbots(); // clear known sisbots
			window.location.reload();
		}, 'Disconnect?', ['Cancel', 'OK']);
	},
	/******************** PLAYLIST / TRACK STATE ******************************/
	playlist_add: function (playlist_model) {
		var self = this;
		var playlist = playlist_model.get('data');
		app.log("Sisbot: Playlist Add", this.id, playlist.id);

		this._update_sisbot('add_playlist', playlist, function (obj) {
			app.log('Sisbot: Add playlist', obj);
			if (obj.err) {
				app.log("Error in the _update_sisbot when adding to Playlist. ", obj.err);
				return app.plugins.n.notification.alert('There was an error adding the playlist "' + self.get('data.name') + '" to your Sisyphus. Please try again later.');
			} else if (obj.resp) {
				app.manager.intake_data(obj.resp);

				playlist_model.set('is_downloaded', 'true');
			}
		});

		this.add_nx('data.playlist_ids', playlist.id);
	},
	playlist_remove: function (playlist_model) {
		if (this.is_legacy())
			return app.plugins.n.notification.alert('This feature is unavailable because your Sisyphus firmware is not up to date. Please update your version in order to enable this feature');

		var self = this;
		var playlist = playlist_model.get('data');

		var send_data = {
			id: playlist.id,
			type: playlist.type
		};

		this._update_sisbot('remove_playlist', playlist, function (obj) {
			if (obj.err) {
				app.log("Error in the _update_sisbot  to Playlist. ", obj.err);
				return app.plugins.n.notification.alert('There was an error removing your Playlist. Please try again later.');
			} else if (obj.resp) {
				app.manager.intake_data(obj.resp);

				playlist_model.set('is_downloaded', 'false');

				app.trigger('session:active', { 'secondary': 'playlists' });
			}
		});

		this.remove('data.playlist_ids', playlist_model.id);
	},
	track_add: function (track_model) {
		app.log('Calling track_add:', track_model.toJSON());
		var self = this;
		var track = track_model.get('data');

		this.set('uploading_track', 'true');

		this._update_sisbot('add_track', track, function (obj) {
			self.set('uploading_track', 'false');

			if (obj.err) {
				app.plugins.n.notification.alert(obj.err);
			} else if (obj.resp) {
				// make sure verts are not retained
				if (track_model.get('data.verts')) track_model.unset('data.verts');

				// show track image
				track_model.set('generating_thumbnails', 'false')
					.set('is_downloaded', 'true');

				app.manager.intake_data(obj.resp);

				// manager will now change pages
				app.trigger('track:added', { id: track.id });

				if (track_model.get('downloading_community_track') == 'true') {
					track_model.set('downloading_community_track', 'false');
					app.trigger('community:downloaded_track', track_model.id);
				}
			}
		}, 60000);

		this.add_nx('data.track_ids', track.id);
	},
	track_remove: function (track_model) {
		if (this.is_legacy())
			return app.plugins.n.notification.alert('This feature is unavailable because your Sisyphus firmware is not up to date. Please update your version in order to enable this feature');

		var self = this;

		app.plugins.n.notification.confirm('Are you sure you want to delete this track? This will remove it from all playlists and your track list. This cannot be undone.', function (resp_num) {
			if (resp_num == 1)
				return self;

			if (app.config.env == 'alpha') {
				var active = app.session.get('active');
				if (active.primary == 'current') app.trigger('session:active', { track_id: 'false', secondary: 'false' });
				else app.trigger('session:active', { track_id: 'false', secondary: 'tracks', primary: 'media' });
			}

			var track = track_model.get('data');
			var send_data = {
				id: track.id,
				type: track.type
			};

			self._update_sisbot('remove_track', send_data, function (obj) {
				if (obj.err) {
					return app.plugins.n.notification.alert('There was an error removing the file from your Sisyphus. Please try again later.');
				} else if (obj.resp) {
					app.manager.intake_data(obj.resp);
					var active = app.session.get('active');

					// mark track as not downloaded
					track_model.set('is_downloaded', 'false');

					// remove track from all_tracks_playlist
					var all_tracks_playlist = self.get_model('data.all_tracks_playlist_id');
					if (all_tracks_playlist) all_tracks_playlist.remove_track_and_save(track.id);

					// close modal
					app.trigger('modal:close');
				}
			});

			self.remove('data.track_ids', track.id);
		}, 'Remove Track?', ['Cancel', 'Delete']);
	},
	track_get_verts: function (track_model, cb) {
		app.log('we got verts', track_model.id);

		this._update_sisbot('get_track_verts', { id: track_model.id }, function (obj) {
			app.log('track get verts', obj);

			if (obj.err) {
				return app.plugins.n.notification.alert('There was an error getting the tracks verts.');
			} else if (obj.resp) {
				cb(obj.resp);
			}
		});
	},
	/******************** PLAYBACK ********************************************/
	play: function () {
		var self = this;
		this.set('data.state', 'playing');

		// check for fault
		if (this.get('data.fault_status') != 'false') {
			return app.plugins.n.notification.alert('Please fix fault status',
				function (resp_num) {
					if (resp_num == 1) {
						return;
					}
				}, 'Unable to Play', ['OK']);
		}

		this._update_sisbot('play', {}, function (obj) {
			if (obj.resp) app.manager.intake_data(obj.resp);

			// TESTING: Siri shortcut
			self._donate_siri({
				action: 'play',
				phrase: 'Play'
			});
		});
	},
	pause: function () {
		var self = this;
		this.set('data.state', 'paused');
		this._update_sisbot('pause', {}, function (obj) {
			if (obj.resp) app.manager.intake_data(obj.resp);

			// TESTING: Siri shortcut
			self._donate_siri({
				action: 'pause',
				phrase: 'Pause'
			});
		});
	},
	home: function () {
		var self = this;

		// check for fault
		if (this.get('data.fault_status') != 'false') {
			return app.plugins.n.notification.alert('Please fix fault status',
				function (resp_num) {
					if (resp_num == 1) {
						return;
					}
				}, 'Unable to Home', ['OK']);
		}

		this.set('data.state', 'homing');
		this._update_sisbot('home', { clear_tracks: true }, function (obj) {
			if (obj.resp) app.manager.intake_data(obj.resp);
		});
		return this;
	},
	jog_start: function (jog_type) {
		// check for fault
		if (this.get('data.fault_status') != 'false') {
			return app.plugins.n.notification.alert('Please fix fault status',
				function (resp_num) {
					if (resp_num == 1) {
						return;
					}
				}, 'Unable to Jog', ['OK']);
		}
		app.log('Jog Start', jog_type);

		this.set('jog_type', jog_type).set('is_jogging', true)._jog();
		return this;
	},
	jog_end: function (jog_type) {
		app.log('Jog End', jog_type);
		this.set('is_jogging', false).set('jog_type', '');
		return this;
	},
	_jog: function () {
		var self = this;

		if (this.get('is_jogging') == true) {
			var jog_type = this.get('jog_type');

			self._update_sisbot(jog_type, {}, function () {
				setTimeout(function () {
					self._jog();
				}, 100);
			});
		}

		return this;
	},
	/******************** AUTODIM ******************************************/
	set_autodim: function () {
		var new_value = app.plugins.bool_opp[this.get('data.is_autodim')];

		this.set('data.is_autodim', new_value);

		this._update_sisbot('set_autodim', { value: new_value }, function (obj) {
			app.log('autodim', obj);
			if (obj.resp) app.manager.intake_data(obj.resp);
		});

		return this;
	},
	/******************** CSON OVERRIDE ******************************************/
	confirm_cson: function() {
		var self = this;

		// make sure a change occured
		app.log("Confirm CSON", this.get('data.table_settings'), this.get('edit.table_settings'));
		var edit_value = this.get('edit.table_settings');
		var data_value = this.get('data.table_settings');
		if (!edit_value.cson || edit_value.cson == 'missing.cson') return app.plugins.n.notification.alert('Please select a Configuration for your Sisyphus.');

		app.plugins.n.notification.confirm("A restart is required for the changes to take effect.",
			function (resp_num) {
				app.log("Confirm resp", resp_num);
				if (resp_num == 1) {
					return self;
				} else {
					self.save_to_sisbot(self.get('edit'), function (obj) {
						if (obj.err) return app.log("Save error", obj.err);

						if (obj.resp) app.manager.intake_data(obj.resp);

						// don't show in select for this table again
			      app.manager.set('show_cson_select', 'false');

						self.restart();
					});
				}
			}, 'Confirm', ['Cancel', 'Save']);
	},
	confirm_advanced_settings: function () {
		var self = this;

		// make sure a change occured
		app.log("Advanced Update", this.get('data.table_settings'), this.get('edit.table_settings'));
		var edit_value = this.get('edit.table_settings');
		var data_value = this.get('data.table_settings');
		var edit_camera = this.get('edit.is_camera');
		var data_camera = this.get('data.is_camera');
		if (JSON.stringify(edit_value) == JSON.stringify(data_value) && edit_camera == data_camera) return app.trigger('session:active', { secondary: 'advanced_settings' });

		app.plugins.n.notification.confirm("Changing these settings may cause your table to not function as expected.",
			function (resp_num) {
				app.log("Confirm resp", resp_num);
				if (resp_num == 1) {
					return self;
				} else {
					self.save_to_sisbot(self.get('edit'), function (obj) {
						if (obj.err) return app.log("Save error", obj.err);

						if (obj.resp) app.manager.intake_data(obj.resp);

						// go back a page
						app.trigger('session:active', { secondary: 'advanced_settings' });

						app.plugins.n.notification.alert('A restart is required for the changes to take effect.');
						self.restart();
					});
				}
			}, 'Confirm', ['Cancel', 'Save']);
	},
	/******************** VERSIONING ******************************************/
	check_for_csons: function () {
		var self = this;

		// update table_settings value
		this.set('edit.table_settings.cson', this.get('data.cson'));
		this.set('data.table_settings.cson', this.get('data.cson'));

		// init homingOffset for slider
		if (this.get('edit.table_settings.homingOffset') == undefined) this.set('edit.table_settings.homingOffset', 0);
		if (this.get('edit.is_servo') == 'true') this.set('edit.table_settings.homingOffset', 0);

		if (this.get('csons') == 'false') { // only bother loading once
			this._update_sisbot('get_csons', {}, function (cbb) {
				app.log("CSONs", cbb.err, cbb.resp);

				self.set('csons', cbb.resp);
			});
		}
	},
	check_for_version_update: function () {
		var self = this;
		var version = this.get('data.software_version').split('.');

		app.log("Check for version update", version, app.manager.get('remote_versions'));

		this.is_legacy();

		// callback function
		function on_cb() {
			var local = self.get('local_versions');
			var remote = app.manager.get('remote_versions');
			var has_update = false;

			if (!remote) {
				// in case remote server is down/not allowed
				if (version[0] == '1' && version[1] == '0') self.set('has_software_update', 'true');	// ALWAYS ALLOW UPGRADE FROM V1.0.X
				else if (+version[1] % 2 == 1) self.set('has_software_update', 'true'); // beta.. Always allow download

				return this;
			}

			_.each(local, function (local_version, repo) {
				var remote_version = remote[repo];
				var remote_revisions = remote_version.split('.');
				var local_revisions = local_version.split('.');
				var local_is_newer = false;

				for (var i = 0; i < local_revisions.length; i++) {
					if (+local_revisions[i] > +remote_revisions[i]) {
						local_is_newer = true;
					} else if (+local_revisions[i] < +remote_revisions[i]) {
						has_update = true;
					}
					if (has_update == true || local_is_newer == true) {
						break;
					}
				}
			});

			self.set('has_software_update', '' + has_update);

			if (version[0] == '1' && version[1] == '0') {
				// ALWAYS ALLOW UPGRADE FROM V1.0.X
				self.set('has_software_update', 'true');
				//return this; // NO LONGER NEEDED BECAUSE MASTER IS PAST 1.0.9
			} else if (+version[1] % 2 == 1) {
				// beta.. Always allow download
				self.set('has_software_update', 'true');
			}

			app.log("Software Update Result:", self.get('has_software_update'));
		}

		if (this.get('data.is_internet_connected') == 'false') {
			// hotspot.. Can't get status
			app.log("No internet, no software update");
			return this.set('has_software_update', 'false')
		}

		if (this.get('is_connected')) this.check_local_versions(function() {
			app.manager.check_remote_versions(on_cb); // make sure we have the most recent remote
		});

		return this;
	},
	check_local_versions: function (cb) {
		var self = this;

		app.log("Check local versions");

		if (app.config.env == 'alpha') {
			this.set('local_versions', { api: '1.0.3', app: '1.0.9', proxy: '0.5.6', sisbot: '1.0.8' });
			if (cb) cb();
			return this;
		}

		this._update_sisbot('latest_software_version', {}, function (cbb) {
			self.set('local_versions', cbb.resp);

			if (cbb.resp && cbb.resp.sisbot) {
				var sisbot_v = cbb.resp.sisbot.split('.');
				var sisbot_version = (+sisbot_v[0] * 1000000) + ((+sisbot_v[1] + +sisbot_v[1] % 2) * 1000) + +sisbot_v[2];
				if (self.get('sisbot_version') != sisbot_version) self.set('sisbot_version', sisbot_version);
				app.log("Local sisbot version:", cbb.resp.sisbot, self.get('sisbot_version'));
			}

			if (cb && _.isFunction(cb)) cb();
		});

		return this;
	},
	check_local_branches: function (cb) {
		var self = this;
		this._update_sisbot('software_branch', {}, function (cbb) {
			self.set('local_branches', cbb.resp);

			// var branch_labels = [];

			/* set bool for knowing if on master
			var is_master_branch = 'true';
			_.each(self.get('local_branches'), function(branch) {
				if (branch != 'master') {
					is_master_branch = 'false';
					if (branch_labels.indexOf(branch) < 0) branch_labels.push(branch);
				}
			});
			self.set('is_master_branch', is_master_branch); // reset

			// make clear string for displaying
			if (branch_labels.length > 0) self.set('branch_label', branch_labels.join());
			else self.set('branch_label', 'false');
			*/

			if (cb) cb(null, cbb.resp);
		});
	},
	check_remote_versions: function (cb) {
		var self = this;
		app.log("Check Remote Versions");

		var obj = {
			_url: app.config.get_api_url(),
			_type: 'POST',
			endpoint: 'latest_software_version',
			data: {}
		};

		app.post.fetch(obj, function (cbb) {
			self.set('remote_versions', cbb.resp);
			if (cb) cb(); //this invokes the callback if there is a respone passed into this function.
		}, 0);

		return this;
	}
};
