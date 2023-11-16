import  mongoose from 'mongoose';

const usersSchema = mongoose.Schema({
	name: {
		type: String,
		validate: {
			validator: (v) => {
				return /\S+/.test(v);
			},
			message: '{VALUE} is not a valid name. Name should be string.'
		}
	},
  address: {
		type: String,
	},
  waNumber: {
		type: String,
    unique: true,
    required: [true, 'Whatsapp number is required.'],
	},
	// username: {
	// 	type: String,
	// 	unique: {
	// 		args: true,
	// 		message: 'Username must be unique.'
	// 	},
	// 	required: {
	// 		arg: true,
	// 		msg: 'Username is required.'
	// 	},
	// 	validate: {
	// 		validator: (v) => {
	// 			return /^[a-zA-Z0-9.\_]{4,30}$/.test(v);
	// 		},
	// 		message: '{VALUE} is not valid, User name only allows string, numeric and underscore.'
	// 	}
	// },
	// email: {
	// 	type: String,
    //     unique: {
    //         args: true,
    //         message: 'Email must be unique.',
    //     },
	// 	required: {
	// 		arg: true,
	// 		msg: 'Email is required.'
	// 	},
	// 	validate: {
	// 		validator: (v) => {
	// 			return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v);
	// 		},
	// 		message: '{VALUE} is not valid email address, Please input valid email address.'
	// 	}
	// },
	// password: {
	// 	type: String,
	// 	select: false,
	// 	required: [true, 'Password is required.'],
	// 	validate: {
	// 		validator: (v) => {
	// 			return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/.test(v);
	// 		},
	// 		message: '{VALUE} is not strong enough, Please contain Uppercase, Lowercase, Numeric and 8 character minimum.'
	// 	}
	// },
	verification: {
		code: {
			type: String,
			default: false,
			// select: false
		},
		status: {
			type: Boolean,
			default: false
		},
		date: {
			type: Date,
			default: Date.now
		}
	},
	meta: {
		birthdate: {
			type: String,
			// validate: {
			// 	validator: (v)=>{
			// 		return /^(0[1-9]|[1-2]\d|3[0-1])-(0[1-9]|1[0-2])-\d\d\d\d$/.test(v);
			// 	},
			// 	message: '{VALUE} is not valid date format (dd-mm-yyyy)!'
			// }
		},
		img_url: {
			type: String
		}
	},
	created_date: {
		type: Date,
		default: Date.now
	},
	updated_date: {
		type: Date,
		default: Date.now
	}
});

export const UsersModel = mongoose.models.Users ?? mongoose.model('Users', usersSchema);