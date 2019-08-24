const express =require('express');
const path =require('path');
const mainRoute = require('./routes/main');
const shopRoute=require('./routes/shop');
const rootDir =require('./utility/path');
const ejs =require('ejs');
const app =express();
const PORT=5000;

//Set the public folder for static files
app.use(express.static(path.join(rootDir,'public')));
//set the view engine
app.set('viewengine',ejs);
//set the routes
app.use(shopRoute);
app.use(mainRoute);



// Start the server
app.listen(PORT,()=>{
    console.log(`App is started on Port ${PORT}`);
})