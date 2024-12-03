import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Typography, TextField, MenuItem } from '@mui/material';
import ProductCard from '../components/ProductCard';
import { API_URL } from '../api/api';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortOrder, setSortOrder] = useState('');

  useEffect(() => {
    axios.get(`${API_URL}/products`).then((res) => setProducts(res.data));
    axios.get(`${API_URL}/products/categories`).then((res) => setCategories(res.data));
  }, []);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    axios.get(`${API_URL}/products/category/${category}`).then((res) => setProducts(res.data));
  };

  const handleSortChange = (order: string) => {
    setSortOrder(order);
    const sortedProducts = [...products].sort((a: any, b: any) => (order === 'asc' ? a.price - b.price : b.price - a.price));
    setProducts(sortedProducts);
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Products
      </Typography>
      <TextField
        size='small'
        select
        label="Category"
        value={selectedCategory}
        onChange={(e) => handleCategoryChange(e.target.value)}
        style={{ marginRight: 16,width:200 }}
      >
        {categories.map((category) => (
          <MenuItem key={category} value={category}>
            {category}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        size='small'
        select
        label="Sort By"
        style={{width:200}}
        value={sortOrder}
        onChange={(e) => handleSortChange(e.target.value)}
      >
        <MenuItem value="asc">Price: Low to High</MenuItem>
        <MenuItem value="desc">Price: High to Low</MenuItem>
      </TextField>
      <Grid container spacing={3} style={{ marginTop: 16 }}>
        {products.map((product: any) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default HomePage;
