const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname +'/views/partials');
app.set('view Engine', 'hbs');


app.use( (req, res, next) =>{
  var now = new Date().toString();
  var log = `${now} ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) =>{
    if(err){
      console.log('unable to append server.log');
    }
  });
  next();

});

// app.use((req, res, next) =>{
//     res.render('maintainance.hbs');
// });

app.use(express.static(__dirname +'/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
})

app.get('/', (req, res) => {
  //res.send('<h1>hello user</h1>');
  res.render('home.hbs', {
    pageTitle:'Home page',
    UserName:'Guest',
    message:'Welcome To our Website',
  })
});

app.get('/about', (req, res) =>{
  res.render('about.hbs',{
    pageTitle:'About Page',
  });
});

app.get('/portfolio', (req, res) =>{
  res.render('portfolio.hbs',{
    pageTitle:'Portfolio Page',
  });
});

// /bad --send back json with erromessage
app.get('/bad', (req, res) => {
  res.send({
    erromessage:'Unable to get the data'
  });
});

app.listen(port, () => {
  console.log(`Server is ready to go with ${port}`);
});
