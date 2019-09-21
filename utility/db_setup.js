const database = require('./database');
const User= require('../models/user');
const Product =require('../models/Product');
const Cart = require('../models/cart');
const CartProduct = require('../models/CartProduct');


initialize =() =>{
    //set up the relationships
    User.hasOne(Cart);
    User.hasMany(Product);
    Cart.belongsToMany(Product, { through: CartProduct });
    Product.belongsToMany(Cart, { through: CartProduct });
// synchronize the database
    database.sync({alter:true}).then(()=>{
        console.log('Sync complete');
        return User.findByPk(1);
    }).then(dummyuser=>{
        if(dummyuser===null)
        {
            return User.create({ name: 'test', email: 'test@test.com' });
        }
        return dummyuser;
    }).then(user=>{
         user.getCart().then( usercart=>{
            
             if(!usercart)
             {
                 console.log('creating cart');
                return user.createCart();
             }
         });
    })

    .catch(err=>{
        console.log('Sync failed' + err);
    })


}

module.exports.setUser=(req,res,next)=>{
    User.findByPk(1).then(user=>{
        req.user=user;
        next();
    }).catch(err=>{
        console.log(`Unable to set user ${err}`);
    });
}
module.exports.initialize = initialize;