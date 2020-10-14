const { spawn } = require("child_process");
const yaml = require("js-yaml");
const fs = require("fs");
const generate = require("./generate");
let args = process.argv.slice(2);
let yaml_file = args[0];
let dest = args[1];
let doc;
try {
  doc = yaml.safeLoad(fs.readFileSync(`${yaml_file}`, "utf8"));
} catch (e) {
  return console.log(e);
}
const install = spawn("install", [
  "-Dv",
  "/dev/null",
  `${dest}/${doc.name}.js`,
]);

install.on("error", (error) => {
  console.log(`error: ${error.message}`);
});

install.on("close", (code) => {
  if (code > 0) return console.log("Something is wrong");
  fs.writeFileSync(`${dest}/${doc.name}.js`, generate(doc));
  console.log(`${doc.name.slice(0, -1)}ied!!!!`.toUpperCase());
  console.log("Thanks for using __ify");
});
