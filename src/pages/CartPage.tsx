import React from 'react';
import { Typography, List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCart } from '../context/CartContext';
import { CartItem } from '../context/type';

const CartPage = () => {
  const { cart, removeFromCart, totalItems, totalPrice } = useCart();

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Cart
      </Typography>
      {cart.length === 0 ? (
        <Typography>Your cart is empty.</Typography>
      ) : (
        <div>
          <List>
            {cart.map((item: CartItem) => (
              <ListItem key={item.id} secondaryAction={
                <IconButton edge="end" onClick={() => removeFromCart(item.id)}>
                  <DeleteIcon />
                </IconButton>
              }>
                <ListItemText primary={item.title} secondary={`$${item.price} x ${item.quantity}`} />
              </ListItem>
            ))}
          </List>
          <Typography variant="h6" style={{ marginTop: 16 }}>
            Total Items: {totalItems}
          </Typography>
          <Typography variant="h6">Total Price: ${totalPrice.toFixed(2)}</Typography>
        </div>
      )}
    </div>
  );
};

export default CartPage;
