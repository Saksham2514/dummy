const router = require("express").Router();

const {

    getUsers,
    loginUsers,
    createUser,
    updateUser,
    deleteUser,
} = require("./controllers/User");
  
const {

    getProducts,
    getAProduct,
    createProduct,
    updateProduct,
    deleteProduct,
} = require("./controllers/Product");
const { getOrders, deleteOrder, updateOrder, createOrder } = require("./controllers/Order");
  
router.get("/users", getUsers);

router.post("/login", loginUsers);

router.post("/users", createUser);

router.put("/users/:userID", updateUser);

router.delete("/users/:userID", deleteUser);

router.post("/products", getProducts);

router.post("/products/create", createProduct);

router.put("/products/:productID", updateProduct);

router.delete("/products/:productID", deleteProduct);

router.get("/products/:slug", getAProduct);

//Manage Orders
router.get("/orders",getOrders);
router.delete("/orders/:productID",deleteOrder);
router.put("/orders/:productID",updateOrder);
router.post("/orders",createOrder);

module.exports = router;
