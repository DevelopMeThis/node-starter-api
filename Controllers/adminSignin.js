import jwt from 'jsonwebtoken';

const createToken = (user, res, next) => {
	const { id, email, name, username } = user;
	const payload = {
		_id: id,
		email,
		name,
		username,
	};
	console.log(payload);
	// create a token
	jwt.sign(
		payload,
		process.env.SECRET,
		{
			expiresIn: '1d',
		},
		(err, token) => {
			// Error Create the Token
			if (err) {
				res.status(500);
				next(new Error('Unable to generate Token.'));
			} else {
				// Token Created
				res.json({
					token,
				});
			}
		},
	);
};
const adminSignin = (req, res, next) => {
	const { email, password } = req.body;
	if (email == 'admin@gmail.com' && password == 'admin') {
		const user = {
			id: '007',
			email: 'admin@gmail.com',
			name: 'admin',
			username: 'admin',
		};
		createToken(user, res, next);
	} else {
		res.status(400);
		next(new Error('Invalid Password'));
	}
};

export default adminSignin;
