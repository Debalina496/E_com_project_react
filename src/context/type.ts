type CartItem = {
    id: number;
    title: string;
    price: number;
    quantity: number;
  };
  
  type CartContextType = {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: number) => void;
    totalItems: number;
    totalPrice: number;
  };

  export type { CartItem, CartContextType };