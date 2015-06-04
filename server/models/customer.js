const config = require('../config.json');
const Q = require('q');
const qajax = require('qajax');
const urljoin = require('url-join');

module.exports = function(Customer) {
	

	/**
	 * login with soundcloud
	 */
		Customer.loginWithSoundcloud = loginWithSoundcloud;
		Customer.remoteMethod(
			'loginWithSoundcloud',
			{
				description: 'Authenticates a user with a Soundcloud account',
				http:{path: '/loginWithSoundcloud', verb:"get"},
				accepts:[
					{ arg: 'soundcloudAccessToken', type: 'string', require:'true', http:{ source:'query' } }
				],
				returns:[
					{arg: 'token', type: 'object', description: 'Local access token'}
				]
			}
		);

		function loginWithSoundcloud(soundcloudAccessToken, cb) {

			console.log('login with soundcloud begins')
			findSoundcloudUser()
				.then(checkUserExist)
				.then(signup)
				.then(createAccessToken)
				.then(returnToken)
				.catch(returnError);


			/**
			 * find soundcloud user via soundcloud oAuth endpoint
			 * @return {[type]}
			 */
			function findSoundcloudUser() {
				console.log('find Soundcloud User' )
				return qajax({
						url: urljoin(config.services.soundcloud.url, '/me.json?oauth_token=' + soundcloudAccessToken),
						method: "GET"
					})
					.then(qajax.filterSuccess)
					.then(qajax.toJSON);
			}

			/**
			 * check if user exists in the database
			 * @param  {[type]}
			 * @return {[type]}
			 */
			 
			function checkUserExist(scUser) {
				console.log('check user exist');
				var q = Q.defer();
				Customer.findOne({where:{soundcloudId: scUser.client_id}}, function(err, customer) {
					if(err) {
						q.reject(err);
					} else {
						(customer ? q.resolve(customer) : q.resolve(scUser));
					}
				});
				return q.promise;
			}

			/**
			 * signup user if not exit
			 * @param  {object} customer object or soundcloud user
			 * @return {function} promise
			 */
			function signup(customerOrScUser) {
				console.log('sign up');
				// TODO: signup process
				var q = Q.defer();
				if (!customerOrScUser.dateAddedToDb) {
					Customer.create({
						displayName: customerOrScUser.displayName || '',
						soundcloudId: customerOrScUser.id || '',
					  last_name: customerOrScUser.last_name || '',
						first_name: customerOrScUser.first_name || '',
						email: customerOrScUser.username + '@glwave.co' || '', //fake an email as we don't get it from soundcloud
						password: (Math.random() * 1000) + 'random',
						dateAddedToDb: new Date(),
				  	username: customerOrScUser.username || '',
					  soundcloudData: {
					  	full_name: customerOrScUser.full_name || '',
						  kind: customerOrScUser.kind || '',
						  permalink: customerOrScUser.permalink || '',
						  last_modified: customerOrScUser.last_modified || '',
						  uri: customerOrScUser.uri || '',
						  permalink_url: customerOrScUser.permalink_url || '',
						  avatar_url: customerOrScUser.avatar_url || '',
						  country: customerOrScUser.country || null,
						  description: customerOrScUser.description || '',
						  city: customerOrScUser.city || '',
						  // discogs_name: customerOrScUser.discogs_name || null,
						  // myspace_name: customerOrScUser.myspace_name || null,
						  website: customerOrScUser.website || '',
						  website_title: customerOrScUser.website_title || '',
						  online: customerOrScUser.online || false,
						  track_count: customerOrScUser.track_count || 0,
						  playlist_count: customerOrScUser.playlist_count || 0,
						  // plan: customerOrScUser.plan || '',
						  // public_favorites_count: customerOrScUser.public_favorites_count || 0,
						  // followers_count: customerOrScUser.followers_count || 0,
						  // followings_count: customerOrScUser.followings_count ||  0,
						  // subscriptions: customerOrScUser.subscriptions || [],
						  // upload_seconds_left: customerOrScUser.upload_seconds_left || 0,
						  // quota: customerOrScUser.quota || {},
						  // private_tracks_count: customerOrScUser.private_tracks_count || 0,
						  // private_playlists_count: customerOrScUser.private_playlists_count || 0,
						  // primary_email_confirmed: customerOrScUser.primary_email_confirmed || false,
						  // locale: customerOrScUser.locale: || 0
						}

						
					}, function(err, customer) {
						console.log('customer created', customer);
						(err ? q.reject(err) : q.resolve(customer));
					});
				} else {
					q.resolve(customerOrScUser);
				}
				return q.promise;
			}

			function createAccessToken(customer) {
				console.log('create access token', customer);
				q = Q.defer();
				customer.createAccessToken((60 * 60 * 24 * 7), function(err, token) {
					console.log('creating accessToken...', token, err);
					(err ? q.reject(err) : q.resolve(token));
				});
				return q.promise;
			}

			function returnToken(token) {
				console.log('return token', token);
				cb(null, token);
			}

			function returnError(err) {
				console.log('returnnn error', err)
				cb(err);
			}


		}
}
