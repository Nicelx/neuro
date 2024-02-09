const BASE_URL = "https://reqres.in/api/users";

class Users {
	#users = [];
	#usersListRef;
	#loaderRef;
	#currentPage = 1;
	#isNoMoreToLoad = false;

	constructor() {
		this.#usersListRef = document.querySelector(".users");
		this.#loaderRef = document.querySelector(".loading");
		this.#getUsers(BASE_URL);
	}

	async #getUsers(url) {
		this.#setLoading(true);
		try {
			const response = await fetch(url);
			if (!response.ok) throw new Error("response ne ok");

			const { data, total } = await response.json();

			if (!data) throw new Error("no data");
			// validation tests
			// data[1].avatar = '';
			// data[2].first_name = 234;

			data.forEach((user) => {
				const { isValid, message } = Validator.validateUser(user);
				if (!isValid) throw new Error(`Validation: ${message}`)
			});

			this.#setLoading(false);

			this.#users = [...this.#users, ...data].sort(sortNames);

			if (this.#users.length >= total) {
				this.#isNoMoreToLoad = true;
			}

			this.#renderUsers();
		} catch (e) {
			this.#setLoading(false);
			console.error(e)
		}
	}
	#renderUsers() {
		let template = "";
		this.#users.forEach((user) => {
			template += this.#buildUserTemplate(user);
		});

		const reg = /<script[\s\S]*?>[\s\S]*?<\/script>/gi;

		template = template.replace(reg, "");

		this.#usersListRef.innerHTML = `<ul class = "users__list">
			${template}
		</ul>`;
	}

	#buildUserTemplate(user) {
		const { first_name, last_name, avatar, email } = user;

		return `
			<li class = "users__item">
				<div class = "users__card">
					<img class = "users__avatar" src=${avatar} alt="user-avatar">
					<span class = "users__name">${first_name} ${last_name}</span>
					<span class = "users__email">${email} </span>
				</div>
			</li>
		`;
	}

	#setLoading(isLoading) {
		if (isLoading) {
			this.#loaderRef.style.display = "block";
		} else {
			this.#loaderRef.style.display = "none";
		}
	}

	loadMore = async (e) => {
		if (this.#isNoMoreToLoad) {
			e.target.disabled = true;
			e.target.innerText = "no more to load";
			return;
		}

		this.#currentPage = this.#currentPage + 1;
		const url = `${BASE_URL}?page=${this.#currentPage}`;
		await this.#getUsers(url);
	};
}

const users = new Users();
document.querySelector(".load-more").addEventListener("click", users.loadMore);
