const express =require('express');
const bodyParser =require('body-parser');
const path =require('path');
const mainRoute = require('./routes/main');
const shopRoute=require('./routes/shop');
const adminRoute=require('./routes/admin');
const rootDir =require('./utility/path');
const dbSetup = require('./utility/db_setup');

const ejs =require('ejs');
const app =express();
const PORT=5000;

//Initialize the database;
dbSetup.initialize();
//Set up the user for now
app.use(dbSetup.setUser);

//Set the public folder for static files
app.use(express.static(path.join(rootDir,'public')));
app.use(bodyParser.urlencoded({extended:false}));
//set the view engine
app.set('viewengine',ejs);
//set the routes
app.use(shopRoute);
app.use('/admin',adminRoute);
app.use(mainRoute);



// Start the server
app.listen(PORT,()=>{
    console.log(`App is started on Port ${PORT}`);
})