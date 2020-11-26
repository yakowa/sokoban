function cat() {
    var fs = require("fs");
    
    var readMe = fs.readFileSync("file.json", "utf8");
    x = JSON.parse(readMe);
    console.log(x['cat']);
    
    // fs.writeFileSync("newfile.txt", readMe)
}
