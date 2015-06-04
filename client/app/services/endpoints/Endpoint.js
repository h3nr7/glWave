let qajax = require('qajax');
let path = require('path');

class Endpoint {

	constructor(url) {
		this.url = '/api/' + url;
	}

	create(data) {
		return this.request(this.url, 'POST', {}, data)
	}

	list(params, cancellation) {
		
	}

	update(id, data) {
		return this.request(path.join(this.url, id.toString(), 'PUT', {}, data));
	}

	request(url, method='GET', params = {}, query = {}, cancellation) {
		let config = {}
		config.url = url;
		config.method = method;
		config.params = params;
		if(cancellation) config.cancellation = cancellation;

		return qajax(config)
			.then(qajax.filterSuccess)
			.catch(qajax.toJSON);
	}



}

module.exports = Endpoint;