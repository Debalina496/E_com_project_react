import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Typography, Button } from '@mui/material';
import { useCart } from '../context/CartContext';
import { API_URL } from '../api/api';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    axios.get(`${API_URL}/products/${id}`).then((res) => setProduct(res.data));
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div>
      <Typography variant="h4">{product.title}</Typography>
      <Typography variant="body1" color="text.secondary" style={{ margin: '16px 0' }}>
        {product.description}
      </Typography>
      <Typography variant="h6" color="primary">
        ${product.price}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        style={{ marginTop: 16 }}
        onClick={() => addToCart({ id: product.id, title: product.title, price: product.price, quantity: 1 })}
      >
        Add to Cart
      </Button>
    </div>
  );
};

export default ProductDetailPage;
