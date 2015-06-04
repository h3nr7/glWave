let Endpoint = require('services/endpoints/Endpoint');
let path = require('path');

class User extends Endpoint {

	constructor() {
		super('Customers');
	}

	loginWithSoundcloud(token) {
		let url = path.join(this.url, 'loginWithSoundcloud');
		let data = {soundcloudAccessToken: token};
		return this.request(url, 'GET', data);
	}
}

module.exports = new User();
