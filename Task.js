class Task {
  constructor(title) {
    this.title = title;
		this.id = ++Task.counter;
    this.isDone = false;
  }

}

Task.counter = 0;

export default Task;
