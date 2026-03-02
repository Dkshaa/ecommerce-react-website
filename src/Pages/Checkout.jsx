import React from "react";
import { useCart } from "../context/CartContext";

const Checkout = () => {
  const { getCartItemsWithProducts, updateQuantity, removeFromCart,getCartTotal,clearCart } =
    useCart();
  const cartItems = getCartItemsWithProducts();

  const total = getCartTotal()

  function placeOrder () {
    alert('Order Placed Successfully!')
    clearCart()
  }

  return (
    <div className="page">
      <div className="conatiner">
        <h1 className="page-title">Checkout</h1>
        <div className="checkout-container">
          <div className="checkout-items">
            <h2 className="checkout-section-title">Order Summary</h2>
            {cartItems.map((item) => (
              <div className="checkout-item" key={item.id}>
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="checkout-item-image"
                />
                <div className="checkout-item-details">
                  <h3 className="ccheckout-item-name">{item.product.name}</h3>
                  <p className="checkout-item-price">
                    ${item.product.price} each
                  </p>
                </div>
                <div className="checkout-item-controls">
                  <div className="quantity-controls">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="quantity-btn"
                    >
                      -
                    </button>
                    <span className="quantity-value">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="quantity-btn"
                    >
                      +
                    </button>
                  </div>

                  <p className="checkout-item-total">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="btn btn-secondary btn-small"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="checkout-summary">
                <h2 className="checkout-section-title">Total</h2>
                <div className="checkout-total">
                    <p className="checkout-total-label">Subtotal:</p>
                    <p className="checkout-total-value checkout-total-final">
                        ${total.toFixed(2)}
                    </p>
                </div>
                <div className="checkout-total">
                    <p className="checkout-total-label">Total:</p>
                    <p className="checkout-total-value checkout-total-final">
                        ${total.toFixed(2)}
                    </p>
                </div>
                <button 
                    onClick={placeOrder}
                    className=" btn btn-primary btn-large btn-block"
                    >
                    Place Order
                </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
