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
    const newTask = {
      id: getId(),
      message: input,
    };
    tasks.push(newTask);
    handleSaveTask(tasks);
    console.log("Task created!");
    break;
  case "view":
    for (let task of tasks) {
      console.table(task);
    }
    break;
  default:
    break;
}
