import { Request, Response } from 'express';
import { User } from '../models/User';
import { signToken } from '../lib/jwt';

export const userLogin = async (req: Request, res: Response) => {
	const user = await User.findOne({ email: req.body.email });
	if (!user) {
		return res.status(401).send({ error: 'Invalid email or password' });
	}

	const valid = await user.verifyPassword(req.body.password);
	if (!valid) {
		return res.status(401).json({ error: 'Invalid email or password' });
	}

	const token = signToken({ id: user._id });

	return res.json({ token });
};

export const userRegister = async (req: Request, res: Response) => {
	const user = new User(req.body);
	await user.save();

	const token = signToken({ id: user._id });

	return res.json({ token });
};

export const verifyAuth = (req: Request, res: Response) => {
	res.send('User is authenticated');
};
