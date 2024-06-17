const Order = require('../../../models/order')
const moment = require('moment')
function orderController(){
    return{
        store(req,res){
         //validate request
        const {phone,address}=req.body
         if(!phone||!address){
           req.flash('error','All fields are required')
           return res.redirect('/cart')
         }

         const order = new Order({
            customerId:req.user._id,
            items:req.session.cart.items,
            phone,
           address
         })

         order.save().then(result =>{
            req.flash('success','Order placed successfully')
            delete req.session.cart
            //Emit
            const eventEmitter = req.app.get('eventEmitter');
            eventEmitter.emit('orderUpdated', result);
            return res.redirect('/customer/orders')

         }).catch(err =>{
            req.flash('error','Something went wrong')
            return res.redirect('/cart')
         })
        },
        async index(req,res){
         const orders=await Order.find({ customerId:req.user._id},
            null,
            {sort:{ 'createdAt':-1}})
            res.header('Cache-Control',' no-cache,no-store,must-revalidate,max-state=0 ,post-check=0,pre-check=0')
            
         res.render('customers/orders',{orders:orders,moment:moment})
         console.log(orders)
        },
        async show(req, res) {
        
             const order = await Order.findById(req.params.id)
             // Authorize user
             if (req.user._id.toString() === order.customerId.toString()) {
                  res.render('customers/singleOrder', { order })
             } else {
            
             res.redirect('/customer/orders')
         }
     }
   }
    
}

module.exports= orderController
