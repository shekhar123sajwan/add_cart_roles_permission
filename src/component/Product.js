import React from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../utils/cartSlice";

const Product = ({ product }) => {
  const dispatch = useDispatch();
  const handleAddCart = (product) => {
    dispatch(addProduct(product));
  };
  return (
    <div className="col-lg-4 col-md-6 col-xs-12">
      <div className="product-card border p-1 mb-2">
        <div className="product-img p-1">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="img-fluid rounded"
          />
        </div>
        <div className="product-detail">
          <h6>{product.title}</h6>
          <p className="small">
            {product.description.length > 50
              ? product.description?.slice(0, 50) + "..."
              : product.description}
          </p>
          <p className="italic">
            ${product.price} <b className="text-danger">{product.category}</b>
          </p>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => handleAddCart(product)}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
