const fs = require('fs')
const directory = __dirname + "/queen"

fs.readdir(directory, (err, files) => {
  const result = files.reduce((acc, fileName) => {
    const flacMatch = /\d{2} (.*)\.flac$/.exec(fileName)
    if (!flacMatch)
      return acc

    return [...acc, {
      name: flacMatch[1],
      version: '',
      // version: 'album version',
      //      compositor: ['Brian May'],
      subversion: "2011 remaster by Adam Ayan",
    }]
    // if (!fs.lstatSync(directory + fileName).isDirectory()) {
    //     const [_, a, fileNumber, ...rest] = fileName.split(" ")
    //     fs.renameSync(directory + fileName, directory + "1972 0" + (Number(fileNumber) - 10) + " " + rest.join(" "))
    // }
  }, [])

  console.log(result)
})
