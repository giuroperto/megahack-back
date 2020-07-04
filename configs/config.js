module.exports = {
  'facebookAuth' : {
      'clientID'      : process.env.FACEBOOK_ID,
      'clientSecret'  : process.env,
      'callbackURL'     : 'http://localhost:5000/api/auth/facebook/callback',
      'profileURL': 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email'

  },

  'googleAuth' : {
      'clientID'         : process.env.GOOGLE_ID,
      'clientSecret'     : process.env.GOOOGLE_SECRET,
      'callbackURL'      : 'http://localhost:5000/auth/google/callback'
  }
};
