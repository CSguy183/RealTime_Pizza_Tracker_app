const authController = require('../app/http/controllers/authController');
const homeController = require('../app/http/controllers/homeController');
const AuthController = require('../app/http/controllers/authController');
const cartController = require('../app/http/controllers/customers/cartController');
const orderController = require('../app/http/controllers/customers/orderController')
const guest = require('../app/http/middlewares/guest');
const auth = require('../app/http/middlewares/auth');
const admin = require('../app/http/middlewares/admin');
const AdminOrderController = require('../app/http/controllers/admin/orderController')
const statusController = require('../app/http/controllers/admin/statusController')


function initRoutes(app) {
    app.get('/', homeController().index);

    app.get('/cart', cartController().index)
    app.post('/update-cart', cartController().update)

    app.get('/login', guest, AuthController().login)
    app.post('/login', AuthController().postLogin)

    app.get('/register', guest, AuthController().register)
    app.post('/register', AuthController().postRegister)
    app.post('/logout', AuthController().logout)

    app.post('/orders', auth, orderController().store)
    app.get('/customer/orders', auth, orderController().index)
    app.get('/customer/orders/:id', auth, orderController().show)


    // admin

    app.get('/admin/orders', admin, AdminOrderController().index)
    app.post('/admin/order/status', admin, statusController().update)

}

module.exports = initRoutes;