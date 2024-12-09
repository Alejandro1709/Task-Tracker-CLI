#!/usr/bin/env node
const fs = require("fs");
const { handleSaveTask } = require("./actions");

if (!fs.existsSync("tasks.json")) {
  fs.writeFileSync("tasks.json", JSON.stringify([]));
}

const tasks = JSON.parse(fs.readFileSync("tasks.json"));

const [, , command, input, val] = process.argv;

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
    updateTask(input, val);
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
    description: input,
    status: "todo",
    createdAt: new Date(),
    updatedAt: new Date(),
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

function updateTask(id, val) {
  if (!id) return;
  const mapped = tasks.map((t) =>
    t.id === +id ? { ...t, description: val, updatedAt: new Date() } : t
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
