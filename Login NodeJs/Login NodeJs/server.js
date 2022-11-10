const express = require('express');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const { response } = require('express');
const PassportLocal = require('passport-local').Strategy;

const aplication = express();

aplication.use(express.urlencoded({extended: true}));

aplication.use(cookieParser('mi ultra hiper secreto'));

aplication.use(session({
    secret: 'mi ultra hiper secreto',
    resave:true,
    saveUninitialized:true
}));

aplication.use(passport.initialize());
aplication.use(passport.session());

passport.use(new PassportLocal(function(username, password, done){
    if(username === "martin"  && password === "martin")
        return done(null,{id:1,name:"Cody"});

    done(null,false);
}));

passport.serializeUser(function(user,done){
    done(null,user.id);
});

passport.deserializeUser(function(id,done){
    done(null,{id:1,name: "Cody"});
});

aplication.set('view engine', 'ejs')

aplication.get("/", (req,res,next)=>{
    if(req.isAuthenticated()) return next();
    res.redirect('/login');
}, (req,res)=> {

    res.render("home");
});
aplication.get("/login",(req,res)=>{
    res.render("login")
});

aplication.post("/login", passport.authenticate('local',{
    successRedirect: "/",
    failureRedirect: "/login"
}));

aplication.listen(8080,()=> console.log('Server started'));

aplication.get("/",(req,res)=>{
    res.render("index");
});
