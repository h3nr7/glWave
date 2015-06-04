let React = require('react');
let _ = require('underscore');
let flux = require('flux-react');
let actions = require('common/actions');
let events = require('common/events');

module.exports = flux.createStore({

	_accessToken: '',

	action: [
		'loggedInWithAccessToken'
	],

	loggedInWithAccessToken: function(token) {
		this._accessToken = token;
		if(!_.isEmpty(token))
			this.emit(events.USER_ACCESS_TOKEN_EXIST);
		else
			this.emit(events.USER_ACCESS_TOKEN_NOT_EXIST);
	},

	/**
	 * getters
	 */
	exports: {
		getAccessToken: function() {
			return this._accessToken;
		}
	}

});
