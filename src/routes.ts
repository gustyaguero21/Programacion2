import { Router } from "express";
import { CategoryController } from "./controllers/CategoryController/CategoryController";
import { ProductController } from "./controllers/ProductController/ProductController";
import { UserController } from "./controllers/UserController/UserController";

const express = require('express');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');

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
    if(username === "Gustavo" && password === "123")
        return done(null,{id:1,name:"Cody"});

    done(null,false);
}));

passport.serializeUser(function(user,done){
    done(null,user.id);
});

passport.deserializeUser(function(id,done){
    done(null,{id:1,name: "Cody"});
});


aplication.get("/", (req,res,next)=>{
    if(req.isAuthenticated()) return next();
    res.redirect('/login');
}, (req,res)=> {

    res.render("index"),
    aplication.get("/add-user",(request, response)=>{
        response.render("./User/add-user");
    });
    //Usuario
    const userController = new UserController();
    aplication.post("/add-user",userController.handleCreateUsers);
  
    aplication.get("/list-user",userController.handleListUsers);
  
    aplication.get("/edit-user",userController.handleGetDataUsers);
  
    aplication.post("/edit-user",userController.handleUpdateUser);
  
    aplication.post("/delete-user",userController.handleDeleteUsers);
  
    aplication.get("/search-user",userController.handleSearchUsers);

    //Producto
    const productController = new ProductController();
    aplication.get("/add-product",(request,response)=>{
        response.render("./Product/add-product");
      });
    aplication.post("/add-product",productController.handleCreateProducts);
      
    aplication.get("/list-product",productController.handleListProducts);
      
    aplication.get("/edit-product",productController.handleGetDataProducts);
      
    aplication.post("/edit-product",productController.handleUpdateProducts);
      
    aplication.post("/delete-product",productController.handleDeleteProducts);
      
    aplication.get("/search-product",productController.handleSearchProducts);

    //Categoria
    const categoryController = new CategoryController();
    aplication.get("/add-category",(request,response)=>{
        response.render("./Category/add-category");
      });
      
      aplication.post("/add-category",categoryController.handleCreateCategories);
      
      aplication.get("/list-category",categoryController.handleListCategories);
      
      aplication.get("/edit-category",categoryController.handleGetDataCategories);
      
      aplication.post("/edit-category",categoryController.handleUpdateCategories);
      
      aplication.post("/delete-category",categoryController.handleDeleteCategories);
      
      aplication.get("/search-category",categoryController.handleSearchCategories);
});
aplication.get("/login",(req,res)=>{
    res.render("login");
});

aplication.post("/login", passport.authenticate('local',{
    successRedirect: "/",
    failureRedirect: "/login"
}));
const userController = new UserController();
aplication.get("/register",(req,res)=>{
    res.render("./Register/register");
});
aplication.post("/register",userController.handleCreateUsers);

export {aplication};