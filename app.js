const bodyParser = require('body-parser');
const { exec } = require('child_process');
const express = require('express');
const serveStatic = require('serve-static');
const path = require('path');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/", serveStatic(path.join(__dirname, "./public/")));
app.use("/*", serveStatic(path.join(__dirname, "./public/index.html")));

const inputWebpImage = "./public/img/1.webp";
const outputWebpImage = "./public/img/2.webp";

const updateImageQuality = (req, res) => {
    const cmd = `cwebp -q ${req.body.webpQuality} ${inputWebpImage} -o ${outputWebpImage}`
    exec(cmd, (error, stdout, stderr) => {
        if (error) {
            res.status(500).json({error:error});
        } else {
            res.status(200).json({
                status: 200,
                id: new Date().getTime(),
                message: `Images optimized with quality ${req.body.webpQuality}`,
                value: req.body.webpQuality,
            })
        }
    })
}

app.post('/update-quality', updateImageQuality)

app.listen('3000');
console.log('working on 3000');
