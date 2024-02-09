var sortNames = ({ first_name: name }, { first_name: name2 }) => {
	if (name < name2) return -1;
	else return 1;
};

class Validator {
	// static emailReg =new RegExp( /^\S+@\S+\.\S+$/);
	constructor() {}
	static validateUser(user) {
		if (!user) return { isValid: false, message: "user is not exist" };
		const { id, first_name, last_name, avatar, email } = user;

		if (!(id && first_name && last_name && email && avatar))
			return { isValid: false, message: "some property doesnt exist" };
		if (typeof id !== "number") return { isValid: false, message: "id has invalid type" };
		if (
			typeof first_name !== "string" ||
			typeof last_name !== "string" ||
			typeof email !== "string" ||
			typeof avatar !== "string"
		)
			return { isValid: false, message: "one field has invalid type" };
		return {
			isValid: true
		}
	}
}