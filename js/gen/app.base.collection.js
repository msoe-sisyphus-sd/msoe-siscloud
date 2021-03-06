app.base.collection = Backbone.Collection.extend({
	initialize	: function () {
		//
	},
	get: function (model_obj) {
		var model = Backbone.Collection.prototype.get.call(this, model_obj);
		if (!model && app.plugins.is_uuid(model_obj)) {
			var model = this.fetch_nx(model_obj);
		}
		return model;
	},
	fetch_nx: function (id) {
		var model = app.collection.add({ id: id });
		model.set('is_fetched','false').fetch();
		return model;
	},
	exists: function (model_obj) {
		var model = Backbone.Collection.prototype.get.call(this, model_obj);
		return (model) ? true : false;
	},
	add: function (models, options) {
		if (models == null) return this;

		this.merge_existing(models);
		options = _.extend({}, options, { parse: true });
		return Backbone.Collection.prototype.add.call(this, models, options);
	},
	upsert: function (data_obj) {
		var model = Backbone.Collection.prototype.get.call(this, data_obj.id);
		if (model) {
			model.set('data', data_obj);
		} else {
			model = this.add(data_obj);
		}
		return model;
	},
	merge_existing: function (models) {
		if (!_.isArray(models)) models = [ models ];
		var self = this;

		_.each(models, function (m) {
			if (m.id && !m.cid) {	// we can add model instances to a collection.. ignore these
				var m2 = Backbone.Collection.prototype.get.call(self, m.id);
				if (m2) m2.on_fetch(m);
			}
		});
	},
	export: function () {
		return this.map(function (m) { return m.export(); });
	},
	outgoing: function (action, neuron, cb) {
		var data = neuron.export();
		if (!data) return false;	// we dont want to export
		data.endpoint = '/sisbot/'+action; // TESTING!!
		app.plugins.fetch(data, cb);
	},
	/************************* CLUSTERS ***************************************/
	clusters: {
		//'stringified'		: 'subcoll'
	},
	get_cluster: function (query_string) {
		if (_.isObject(query_string))
			query_string = JSON.stringify(query_string);

		if (this.clusters[query_string])
			return this.clusters[query_string];

		var query					= app.plugins.json.parse(query_string);
		var subquery			= new app.base.cluster(null, { model: app.model.neuron });
		this.clusters[query_string]	= subquery;
		subquery.on_init({ query: query });

		return subquery;
	},
	query: function (query_obj) {
		var query_obj		= app.plugins.json.parse(query_obj);
		var subquery		= this.get_cluster(app.plugins.json.stringify(query_obj.msg));

		var neuron			= new this.model({ data: query_obj.msg });
		this.outgoing(query_obj.action, neuron);

		return subquery;
	},
	/************************* PRIVATE ****************************************/
	_erase_type: function (type) {
		var obj = app.collection.get_cluster({ type: type });
		this._erase_coll(obj);
	},
	_erase_coll: function (coll) {
		function delete_one() {
			if (coll.length == 0) return false;

			var curr = coll.at(0);
			curr._erase();

			setTimeout(delete_one, 100);
		}

		delete_one();
	},
	watch_fetch: function (models, ctx, cb, params) {
		var self		= this;
		var all_fetched = true;

		_.each(models, function (model) {
			var is_fetched = model.get('is_fetched');
			if (is_fetched !== 'true')
				all_fetched = false;
		});

		if (all_fetched == true) {
			return cb.call(ctx, params);
		}

		setTimeout(function () {
			self.watch_fetch(models, ctx, cb, params);
		}, 100);
	},
	/************************* RESET ******************************************/
	on_init: function () {
		var session = this.get('current_session');
		if (!session) session = app.neuron({ type: 'session', id: 'current_session' });
		this.remove(session);

		this.invoke('stopListening');
		this.reset();

		var _data	= JSON.parse(JSON.stringify(app.data));

		this.add(_data);
		this.add(session);
		session.on_reset();
	}
});
