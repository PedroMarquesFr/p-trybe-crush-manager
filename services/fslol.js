const fs = require("fs");
const util = require("util");

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

function fsMethods() {
  return {
    list: async function () {
      try {
        const data = await readFile(`${__dirname}/../crush.json`, "utf8");
        return JSON.parse(data);
      } catch (error) {
        console.log(" - deu pau oh:", error);
        return [];
      }
    },
    add: async function (newCrush) {
      try {
        const data = await readFile(`${__dirname}/../crush.json`, "utf8");
        const datajson = [...JSON.parse(data), newCrush];
        await writeFile(
          `${__dirname}/../crush.json`,
          JSON.stringify(datajson),
          "utf8"
        );
      } catch (error) {
        console.log(" - deu pau oh:", error);
        return [];
      }
    },
    setToken: async function (token) {
      try {
        const data = await readFile(`${__dirname}/../token.json`, "utf8");
        const datajson = [...JSON.parse(data), token];
        await writeFile(
          `${__dirname}/../token.json`,
          JSON.stringify(datajson),
          "utf8"
        );
      } catch (error) {
        console.log(" - deu pau oh:", error);
        return [];
      }
    },
    getTokens: async function () {
      const data = await readFile(`${__dirname}/../token.json`, "utf8");
      return JSON.parse(data);
    },
  };
}

module.exports = fsMethods;
