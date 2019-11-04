
var FileSaver = require('file-saver');

export function transformFile(transformResult) {
   
    // var oldStr = readFile("D:\\gitRepository\\weex\\weexdemo\\src\\GlideImpl.java")
    var oldStr = getFileContent(selectedFile, function result(content) {
        var remove_empty = /(?<=\n)\s*?\n/g;
        // var bufferContent = fs.readFileSync(srcPath);
        var content = bufferContent.toString();
        var remove_empty_result = content.replace(remove_empty, "");
        //移除注释
        var remove_comment_back_splash = /\/\*{1,2}[\s\S]*?\*\//g
        var back_splash_result = remove_empty_result.replace(remove_comment_back_splash, "");
        var remove_double_splash = /\/\/[\s\S]*?\n/g
        var double_splash_result = back_splash_result.replace(remove_double_splash,"")

        var count = double_splash_result.match(/\n/g).length;
        console.log("total count: " + count)
        transformResult(double_splash_result,count)
        // var blob = new Blob([newStr], { type: "text/plain;charset=utf-8" });
        // FileSaver.saveAs(blob, "newGlide.txt")
    })
}

function getFileContent(file, callback) {
    if (window.FileReader) {
        var reader = new FileReader();
        reader.onloadend = function (evt) {
            if (evt.target.readyState == FileReader.DONE) {
                callback(evt.target.result);
            }
        };
        // 包含中文内容用gbk编码
        reader.readAsText(file);
    }
};

function readFile(path) {
    var fso;
    try {
        fso = new ActiveXObject("Scripting.FileSystemObject");
    } catch (e) {
        alert("当前浏览器不支持");
        return;
    }
    var openf1 = fso.OpenTextFile("1.txt");
    var str2 = openf1.ReadAll();
}

function writeFile(path, content) {
    var fso;
    try {
        fso = new ActiveXObject("Scripting.FileSystemObject");
    } catch (e) {
        alert("当前浏览器不支持");
        return;
    }
    var f1 = fso.createtextfile(path, true);
    f1.write(content);
}
