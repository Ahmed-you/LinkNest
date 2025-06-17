import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import * as usersQueries from "../database/queries/users.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if user exists
        const userRes = await usersQueries.getUserByGoogleId(profile.id);

        if (userRes.rows.length > 0) {
          return done(null, userRes.rows[0]);
        }

        // If not, create new user
        const username = profile.displayName;
        const email = profile.emails?.[0]?.value || null;

        const newUserRes = await usersQueries.createGoogleUser({
          username,
          email,
          google_id: profile.id,
        });

        return done(null, newUserRes.rows[0]);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);
