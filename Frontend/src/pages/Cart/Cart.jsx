import React, { useContext } from 'react';
import './Cart.css';
import { StoreContext } from '../../context/StoreContext';
import { Link, useNavigate } from 'react-router-dom';
import { calculateCartTotal } from '../../util/CartUtil';

const Cart = () => {
  const navigate = useNavigate();
  const { foodList, increaseQty, decreaseQty, quantities, removeFromCart } = useContext(StoreContext);

     const cartItems = foodList.filter(food => quantities[food.id] > 0);

     const {subtotal, shipping, tax, total} = calculateCartTotal(cartItems, quantities);

  return (
    <div className="container py-5">
      <h1 className="mb-5">Your Shopping Cart</h1>

      <div className="row">

        {/* LEFT SIDE */}
        <div className="col-lg-8">
          {cartItems.length === 0 ? (
            <p>Your Cart Is Empty</p>
          ) : (
            <div className="card mb-4">
              <div className="card-body">

                {cartItems.map(food => (
                  <div key={food.id} className="row cart-item mb-3">

                    <div className="col-md-3">
                      <img
                        src={food.imageUrl}
                        alt={food.name}
                        className="img-fluid rounded"
                        width={100}
                      />
                    </div>

                    <div className="col-md-5">
                      <h5>{food.name}</h5>
                      <p className="text-muted">Category: {food.category}</p>
                    </div>

                    <div className="col-md-2">
                      <div className="input-group">
                        <button
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() => decreaseQty(food.id)}
                        >-</button>

                        <input
                          type="text"
                          readOnly
                          className="form-control form-control-sm text-center"
                          value={quantities[food.id]}
                        />

                        <button
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() => increaseQty(food.id)}
                        >+</button>
                      </div>
                    </div>

                    <div className="col-md-2 text-end">
                      <p className="fw-bold">
                        ₹{(food.price * quantities[food.id]).toFixed(2)}
                      </p>

                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => removeFromCart(food.id)}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>

                    <hr />
                  </div>
                ))}

              </div>
            </div>
          )}

          <div className="text-start mb-4">
            <Link to="/" className="btn btn-outline-primary">
              <i className="bi bi-arrow-left me-2"></i> Continue Shopping
            </Link>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="col-lg-4">
          <div className="card cart-summary">
            <div className="card-body">
              <h5 className="mb-4">Order Summary</h5>

              <div className="d-flex justify-content-between">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>

              <div className="d-flex justify-content-between">
                <span>Shipping</span>
                <span>₹{shipping.toFixed(2)}</span>
              </div>

              <div className="d-flex justify-content-between">
                <span>Tax</span>
                <span>₹{tax.toFixed(2)}</span>
              </div>

              <hr />

              <div className="d-flex justify-content-between fw-bold">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>

              <button
                className="btn btn-primary w-100 mt-3"
                disabled={cartItems.length === 0} 
                onClick={() => navigate("/order")}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Cart;
