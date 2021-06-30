import tempDatabase from "./TempDatabase.js";

$(document).ready(() => {
  $("#add-task").click(createTaskElement);

  function createTaskElement() {
    let addTaskForm = $(`<input type="text" placeholder="Task title">`);
    let taskElement = $(`<div class="task"></div>`).append(addTaskForm);

    $("#tasks").append(taskElement);
    $(addTaskForm)
      .blur(createNewTask)  // Save task by unfocus input
      .select()
      .keyup(pressEnter);   // Save task by pressing enter
  }

  function modifyTask() {
    let taskId = $(this).parent().attr("id");
    let taskTitle = this.value.trim();
    let previousTaskTitle = this.name;

    // Discard changes if not provide a title or a title the same as the previous one
    if (taskTitle.length == 0 || previousTaskTitle == taskTitle) {
      let taskTitleElement = $(`<span class="task-title">${previousTaskTitle}</span>`);

      $(this).siblings(".modify-task-btn").show();
      $(this).siblings(".check-is-done").show();
      $(this).siblings(".delete-task-btn").show();
      $(this).replaceWith(taskTitleElement);
      return;
    }

    
    tempDatabase.modifyTask(taskId, taskTitle);

    let taskTitleElement = $(`<span class="task-title">${taskTitle}</span>`);
    $(this).siblings(".modify-task-btn").show();
    $(this).siblings(".check-is-done").show();
    $(this).siblings(".delete-task-btn").show();
    $(this).replaceWith(taskTitleElement);
    
  }

  function createNewTask() {
    let taskTitle = this.value.trim();

    // Discard list element if not provide a title
    if(taskTitle.length == 0) {
      $(this).parent().remove();
      return;
    }

    let taskId = tempDatabase.saveTask(taskTitle);
    let taskTitleElement = $(`<span class="task-title">${taskTitle}</span>`);
    let taskElement = $(this).parent();

    createFunctionalityButtons(taskElement);

    $(this).parent().attr("id", taskId);
    $(this).replaceWith(taskTitleElement);

  }

  function createFunctionalityButtons(taskElement) {
    let checkDoneTaskButton = $(`<button class="check-is-done"> not done</button>`);
    let modifyTaskButton = $(`<button class="modify-task-btn">Modify</button>`);
    let deleteTaskButton = $(`<button class="delete-task-btn">Delete</button>`);

    $(modifyTaskButton).click(displayModifyTaskForm);
    $(deleteTaskButton).click(deleteTask);
    $(checkDoneTaskButton).click(toggleIsDone);
    
    $(taskElement)
      .append(checkDoneTaskButton)
      .append(modifyTaskButton)
      .append(deleteTaskButton);
  }

  function displayModifyTaskForm() {
    let currentTitle = $(this).siblings(".task-title").text();
    let taskModifyForm = $(`<input type="text" name="${currentTitle}" value="${currentTitle}">`);

    $(this).hide().siblings(".task-title").replaceWith(taskModifyForm);
    $(this).siblings(".check-is-done").hide();
    $(this).siblings(".delete-task-btn").hide();

    $(taskModifyForm)
      .select()
      .blur(modifyTask)
      .keyup(pressEnter);
  }

  function toggleIsDone() {
    let taskId = $(this).parent().attr("id");
    let task = tempDatabase.findTask(taskId);

    tempDatabase.toggleTaskIsDone(taskId);

    if (task.isDone) {
      $(this).text(" done");
    } else {
      $(this).text(" not done");
    }
  }

  function deleteTask() {
    let taskId = $(this).parent().attr("id");
    tempDatabase.deleteTask(taskId);
    $(this).parent().remove();
  }

  function pressEnter(e) {
    if (e.keyCode == 13) {
      $(this).blur();
    }
  }
});
