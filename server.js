const express = require('express'); // http://expressjs.com/
const hbs = require('hbs');// https://www.npmjs.com/package/hbs - http://handlebarsjs.com/
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');

hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear();
});

hbs.registerHelper('getUserInfo',()=>{
  var userInfo = {username:'Marius David', departement:'IT'};
  return JSON.stringify(userInfo);
  // return userInfo;

});

app.use((req,res,next)=>{
  var logDate = new Date().toDateString();
  var logData = `${logDate}: ${req.ip} ${req.method} ${req.path}`;
  console.log(logData);
  fs.appendFile('acces.log',logData+'\n','utf8',(error)=>{
    if (error) throw error;
  });
  next();
  });

// bla bla bla - comit

app.use((req,res,next)=>{

  res.render('mentenance.hbs',{
    pageTitle:'Mentenance page',
    welcomeMessage:'The site is in mentenance we will comeback soon !!',

  });


  });

app.use(express.static(__dirname + '/public'));





app.get('/',(req,res)=>{

  res.render('home.hbs',{
    pageTitle:'Welcome page',
    welcomeMessage:'Hello word how are you ?',

  });


  //res.send("<h1>Hello express</h1>");
  // res.send({
  //   name:'marius',
  //   age:25
  // });
});

app.get('/about',(req,res)=>{
  console.log('about acessed !');
  res.render('about.hbs',{
    pageTitle:'About page dinamic !',

  });
});

app.get('/bad',(req,res)=>{
  res.send({
    errorMessage:'Unable to handle request'
  });
});



app.listen(8080,()=>{
  console.log('Server is up on port 8080');
});
