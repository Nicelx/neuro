const imgArray = [
	"https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg",
	"https://static.toiimg.com/photo/msid-53891743,width-96,height-65.cms",
	"https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg",
];

class Slider {
	#links;
	#sliderRef;
	#active = 0;
	#width = 900;
	#parentRef;

	constructor(links, option) {
		this.#links = [...links] || [];

		if (option) {
			this.#parentRef = option.ref || null;
		}
		this.#constructNode();
		this.#addEvents();
	}

	// #generateId() {
	// 	return Math.random().toString(16).slice(2);
	// }

	#constructNode() {
		const template = this.#constructTemplate();

		let el = document.createElement("div");

		console.log(this.#parentRef);
		if (this.#parentRef) {
			this.#sliderRef = this.#parentRef.appendChild(el)
		} else {
			this.#sliderRef = document.body.appendChild(el);
		}

		this.#sliderRef.innerHTML = template;
	}

	#constructTemplate() {
		let linksElementsString = "";
		this.#links.forEach((item, index) => {
			linksElementsString += `<div class = "slider__item"><img id = "slider__img_${index++}"class = "slider__link" src = ${item} alt = "random image"></div>`;
		});

		let template = `
			<div class = "slider">
				<div class = "slider__track">
					${linksElementsString}			
				</div>
				<div class="slider__buttons">
					<button class = "slider__prev">prev</button>
					<button class = "slider__next">next</button>
				</div>
				<script>alert('evil code')</script>
			</div>
		`;

		const scriptRegx = /<script[\s\S]*?>[\s\S]*?<\/script>/gi;

		template = template.replace(scriptRegx, "");

		return template;
	}
	#addEvents() {
		const sliderTrack = this.#sliderRef.querySelector(".slider__track");
		const prev = this.#sliderRef.querySelector(".slider__prev");
		const next = this.#sliderRef.querySelector(".slider__next");

		prev.addEventListener("click", () => {
			if (this.#active === 0) {
				this.#active = this.#links.length;
			}

			sliderTrack.style.transform = `translateX(${-this.#width * --this.#active + "px"})`;
		});
		next.addEventListener("click", () => {
			if (this.#active === this.#links.length - 1) {
				this.#active = 0;

				sliderTrack.style.transform = "translateX(0px)";
				return;
			} else {
				let translationString = `translateX(${-this.#width * ++this.#active + "px"})`;

				sliderTrack.style.transform = translationString;
			}
		});
		next.removeEventListener("click", () => {});
	}

	addImg(imgUrl) {
		if (typeof imgUrl === "string") {
			this.#links.push(imgUrl);

			this.#sliderRef.innerHTML = this.#constructTemplate();
			this.#addEvents();
		}
	}
}

const slider = new Slider(imgArray);


const someEl = document.querySelector('.some-style');
const slider2 = new Slider(imgArray, {
	ref : someEl
});

slider2.addImg(
	"https://img.freepik.com/free-photo/abstract-autumn-beauty-multi-colored-leaf-vein-pattern-generated-by-ai_188544-9871.jpg?size=626&ext=jpg&ga=GA1.1.87170709.1707350400&semt=ais"
);
