import { Schema, model } from 'mongoose';
import { compare, hash } from 'bcrypt';

export interface IUser {
	email: string;
	password: string;
	verifyPassword: (password: string) => Promise<boolean>;
}

export const UserSchema = new Schema({
	email: { type: String, required: true },
	password: { type: String, required: true },
});

UserSchema.pre('save', function (next) {
	if (!this.isModified('password')) {
		return next();
	}

	hash(this.password, 12, (err, hash) => {
		if (err) {
			return next(err);
		}
		this.password = hash;
		next();
	});
});

UserSchema.methods.verifyPassword = function (password: string): Promise<boolean> {
	return new Promise((resolve, reject) => {
		const hashedPassword = this.password;
		compare(password, hashedPassword, (err, isMatch) => {
			if (err) {
				return reject(err);
			}
			resolve(isMatch);
		});
	});
};

export const User = model<IUser>('User', UserSchema);
