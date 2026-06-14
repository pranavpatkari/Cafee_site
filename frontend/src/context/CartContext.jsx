import {
  createContext,
  useState,
  useEffect
} from "react";

export const CartContext = createContext();

export default function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");

    return saved
      ? JSON.parse(saved)
      : [];
  });

  useEffect(() => {
    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );

    console.log(
      "GLOBAL CART:",
      cart
    );
  }, [cart]);

  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find(
        (i) => i.name === item.name
      );

      if (existing) {
        return prev.map((i) =>
          i.name === item.name
            ? {
                ...i,
                qty: i.qty + 1
              }
            : i
        );
      }

      return [
        ...prev,
        {
          ...item,
          qty: 1
        }
      ];
    });
  };

  const removeFromCart = (item) => {
    setCart((prev) =>
      prev
        .map((i) =>
          i.name === item.name
            ? {
                ...i,
                qty: i.qty - 1
              }
            : i
        )
        .filter((i) => i.qty > 0)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
