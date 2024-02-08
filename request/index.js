const BASE_URL = "https://reqres.in/api/users";
const url2 = "https://reqres.in/api/users?page=2";

// const api = fetch(url2)
// .then(response => {
// 	console.log(response.json());
// })

class Users {
	#users = [];
	#usersListRef;
	#loaderRef;
	#loadMoreRef;
	#currentPage = 1;

	constructor() {
		this.#usersListRef = document.querySelector(".users");
		this.#loaderRef = document.querySelector(".loading");
		document.querySelector(".load-more").addEventListener('click', this.#loadMore)
		this.#getUsers(BASE_URL);
	}

	async #getUsers(url) {
		this.#setLoading(true);
		try {
			const response = await fetch(url);
			if (!response.ok) throw new Error("response ne ok");
			const { data } = await response.json();
			this.#setLoading(false);
			this.#users = data.sort(sortNames);
			this.#renderUsers();
		} catch (e) {
			this.#setLoading(false);
		}
	}
	#renderUsers() {
		console.log(this.#users);
		let template = "";
		this.#users.forEach((user) => {
			template += this.#buildUserTemplate(user);
		});

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

	#loadMore() {
		alert('load more');
		const nextPage = this.#currentPage++;
		const url = `${BASE_URL}?page=${nextPage}`
		this.#getUsers(url)
	}
}

const users = new Users();
