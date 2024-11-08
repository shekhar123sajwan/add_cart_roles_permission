import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeProduct } from "../utils/cartSlice";
import {
  decreaseProductQuantity,
  increaseProductQuantity,
} from "../utils/cartSlice";

const Cart = () => {
  const cartStore = useSelector((store) => store.cart);
  const dispatch = useDispatch();

  return (
    <div className="cart-wrapper">
      {cartStore.products?.map((item) => (
        <div
          key={item.id}
          className="cart-product"
          style={{
            display: "flex",
            position: "relative",
            alignContent: "center",
            padding: "1px",
            marginBottom: "10px",
            border: "1px solid",
          }}
        >
          <div>
            <img src={item.thumbnail} alt={item.title} width={60} height={60} />
          </div>
          <div className="small mx-2 py-2">
            <span>{item.title}</span>
            <br />
            <span>${item.price}</span>
            <br />
            <button
              onClick={() => {
                if (item.quantity > 1) {
                  dispatch(decreaseProductQuantity(item));
                }
              }}
              className="btn btn-outline-secondary me-2 px-1 py-0 btn-sm"
            >
              -
            </button>
            <span>{item.quantity || 1}</span>
            <button
              onClick={() => {
                dispatch(increaseProductQuantity(item));
              }}
              className="btn btn-outline-secondary ms-2 px-1 py-0 btn-sm"
            >
              +
            </button>
          </div>

          <button
            className=""
            style={{ position: "absolute", right: "0" }}
            onClick={() => dispatch(removeProduct(item))}
          >
            Remove
          </button>
        </div>
      ))}
      {cartStore.products?.length > 0 && (
        <div className="d-flex justify-content-between align-items-center">
          <h6>Total Price: ${parseFloat(cartStore.total).toFixed(2)}</h6>
          <h6>Total Quantity: {cartStore.quantity}</h6>
          <button className="btn btn-primary">Checkout</button>
        </div>
      )}
    </div>
  );
};

export default Cart;
