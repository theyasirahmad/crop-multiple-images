const sharp = require("sharp");

const sizeOf = require("image-size");

const path = require("path");
const fs = require("fs");

const directoryPath = path.join(__dirname, "data");

const cropScript = () => {

  fs.readdir(directoryPath, function (err, files) {
    //handling error
    if (err) {
      return console.log("Unable to scan directory: " + err);
    }
    let count = 0;

    setInterval(() => {
      if (count < files.length) {
        asyncFunction(files[count]);
        count++;
      } else {
        return;
      }
    }, 100);
  });
};
const asyncFunction = async (image, res) => {
  let height, width;
  sizeOf(directoryPath + "/" + image, async (err, dimensions) => {
    height = Math.round(dimensions.height / 5);

    await sharp(directoryPath + "/" + image)
      .resize({
        height: height,
        width: dimensions.width,
        fit: "cover",
        position: "bottom",
      })
      .tiff({ quality: 100 })
      .toFormat("tif")
      .toFile("./cropped/" + image);
  });
};

cropScript();
