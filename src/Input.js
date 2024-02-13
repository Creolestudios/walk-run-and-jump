export default class Input {
	static mouseClick = null;
	static mouseMove = null;
	static mouseUp = null;
	static mouseDown = null;
	static mousePosition = {x: null, y: null, z: null};

	static keyUp = null;
	static keyDown = {};

	static init() {
		window.addEventListener("click", (e) => { Input._mouseClick(e) });
		window.addEventListener("mousemove", (e) => { Input._mouseMove(e) });
		window.addEventListener("mouseup", (e) => { Input._mouseUp(e)});
		window.addEventListener("mousedown",(e) => { Input._mouseDown(e)});

		window.addEventListener("keyup", (e) => { Input._keyUp(e)});
		window.addEventListener("keydown", (e) => { Input._keyDown(e)});
	}

	static _mouseClick(event) {
		Input.mouseClick = event;
	}

	static _mouseMove(event) {
		Input.mouseMove = event;
		Input.mousePosition.x = (event.clientX / window.innerWidth) * 2 - 1;
		Input.mousePosition.y = (event.clientY / window.innerHeight) * 2 + 1;
	}

	static _mouseUp(event) {
		Input.mouseUp = event;
		Input.mouseDown = null;
	}

	static _mouseDown(event) {
		Input.mouseDown = event;
	}
	static _keyDown(event) {
		Input.keyDown[event.keyCode] = event;
	}

	static _keyUp(event) {
		Input.keyUp = event;
		delete Input.keyDown[event.keyCode];
	}


	static clear() {
		Input.mouseClick = null;
		Input.mouseMove = null;
		Input.mouseUp = null;
		// Input.mouseDown = null;
		Input.mousePosition = {x: null, y: null, z: null};
		Input.keyUp = null;
	}

	constructor() {
		throw new Error("Can not create object..")
	}
}

