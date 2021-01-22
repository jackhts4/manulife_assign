const fs = require('fs');
const path = require('path');
const multer = require('multer');
const csv = require('csv-parser');
const Record = require('../models/record');
const { REPORT_HEADER_ARR } = require('../constant')

const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const checkFileType = (file, cb) => {
    const filetypes = /csv/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = filetypes.test(file.mimetype)
    if (extname && mimetype) {
        return cb(null, true)
    } else {
        cb('Error: CSV Only!')
    }
}

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb)
    }
}).single("file");

const addRecord = (fileName) => {
    let count = 0;
    let temp = []
    let destory = false
    let readableStream = fs.createReadStream('./public/uploads/' + fileName)
    readableStream
        .pipe(csv())
        .on('headers', (headers) => {
            for (header in headers) {
                if (REPORT_HEADER_ARR.includes(headers[header])) {
                } else {
                    destory = true
                    readableStream.destroy()
                }
            }
        })
        .on('data', (row) => {
            if (destory) {
                // skip
            } else {
                var record = new Record({
                    USER_NAME: row.USER_NAME,
                    AGE: row.AGE,
                    GENDER: row.GENDER,
                    SALE_AMOUNT: row.SALE_AMOUNT,
                    LAST_PURCHASE_DATE: row.LAST_PURCHASE_DATE
                })
                if (count % 10000 != 0) {
                    temp.push(record)
                    count = count + 1
                } else {
                    temp.push(record)
                    Record.collection.insertMany(temp)
                    temp = []
                    count = count + 1
                }
            }
        })
        .on('end', () => {
            if (temp.length > 0) {
                Record.collection.insertMany(temp)
            }
        });
        if(destory){
            return false
        }else{
            return true
        }
}

module.exports = {
    upload,
    addRecord
}