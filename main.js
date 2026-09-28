const colorButtons = document.querySelectorAll(".color-change button");
const welcomeScreen = document.querySelector("#welcome-screen");
const todoScreen = document.querySelector("#todo-screen");
const startButton = document.querySelector("#start-button");
const nameInput = document.querySelector("#name-input");
const appHeader = document.querySelector("#app-header");

let tasks = [];

colorButtons.forEach((button) => {
	button.addEventListener("click", () => {
		const selectedColor = button.dataset.color;

		document.body.style.backgroundColor = selectedColor;
		document.body.style.color = selectedColor === "#000000" ? "#ffffff" : "#222222";
	});
});

function renderTasks() {
	const taskList = document.querySelector("#task-list");

	if (!taskList) return;

	taskList.innerHTML = tasks
		.map(
			(task, index) => `
				<li>
					<span>${task}</span>
					<button type="button" class="delete-btn" data-index="${index}">Delete</button>
				</li>
			`
		)
		.join("");

	document.querySelectorAll(".delete-btn").forEach((button) => {
		button.addEventListener("click", () => {
			const index = Number(button.dataset.index);
			tasks.splice(index, 1);
			renderTasks();
		});
	});
}

startButton.addEventListener("click", function () {
	const name = nameInput.value.trim();

	if (!name) {
		alert("Please enter your name first.");
		return;
	}

	appHeader.hidden = true;
	welcomeScreen.hidden = true;
	todoScreen.hidden = false;
	todoScreen.innerHTML = `
		<h1>Welcome ${name}</h1>
		<h2>To-Do List</h2>
		<form id="task-form">
			<input id="task-input" type="text" placeholder="Add a task" required>
			<button type="submit">Add task</button>
		</form>
		<ul id="task-list"></ul>
	`;

	const taskForm = document.querySelector("#task-form");
	const taskInput = document.querySelector("#task-input");

	taskForm.addEventListener("submit", function (event) {
		event.preventDefault();
		const newTask = taskInput.value.trim();

		if (!newTask) return;

		tasks.push(newTask);
		taskInput.value = "";
		renderTasks();
	});

	renderTasks();
});


