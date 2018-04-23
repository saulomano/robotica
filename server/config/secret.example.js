// rename this file to secret.js
module.exports = function(){
	if (process.env.NODE_ENV === 'production'){
		return {
			SESSION_SECRET: 'topsecretvalue',
			GOOGLE_ID: '',
			GOOGLE_SECRET: ''
		};
	}
	return {
		SESSION_SECRET: 'topsecretvalue',
		GOOGLE_ID: '',
		GOOGLE_SECRET: ''
	};
}