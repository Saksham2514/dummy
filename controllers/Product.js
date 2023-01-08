const Product = require("../model/Products");

const createProduct = (req, res) => {
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    ratings: req.body.ratings,
    visible: req.body.visible,
    instock: req.body.instock,
    category: req.body.category,
    images: req.body.images,

  });

  product.save((err, product) => {
    if (err) {
      res.send(err);
    }
    res.json(product);
  });
};

const getProducts = (req, res) => {

  console.log(req.body);
  const filter = req.body !== undefined ? req.body : {createdAt:-1}
  console.log(filter);
  
  Product.find().sort(filter).exec((err, products) => {
    if (err) { 
      res.send(err);
    }
    res.json(products);
  });
};

const getAProduct = (req, res) => {
  console.log(req.params.slug);
  Product.find({ slug: req.params.slug },(err, products) => {
    if (err) {
      res.send(err);
    }
    res.json(products);
  });
};

const updateProduct = (req, res) => {
  
  Product.findOneAndUpdate(
    { _id: req.params.productID },
    {
      $set: {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        ratings: req.body.ratings,
        visible: req.body.visible,
        instock: req.body.instock,
        category: req.body.category,
        images: req.body.images,

      },
    },
    { new: true },
    (err, Product) => {
      if (err) {
        res.send(err);
      } else res.json(Product);
    }
  );
};

const deleteProduct = (req, res) => {
  Product.deleteOne({ _id: req.params.productID })
    .then(() => res.json({ message: "Product Deleted" }))
    .catch((err) => res.send(err));
};

module.exports = {
  getProducts,
  getAProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
