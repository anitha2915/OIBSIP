
function cartController() {
    return {
        index(req, res) {
            res.render('customers/cart');
        },
        update(req, res) {
            if (!req.session.cart) {
                req.session.cart = {
                    items: {},
                    totalQty: 0,
                    totalPrice: 0
                };
            }

            let cart = req.session.cart;

            // Check if item already exists in cart
            if (!cart.items[req.body._id]) {
                // If it does not exist, add new item
                cart.items[req.body._id] = {
                    item: req.body,
                    qty: 1
                };
                cart.totalQty += 1;
                cart.totalPrice += req.body.price;
            } else {
                // If it exists, update the quantity
                cart.items[req.body._id].qty += 1;
                cart.totalQty += 1;
                cart.totalPrice += req.body.price;
            }

            return res.json({ totalQty: req.session.cart.totalQty });
        }
    }
}

module.exports = cartController;



