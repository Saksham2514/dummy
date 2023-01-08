const productRouter = require("express").Router();


productRouter.get("/products", getProducts);

productRouter.post("/products", createProduct);

productRouter.put("/products/:productID", updateProduct);

productRouter.delete("/products/:productID", deleteProduct);


module.exports = productRouter;
