const chalk = require("chalk");
const fs = require("fs");
const moment = require("moment");
const path = require("path");
const LogPath = (f, p) => path.resolve(__dirname, f, p);

const fileNames = ["Error", "Info", "Debug", "Silly", "Warning"];

class Util {
  constructor(foldername) {
    this.folderName = foldername
    this.Print = this.Print.bind(this);
  }

  async MakeFolder() {
    try {
      await createLogFiles(this.folderName);
      return `done`;
    } catch (e) {
      throw e;
    }
  }

  async Print(level = "info", ...message) {
    try {
      let timestamp = moment().format("YYY-MM-DD hh:mm:ss");
      let a = level
        .toString()
        .substring(0, 1)
        .toUpperCase();
      let write = fileName =>
        writeFile(fileName, this.folderName, timestamp, message);

      switch (a) {
        case "E":
          write("Error.log");
          break;
        case "I":
          write("Info.log");
          break;
        case "D":
          write("Debug.log");
          break;
        case "S":
          write("Silly.log");
          break;
        case "W":
          write("Warning.log");
          break;
        default:
          write("Info.log");
          break;
      }

      let colorise = colorize(level);
      let pref = prefix(level);

      console.log(
        colorise(
          `
      == == == == == == == == == == == == == ==
      ${pref}
      timestamp: ${timestamp}

      LOG DATA: ${JSON.stringify(message.toString(), null, 2)}
      == == == == == == == == == == == == == ==
      `
        )
      );
    } catch (e) {
      throw e;
    }
  }
}

const writeFile = (fileName, folderN, tstamp, ...data) => {
  return new Promise((resolve, reject) => {
    let rt = fs.createWriteStream(LogPath(folderN, fileName), { flags: "a+" });
    let dt = { timestamp: tstamp, log: JSON.stringify(data.toString()) };
    resolve(rt.write(`${JSON.stringify(dt, null, 2)}\n \t \n`));
  });
};

const colorize = level => {
  let lowercase = level.toLowerCase();

  let colors = {
    error: chalk.bold.red,
    info: chalk.bold.cyan,
    warning: chalk.bold.yellow,
    debug: chalk.bold.magenta
  };

  switch (lowercase) {
    case "error":
      return colors.error;
    case "warning":
      return colors.warning;
    case "info":
      return colors.info;
    case "debug":
      return colors.debug;
    default:
      return colors.info;
  }
};

const prefix = level => {
  let touppercase = level.toUpperCase();
  switch (touppercase) {
    case "ERROR":
      return "[ERROR]";
    case "WARNING":
      return "[WARNING]";
    case "INFO":
      return "[INFO]";
    case "DEBUG":
      return "[DEBUG]";
    default:
      return "[NO LEVEL]";
  }
};

const createFolder = foldername =>
  new Promise((resolve, reject) => {
    fs.stat(path.resolve(__dirname, foldername), err => {
      if (err && err.code === "ENOENT") {
        fs.mkdir(path.resolve(__dirname, foldername), e => {
          if (e) reject(e.code);
          else resolve(`Folder created`);
        });
      } else {
        resolve("Folder exists");
      }
    });
  });

const createLogFiles = async foldername => {
  await createFolder(foldername);
  for (let i = 0; i < fileNames.length; i++) {
    await fs.createReadStream(LogPath(foldername, `${fileNames[i]}.log`), {
      flags: "a+"
    });
  }
};
module.exports = { Util };
