import { sign, verify } from 'jsonwebtoken';

const secret = 'kbcar';

export const signToken = (payload: any) => {
	return sign(payload, secret, {
		expiresIn: '1h',
	});
};

export const verifyToken = (token: string) => {
	return verify(token, secret);
};