import Product from "../models/ProductModel.js";
import Cloudinary from "../config/cloudConfig.js";

async function create(req, res) {
  let imageFile = await Cloudinary.uploader.upload(req.file.path);
  let fileUrl = imageFile.secure_url;
  // console.log(fileUrl);
  try {
    let result = await Product.create({ ...req.body, image: fileUrl });
    // console.log(result);
    res.status(201).send({ sucess: true, result });
  } catch (error) {
    res.status(400).send(error.message);
  }
}

async function getProducts(req, res) {
  // res.status(400).send("Something went Wrong")
  try {
    let result = await Product.find();
    // console.log(result);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

async function getProduct(req, res) {
  try {
    let result = await Product.findById(req.params.id);
    // console.log(result);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
}
async function updateProduct(req, res) {
  let imageFile = await Cloudinary.uploader.upload(req.file.path);
  let fileUrl = imageFile.secure_url;
  try {
    let result = await Product.findByIdAndUpdate(req.params.id, req.body);
    // console.log(result);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

//@desc  Delete a product
//@access Delete/api/products/:id
//route
async function deleteProduct(req, res) {
  try {
    let result = await Product.findByIdAndDelete(req.params.id);
    res.status(200).send("Product deleted");
  } catch (error) {
    res.status(400).send(error.message);
  }
}

export { create, getProducts, getProduct, updateProduct, deleteProduct };
