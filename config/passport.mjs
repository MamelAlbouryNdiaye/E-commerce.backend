import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import bcrypt from 'bcrypt';
import User from '../models/User.mjs'; 
import dotenv from 'dotenv';
dotenv.config();

export default function(passport) {
  ///////////////// Local strategy (email + password) ///////////////////
  passport.use(
    'local',
    new LocalStrategy(
      { usernameField: 'email',
        passwordField: 'password',
        session: false 
      },
      async (email, password, done) => {
        try {
          const user = await User.findOne({ email });
          if (!user) return done(null, false, { message: 'user not found' });

          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) return done(null, false, { message: 'invalid password' });

          /////// + to remove the password before returning the user  /////
          const safeUser = user.toObject();
          delete safeUser.password;
          return done(null, safeUser);
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  //////// JWT strategy (protect API routes) //////////
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
  };

  passport.use(
    new JwtStrategy(opts, async (payload, done) => {
      try {
        const user = await User.findById(payload.id).select('-password');
        if (user) return done(null, user);
        return done(null, false);
      } catch (err) {
        return done(err, false);
      }
    })
  );
}
