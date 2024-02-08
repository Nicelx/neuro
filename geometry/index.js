const geometryElement = document.querySelector('.geometry');

const circleEl = geometryElement.querySelector('.geometry__circle')
const triangleEl = geometryElement.querySelector('.geometry__triangle')
const squareEl = geometryElement.querySelector('.geometry__square')
const rectEl = geometryElement.querySelector('.geometry__rect')



circleEl.addEventListener('click', () => {
	circleEl.classList.add('geometry__circle_animate');
	setTimeout(() => {
		circleEl.classList.remove('geometry__circle_animate');
	}, 1000)
})
triangleEl.addEventListener('click', () => {
	triangleEl.classList.add('geometry__triangle_animate');
	setTimeout(() => {
		triangleEl.classList.remove('geometry__triangle_animate');
	}, 5000)
})
squareEl.addEventListener('click', () => {
	squareEl.classList.add('geometry__square_animate');
	setTimeout(() => {
		squareEl.classList.remove('geometry__square_animate');
	}, 5000)
})
rectEl.addEventListener('click', () => {
	rectEl.classList.add('geometry__rect_animate');
	setTimeout(() => {
		rectEl.classList.remove('geometry__rect_animate');
	}, 3000)
})