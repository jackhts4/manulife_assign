// Author: Jackson Hui 96987088 jackhts4@gmail.com

const express = require('express');
const mongoose = require('mongoose');
const { upload, addRecord } = require('./middlewares/upload.js');
const { APP_VERSION, APP_PORT, DATABASE_URL } = require('./constant')
const Record = require('./models/record');

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.static('./public'));

mongoose
  .connect(
    DATABASE_URL,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// get version no
app.get('/', (req, res) => {
  res.send({ version: APP_VERSION })
})

// check how many collections in db
app.get('/sales/data', (req, res) => {
  Record.collection.countDocuments()
    .then((result) => {
      res.send({
        route: "/data",
        success: true,
        count: result
      })
    })
    .catch(err => {
      res.send({
        route: "/data",
        success: false,
        msg: err
      })
    })
})

// delete all collections
app.get('/sales/delete', (req, res) => {
  try {
    Record.collection.deleteMany({}, () => {
      res.send({
        route: "/delete",
        success: true,
        msg: "Done"
      })
    })
  } catch (err) {
    res.send({
      route: "/delete",
      success: false,
      msg: err
    })
  }
})

// upload a csv to 
app.post('/sales/record', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.send({
        route: "/upload",
        success: false,
        msg: "err"
      })
    } else {
      if (req.file == undefined) {
        res.send({
          route: "/upload",
          success: false,
          msg: "no file sent"
        })
      } else {
        if (addRecord(req.file.filename)) {
          res.send({
            route: "/upload",
            success: true,
            msg: 'File Uploaded!',
          })
        } else {
          res.send({
            route: "/upload",
            success: false,
            msg: 'Invalid CSV',
          })
        }
      }
    }
  })
})

app.get('/sales/report', (req, res) => {
  if (req.query.fr && req.query.to) {
    if (new Date(req.query.fr) != "Invalid Date" && new Date(req.query.to) != "Invalid Date") {
      Record.collection.find({
        LAST_PURCHASE_DATE: {
          $gte: new Date(new Date(req.query.fr).setHours(0, 0, 0, 0)),
          $lte: new Date(new Date(req.query.to).setHours(23, 59, 59, 999))
        }
      }, null).toArray()
        .then(results => {
          res.send({
            route: "/report",
            success: true,
            data: results
          })
        })
    } else {
      res.send({
        route: "/report",
        success: true,
        msg: "Invalid date"
      })
    }
  } else if (req.query.date) {
    if (new Date(req.query.date) != "Invalid Date") {
      Record.collection.find({
        LAST_PURCHASE_DATE: {
          $gte: new Date(new Date(req.query.date).setHours(0, 0, 0, 0)),
          $lte: new Date(new Date(req.query.date).setHours(23, 59, 59, 999))
        }
      }, null).toArray()
        .then(results => {
          res.send({
            route: "/report",
            success: true,
            data: results
          })
        })
    } else {
      res.send({
        route: "/report",
        success: true,
        msg: "Invalid date"
      })
    }
  } else {
    res.send({
      route: "/report",
      success: false,
      msg: "For use ISO string format to pass date, you can use a date range( fr=, to=) or a single date(date=)"
    })
  }
})


app.listen(APP_PORT, () => console.log('Nodejs server running...'));
