var express = require('express')
var bodyParser = require('body-parser')

var app = express()

var session = require('express-session')



app.set('view engine', 'ejs')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


app.use(session({
  secret: 'hacktiv8',
  resave: false,
  saveUninitialized: true
}))

// app.get('/', function (req, res) {
//   res.send('Hello World!')
// })

const login = require('./routes/login');
app.use('/login', login)

const index = require('./routes/index');
app.use('/', index)

let teacher = require('./routes/teacher');
app.use('/teachers', teacher)

let subject = require('./routes/subject');
app.use('/subjects', subject);

let student = require('./routes/student');
app.use('/students', student)

app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening on port 3000!')
})
