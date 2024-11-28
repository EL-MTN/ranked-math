import { sign } from 'jsonwebtoken';

const secret = 'kbcar';

export const signToken = (payload: any) => {
	return sign(payload, secret, {
		expiresIn: '1h',
	});
};
