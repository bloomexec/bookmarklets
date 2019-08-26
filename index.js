const cp = require("child_process");
const fs = require("fs");
const os = require("os");
const path = require("path");

const args = process.argv.slice(2);
const cmdDir = path.resolve(__dirname, "node_modules", ".bin");
const srcDir = "src";
const distDir = "dist";
const bookmarklet = os.type() === "Windows_NT" ? path.resolve(cmdDir, "bookmarklet.cmd") : path.resolve(cmdDir, "bookmarklet");

function runBookmarklet(file) {
  process.stdout.write(`Building ${file}...`);
  let source = path.join(srcDir, file);
  let target = path.join(distDir, file);
  cp.exec(`${bookmarklet} ${source} ${target}`, (err, stdout, stderr) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(stdout);
  });
  process.stdout.write(" DONE\n");
}

fs.readdir(srcDir, (err, files) => {
  if (err) {
    console.log(err);
    return;
  }
  files.forEach(file => {
    if (args.length !== 0 && args[0] !== file) {
      return;
    }
    runBookmarklet(file);
  });
});
