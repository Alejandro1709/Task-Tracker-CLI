#!/usr/bin/env node
const fs = require("fs");
const { handleSaveTask } = require("./actions");

if (!fs.existsSync("tasks.json")) {
  fs.writeFileSync("tasks.json", JSON.stringify([]));
}

const tasks = JSON.parse(fs.readFileSync("tasks.json"));

const [, , command, input] = process.argv;

function getId() {
  if (tasks.length === 0) {
    return 1;
  } else {
    return tasks[tasks.length - 1].id + 1;
  }
}

switch (command) {
  case "add":
    createTask();
    break;
  case "view":
    listTasks();
    break;
  case "update":
    updateTask(input);
    break;
  case "delete":
    deleteTask(input);
    break;
  default:
    break;
}

function createTask() {
  const newTask = {
    id: getId(),
    message: input,
  };

  tasks.push(newTask);

  handleSaveTask(tasks);
  console.log("Task created!");
}

function listTasks() {
  for (let task of tasks) {
    console.table(task);
  }
}

function updateTask(id) {
  if (!id) return;
  const mapped = tasks.map((t) =>
    t.id === +id ? { ...t, message: "new" } : t
  );
  handleSaveTask(mapped);
  console.log("Task updated!");
}

function deleteTask(id) {
  if (!id) return;
  const filtered = tasks.filter((t) => t.id !== +id);
  handleSaveTask(filtered);
  console.log("Task deleted!");
}
