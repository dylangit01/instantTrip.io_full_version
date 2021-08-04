import UserModel from '../models/userModel.js';

import bcrypt from 'bcryptjs';
// used to hash the password
import jwt from 'jsonwebtoken';
// used to store the users in a browser in a safe way

const secret = 'test';

export const signIn = async (req, res) => {
	const { email, password } = req.body;
	try {
		const existUser = await UserModel.findOne({ email });
		if (!existUser) return res.status(404).json({ message: "User doesn't exist!" });
		const isPasswordCorrect = await bcrypt.compare(password, existUser.password);
		if (!isPasswordCorrect) return res.status(400).json({ message: 'Invalid credentials' });

		// If user exists and correct password, create the token, 'test' is the secret string which usually put in a separate env file, so nobody can see.
		const token = jwt.sign({ email: existUser.email, id: existUser._id }, secret, { expiresIn: '1h' });

		res.status(200).json({ result: existUser, token });
	} catch (error) {
		res.status(500).json({ message: 'Something went wrong' });
	}
};

export const signUp = async (req, res) => {
	const { firstName, lastName, email, password, confirmPassword } = req.body;

	try {
		const existUser = await UserModel.findOne({ email });
		if (existUser) return res.status(400).json({ message: 'User already exists' });
		if (password !== confirmPassword) return res.status(400).json({ message: "Password don't match." });

		// '12' is the Salt length to generate or salt to use
		const hashedPassword = await bcrypt.hash(password, 12);

		const result = await UserModel.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });
		const token = jwt.sign({ email: result.email, id: result._id }, secret, { expiresIn: '1h' });
		
		res.status(201).json({ result, token });
	} catch (error) {
		res.status(500).json({ message: 'Something went wrong.' });
		console.log(error);
	}
};
