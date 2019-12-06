var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const fs = require('fs');
var multer = require('multer');
const officegen = require('officegen')

var docx = null;
//只能以Form形式上传name为mFile的文件
//var upload = multer({ dest: 'upload/'}).single('mFile');
var upload = multer({ dest: 'upload/' }).any();

//确定数据库名称vuetest
// app.use(bodyParser.json());
app.use(express.static('dist'));
app.use(express.static('template'));

//设置跨域访问
// app.all('*', function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     next();
// });

// //增加书籍
// app.post('/tranform', function(req, res, next) {
//     console.log(res.body); 
//     res.send({content:"hello"})
// });

app.get('/download', function (req, res) {
    let mark_name = req.query.mark_name
    var file = `transform_${mark_name}/ruan_zhu_download.docx`;
    res.download(file);
});

app.post('/tranform', function (req, res) {
    //重新创建
    docx = officegen('docx')
    /** When using the "single"
          data come in "req.file" regardless of the attribute "name". **/
    upload(req, res, function (err) {
        //添加错误处理
        if (err) {
            console.log(err);
            return;
        }
        //循环
        let mark_name = req.body.mark_name
        let fileNum = req.files.length;
        for (var i = 0; i < fileNum; i++) {
            req.file = req.files[i];
            var tmp_path = req.file.path;
            console.log(tmp_path);

            /** The original name of the uploaded file
                stored in the variable "originalname". **/
            var target_path = 'uploads/' + req.file.originalname;

            /** A better way to copy the uploaded file. **/
            console.log(target_path);


            if (!fs.existsSync('uploads/')) {
                fs.mkdirSync('uploads/');
            }

            if (!fs.existsSync(`transform_${mark_name}/`)) {
                fs.mkdirSync(`transform_${mark_name}/`);
            }
            var transform_path = `transform_${mark_name}/` + req.file.originalname;

            var text = fs.readFileSync(tmp_path, 'utf8');
            transformFile(text, transform_path)
            if (i == fileNum - 1) {
                let out = fs.createWriteStream(`transform_${mark_name}/ruan_zhu_download.docx`)
                docx.generate(out)
            }
        }
    });



});

function copyToWord(content, fileName) {
    let pObj = docx.createP()
    pObj.addText(content, {
        color: '000000',
        font_face: 'Arial',
        font_size: 11,
        space: 2,
    })
}

function transformFile(bufferContent, desPath) {
    var remove_empty = /(?<=\n)\s*?\n/g;
    // var bufferContent = fs.readFileSync(srcPath);
    var content = bufferContent.toString();
    var remove_empty_result = content.replace(remove_empty, "");
    //移除注释
    var remove_comment_back_splash = /\/\*{1,2}[\s\S]*?\*\//g
    var back_splash_result = remove_empty_result.replace(remove_comment_back_splash, "");
    var remove_double_splash = /\/\/[\s\S]*?\n/g
    var double_splash_result = back_splash_result.replace(remove_double_splash,"")
    copyToWord(double_splash_result, "ruan_zhu_download")
    var count = newStr.match(/\n/g).length;
    console.log("totalCount: " + count)
    fs.open(desPath, 'w', function (e, fd) {
        if (!e) {
            fs.write(fd, newStr, function (e) {
                if (e) throw e;
                fs.closeSync(fd);
            })
        }
    })

    // var oldStr = readFile("D:\\gitRepository\\weex\\weexdemo\\src\\GlideImpl.java")
    // var oldStr = getFileContent(selectedFile, function result(content) {
    //     // console.log("content: "+content)
    //     var newStr = content.replace(reg, "");
    //     var count = newStr.match(/\n/g).length;
    //     console.log("total count: " + count)
    //     var blob = new Blob([newStr], { type: "text/plain;charset=utf-8" });
    //     FileSaver.saveAs(blob, "newGlide.txt")
    // })
}

//监听端口8088
app.listen(8088, function () {
    console.log('server is running at 8088');
});

