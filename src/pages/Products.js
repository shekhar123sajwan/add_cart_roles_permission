import React, { useEffect, useState } from "react";
import Product from "../component/Product";
import Cart from "../component/Cart";

const Products = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await fetch("https://dummyjson.com/products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="row">
      <div className="col-xs-12 col-md-12 col-lg-8 products-wrapper">
        <div className="row">
          {products?.products?.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      </div>
      <div className="col-md-4">
        <Cart />
      </div>
    </div>
  );
};

export default Products;
