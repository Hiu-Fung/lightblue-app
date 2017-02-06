//var buffer = require('buffer');
var AsyncStorage = require('react-native').AsyncStorage;
var _ = require('lodash');
//HF: New bridge code implementation
var encoding = require('NativeModules').Encoding;

const authKey = 'auth';
const userKey = 'user';

class AuthService {
	getAuthInfo(cb){
		AsyncStorage.multiGet([authKey, userKey], (err, val)=> {
			if(err){
				return cb(err);
			}

			if(!val){
				return cb();
			}
			// Not sure why it works in the tutorial, but it should be the .fromPairs method.
			var zippedObj = _.fromPairs(val);

			if(!zippedObj[authKey]){
				return cb();
			}

			var authInfo = {
				header: {
					Authorization: 'Basic ' + zippedObj[authKey]
				},
				user: JSON.parse(zippedObj[userKey])
			}
			// We pass null as the 1st param to indicate that it was successful and didn't experience an error
			return cb(null, authInfo);
		})
	}

	login(creds, cb){
        var authStr = creds.username + ':' + creds.password;
		//var b = new buffer.Buffer();
		//var encodedAuth = b.toString('base64');

        //HF: New bridge code implementation
        encoding.base64Encode(authStr, (encodedAuth)=>{
            fetch('https://api.github.com/user',{
                headers: {
                    'Authorization': 'Basic ' + encodedAuth
                }
            })
            .then((response)=> {
                if(response.status >= 200 && response.status < 300){
                    return response;
                }
                // Since this.setState expects an object which keys correspond to the property-names to set and their corresponding value
                // This is a clever way of exposing component state properties readily available to show the user
                throw {
                    badCredentials: response.status == 401,
                    unknownError: response.status != 401
                }

            })
            .then((response)=> {
                return response.json();
            })
            .then((results)=> {
                AsyncStorage.multiSet([
                    [authKey, encodedAuth],
                    [userKey, JSON.stringify(results)]
                ], (err)=> {
                    //This is the callback passed as 2nd param into the multiSet(arr, cb) method. NOT an error handler
                    if(err){
                        throw err;
                    }

                    return cb({success: true});
                });
            })
            .catch((err)=> {
                return cb(err);
            })
            // Setting showProgress back to false can also be done by mapping showProgress onto the results object:
            // this.setState(Object.assign({
            // 		showProgress: false
            // 	}, results));
            // .finally(()=> {
            // 	return cb({showProgress: false})
            // })
        });
	}
}

module.exports = new AuthService();