import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/User.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || "demo",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "demo",
      callbackURL:
        process.env.GOOGLE_CALLBACK_URL ||
        "http://localhost:5001/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = User.findByGoogleId(profile.id);

        const email = profile.emails?.[0]?.value?.toLowerCase();
        const photo = profile.photos?.[0]?.value || "";

        if (!user && email) {
          user = User.findByEmail(email);
        }

        if (user) {
          const updatedUser = User.update(user.id, {
            googleId: profile.id,
            photo,
            provider: "google",
          });

          return done(null, updatedUser);
        }

        const newUser = User.create({
          name: profile.displayName,
          username: email.split("@")[0] + Math.floor(Math.random() * 1000),
          email,
          googleId: profile.id,
          photo,
          provider: "google",
        });

        return done(null, newUser);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

export default passport;