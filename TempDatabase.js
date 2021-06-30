import Task from "./Task.js";

const tasks = [];

const tempDatabase = {
	saveTask(taskTitle) {
		let task = new Task(taskTitle);
		tasks.push(task);
		return task.id;
	},
	
	modifyTask(taskId, newTaskTitle) {
		let task = this.findTask(taskId); 
		task.title = newTaskTitle;
	},

	deleteTask(taskId) {
		let index = tasks.findIndex(task => task.id == taskId);
		if(index >= 0) {
			tasks.splice(index, 1);
		}
	},
	
	toggleTaskIsDone(taskId) {
		let task = this.findTask(taskId); 
		task.isDone = task.isDone ? false : true;
	},
	
	findTask(taskId) {
		return tasks.find(task => task.id == taskId);
	}

}

export default tempDatabase;
