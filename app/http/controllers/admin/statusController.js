// const Order = require('../../../models/order')

// function statusController() {
//     return {
//         update(req, res) {
//             Order.updateOne({_id: req.body.orderId}, { status: req.body.status }, (err, data)=> {
//                 if(err) {
//                     return res.redirect('/admin/orders')
//                 }  
//                    // Emit event 
// //                const eventEmitter = req.app.get('eventEmitter')
// //           eventEmitter.emit('orderUpdated', { id: req.body.orderId, status: req.body.status })
//                 return res.redirect('/admin/orders')
//             })
//         }
//     }
// }

// module.exports = statusController

const Order = require('../../../models/order');

function statusController() {
    return {
        async update(req, res) {
            try {
                await Order.updateOne({ _id: req.body.orderId }, { status: req.body.status });
                // Emit event
                const eventEmitter = req.app.get('eventEmitter');
                eventEmitter.emit('orderUpdated', { id: req.body.orderId, status: req.body.status });
                res.redirect('/admin/orders');
            } catch (err) {
                console.log('Error updating order status:', err);
                res.redirect('/admin/orders');
            }
        }
    };
}

module.exports = statusController;
