const express = require('express');
const hbs = require('hbs');
const fs =require('fs');
var app =express();
hbs.registerPartials(__dirname+'/views/partials');

app.set('view engine','hbs');
app.use(express.static(__dirname+'/public'));

app.use((req,res,next) => {
  var now =new Date().toString();
  var log =`${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log +'\n');
  next();
// });
// app.use((req,res,next) => {
// res.render("maintenance.hbs");
// });
//app.use(express.static(__dirname+'/public'));  one scenario for help page to maintenance page

hbs.registerHelper("screamIt", (text)=>{
  return text.toUpperCase();
} );
app.get('/',(req,res) => {
  //res.send('<marquee><h1>Hello Expresss</h1></marquee>');
  res.render("home.hbs",{
    person:{
    name : 'Surya',
    likes : [
      'car','mobile'
    ]}
  });
});


app.get('/home',(req,res) => {
  res.render('home.hbs' ,{
    pageTitle:'Welcome to my Website',
    someMessage:'Hi',
    currentYear:new Date().getFullYear()
  });
});

app.get('/about',(req,res) => {
  res.render('about.hbs' ,{
    pageTitle:'About Page',
    currentYear:new Date().getFullYear()
  });
});

app.get('/bad',(req,res) => {
  res.send({
    errorMessage : 'Unable to hande request'
  });
})

app.listen(3000);
