// index.js
import express from 'express';
import postRoutes from './src/routes/post.routes.js';

const app = express();
const port = 3000;

app.use(express.json());

// Mount the post routes
app.use('/posts', postRoutes);

app.get ('/posts', (req,res) =>{
    res.status(200).json(products);
});

app.get ('/posts/:id', (req,res) => {
    const id = parseInt(req.params.id);
    const searchProduct = products.find(product => product.id === id);
    console.log(searchProduct)

    if (!searchProduct) {
        return res.status(404).json({message: 'Product not found'});
    } else {
        res.status(200).json(searchProduct);
    }
});

app.listen(port,()=> console.log(`Server is running at http://localhost:${port}`));

app.post('/posts',(req,res) => {

    const newId = Math.max(...products.map(p => p.id)) + 1;

    const newProduct = {
        id:newId,
        name: req.body.name,
        price: req.body.price
    };
    products.push(newProduct);
    res.status(201).json(newProduct)
});

app.put('/posts/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const productIndex = products.findIndex(p => p.id === id);
    
    if (productIndex === -1) {
        return res.status(404).json({message: "Product not found"});
    }
    
    products[productIndex].name = req.body.name;
    products[productIndex].price = req.body.price;
    
    res.status(200).json(products[productIndex]);
});

app.delete('/posts/:id', (req,res) => {
    const id = parseInt(req.params.id);
    const productIndex = products.findIndex(p => p.id === id);

    if (productIndex === -1){
        return res.status(404).json({message: "Product not found"});
    }
    
    products.splice(productIndex, 1);
    res.status(204).send();
});