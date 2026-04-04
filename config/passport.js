import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { db } from '../config/db.js';
import { ObjectId } from 'mongodb';

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const usersCollection = db.collection('users');

        let user = await usersCollection.findOne({ googleId: profile.id });

        if (!user) {
          const result = await usersCollection.insertOne({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails?.[0]?.value || '',
          });

          user = await usersCollection.findOne({ _id: result.insertedId });
        }

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, String(user._id));
});

passport.deserializeUser(async (id, done) => {
  try {
    const usersCollection = db.collection('users');
    const user = await usersCollection.findOne({
      _id: new ObjectId(id),
    });

    done(null, user || false);
  } catch (error) {
    done(error, null);
  }
});