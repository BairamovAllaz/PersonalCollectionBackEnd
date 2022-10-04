const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
module.exports = function (passport) {
    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLEAPIKEYCLIENTID,
                clientSecret: process.env.GOOGLEAPIKEYCLIENTSECRET,
                callbackURL: 'http://localhost:5100/v1/api/sessions/google',
                proxy: true,
            },
            async (accessToken, refreshToken, profile, done) => {
                const newuser = {
                    id: profile.id,
                    firstName: profile.name.givenName,
                    lastName: profile.name.familyName,
                    email: profile.emails,
                    image : profile.photos[0].image,
                    updatedAt: new Date(),
                    createdAt: new Date()
                }
                done(false,newuser);
            },
        ))

    passport.serializeUser((user, cb) => {
        cb(null, user);
    });
    passport.deserializeUser(async (user, cb) => {
        cb(null,user)
    });

}