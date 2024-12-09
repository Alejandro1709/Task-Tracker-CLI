const fs = require("fs");

function handleSaveTask(tasks) {
  fs.writeFileSync("tasks.json", JSON.stringify(tasks));
}

module.exports = { handleSaveTask };
