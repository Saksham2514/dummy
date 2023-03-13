const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  }, 
  ratings: {
    type: Number,
    required: true,
  },
  visible: {
    type: Boolean,
    default:true,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  instock: {
    type: Boolean,
    default: true
  },
  category: {
    type: String,
    required : true
  },
    images:{
      type: [String]
    },
  slug:{
    type:String,
    unique:true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  createdBy : {
    type : mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true

  }
});

ProductSchema.pre("save", function(next) {
  this.slug = `${this.name.split(" ").join("-")}-${Math.floor(Math.random()*1000000000)}`;
  console.log(this.slug);
  next();
});


module.exports = mongoose.model("Product", ProductSchema);
