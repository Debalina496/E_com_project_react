import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { truncateText } from '../utils/helper';

const ProductCard = ({ product }: any) => (
  <Card>
    <CardMedia component="img" height="140" image={product.image} alt={product.title} />
    <CardContent>
      <Typography variant="h6">{truncateText(product.title,20)}</Typography>
      <Typography variant="body2" color="text.secondary">
        ${product.price}
      </Typography>
      <Button component={Link} to={`/product/${product.id}`} size="small" style={{ marginTop: 8 }}>
        View Details
      </Button>
    </CardContent>
  </Card>
);

export default ProductCard;
