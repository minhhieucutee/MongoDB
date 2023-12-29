const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

//kết nối với mongoDB
mongoose.connect('mongodb://localhost:27017/Hoanghieu1', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

//định nghĩa schema cho sp
const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
  qty: Number,
});

//Tạo mô hình product từ schema
const Products = mongoose.model('Product', ProductSchema);

//sử dụng body-parser để parse dữ liệu từ request
app.use(bodyParser.json());

//route
//get all products
app.get('/api/products', async (req, res) => {
  try {
    const products = await Products.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//get a specific product by id
app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Products.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new product
app.post('/api/products', async (req, res) => {
  const { name, price, qty } = req.body;
  try {
    const newProduct =  new Products({ name, price, qty }).save();
    const savedProduct = await newProducts.save();
    res.json(savedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update product by ID
app.put('/api/products/:id', async (req, res) => {
  const { name, price, qty } = req.body;
  try {
    const updatedProduct = await Products.findByIdAndUpdate(req.params.id, 
        { name, price, qty }, 
        { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete product by ID
app.delete('/api/products/:id', async (req, res) => {
  try {
    const deletedProduct = await Products.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(deletedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

