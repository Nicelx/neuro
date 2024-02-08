const videoEl = document.querySelector(".video__video");
const timeInfoEl = document.querySelector(".video__time");

const onVideoClick = (e) => {
	if (e.target.paused) {
		e.target.play();
	} else {
		e.target.pause();
	}
};

const goFaster = (e) => {
	videoEl.currentTime = `${videoEl.currentTime + 5}`;
};


const timeFormat = (time) => {
	const date = new Date(time * 1000);
	const minutes = date.getMinutes();
	const seconds = date.getSeconds();
	const milliseconds = date.getMilliseconds();

	return `${minutes < 10 ? "0" + minutes : minutes}:${
		seconds < 10 ? "0" + seconds : seconds
	}:${milliseconds}`;
};

videoEl.addEventListener("click", onVideoClick);

videoEl.addEventListener("timeupdate", () => {
	timeInfoEl.textContent = timeFormat(videoEl.currentTime);
});
videoEl.addEventListener("ended", (e) => {
	e.target.currentTime = "0";
});

