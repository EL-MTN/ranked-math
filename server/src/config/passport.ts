import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import passport from 'passport';
import { Strategy as JwtStrategy } from 'passport-jwt';
import { User } from '../models/User';

var extractor = function (req: Request) {
	var token = null;
	if (req) {
		token = req.headers.authorization?.split(' ')[1];
	}
	return token ? token : null;
};

passport.use(
	'jwt',
	new JwtStrategy(
		{
			jwtFromRequest: extractor,
			secretOrKey: 'kbcar',
			ignoreExpiration: false,
		},
		// This function is called when a request is made to the server
		async (jwtPayload: JwtPayload, done) => {
			// Check if the user exists
			const user = await User.findOne({ id: jwtPayload.sub });
			// If the user does not exist, return an error
			if (!user) return done(null, false, { message: 'Invalid email or password' });

			return done(null, user._id);
		}
	)
);

export const passportConfig = passport;
