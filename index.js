#!/usr/bin/env node

const fs = require("fs");

if (!fs.existsSync("tasks.json")) {
  fs.writeFileSync("tasks.json", JSON.stringify([]));
}

console.log("----- ¡Bienvenido a mi CLI! ----- ");

const args = process.argv.slice(2);

console.log(args);
