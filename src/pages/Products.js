import React, { useEffect, useState } from "react";
import Product from "../component/Product";
import Cart from "../component/Cart";
import Loader from "../component/loader/Loader";
import Pagination from "../component/Pagination";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

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

  if (products?.length === 0) {
    return <Loader />;
  }

  let total = products?.products?.length;
  let numberOfProductsOnPage = 6;

  const indexOfLastProduct = (currentPage - 1) * numberOfProductsOnPage;

  const productsList = [...products.products];
  const filterdProducts = productsList.splice(
    indexOfLastProduct,
    numberOfProductsOnPage
  );
  // console.log(indexOfLastProduct, products.products);
  return (
    <div className="row">
      <div className="col-xs-12 col-md-12 col-lg-8 products-wrapper">
        <div className="row">
          {filterdProducts?.map((product) => (
            <Product key={product.id} product={product} />
          ))}
          <Pagination
            setCurrentPage={setCurrentPage}
            numberOfProductsOnPage={numberOfProductsOnPage}
            totalProducts={total}
          />
        </div>
      </div>
      <div className="col-md-4">
        <Cart />
      </div>
    </div>
  );
};

export default Products;
