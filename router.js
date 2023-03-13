const router = require("express").Router();

const {
  getUsers,
  loginUsers,
  createUser,
  updateUser,
  deleteUser,
  login,
} = require("./controllers/User");

const {
  getProducts,
  getAProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("./controllers/Product");
const {
  getOrders,
  deleteOrder,
  updateOrder,
  createOrder,
} = require("./controllers/Order");

const {requireAuth, requireSeller} = require("./utils/requireAuth");

router.get("/users", requireAuth, getUsers);

// router.post("/login", requireAuth, loginUsers);
router.post('/login', login);
  

router.post("/users", createUser);

router.put("/users/:userID", requireAuth , updateUser);

router.delete("/users/:userID", requireAuth , deleteUser);

router.post("/products", getProducts);

router.post("/products/create",requireSeller, createProduct);

router.put("/products/:productID",requireSeller, updateProduct);

router.delete("/products/:productID",requireSeller, deleteProduct);

router.get("/products/:slug", getAProduct);

//Manage Orders
router.get("/orders", getOrders);
router.delete("/orders/:productID", deleteOrder);
router.put("/orders/:productID", updateOrder);
router.post("/orders", createOrder);

module.exports = router;
