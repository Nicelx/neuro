const validateName = (name) => {
	const { length } = name;
	if (typeof name !== "string") return false;
	if (length < 3 || length > 30) return false;
	const pattern = /^[а-яА-Яa-zA-z]+$/;
	return pattern.test(name);
};
const validateTel = (tel) => {
	if (tel !== "string") {
		tel = tel.toString();
	}
	let length = tel.length;

	if (tel[0] === "+") length--;

	if (length < 10 || length > 15) return false;
	const pattern = /^[\+]?[0-9]+$/;
	return pattern.test(tel);
};
const validatePassword = (password, confirm) => {
	if (password !== confirm) return false;
	if (typeof password !== "string") return false;
	const { length } = password;
	if (length < 8 || length > 40) return false;

	let isFindNumber = false;
	let isFindCapital = false;

	const capitalPattern = /[A-Z]/;
	const numberPattern = /[0-9]/;

	for (let i = 0; i < length; i++) {
		let char = password[i];
		if (capitalPattern.test(char)) {
			isFindCapital = true;
		}
		if (numberPattern.test(char)) {
			isFindNumber = true;
		}
	}
	console.log(isFindCapital, isFindNumber);
	if (isFindCapital && isFindNumber) return true;
};


const ErrorEl = document.querySelector(".form__error-message");
const submitEl = document.getElementById("submit");

const removeError = (e) => {
	e.target.classList.remove("invalid");
	ErrorEl.innerText = "";
	submitEl.disabled = false;
};

const nameEl = document.getElementById("name").addEventListener("keyup", (e) => {
	const { value } = e.target;

	if (!validateName(value)) {
		e.target.classList.add("invalid");
		ErrorEl.innerText = "invalid name";
		submitEl.disabled = true;
	} else {
		removeError(e);
	}
});
const telEl = document.getElementById("tel").addEventListener("keyup", (e) => {
	const { value } = e.target;

	if (!validateTel(value)) {
		e.target.classList.add("invalid");
		ErrorEl.innerText = "invalid tel";
		submitEl.disabled = true;
	} else {
		removeError(e);
	}
});
const passwordEl = document.getElementById('password');
const ConfirmEl = document.getElementById('confirm');

ConfirmEl.addEventListener('keyup', (e) => {
	const password  = passwordEl.value;
	const confirm = e.target.value;

	if (!validatePassword(password, confirm)) {
		e.target.classList.add("invalid");
		ErrorEl.innerText = "invalid password";
		submitEl.disabled = true;
	} else {
		removeError(e);
	}
})


submitEl.addEventListener('submit', e => {
	e.preventDefault();
	console.log(e);
})









