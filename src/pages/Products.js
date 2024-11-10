import React, { useEffect, useState } from "react";
import Product from "../component/Product";
import Cart from "../component/Cart";
import Pagination from "../component/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { toggleFilterPanel } from "../utils/configSlice";
import Filter from "../component/filters/Filter";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [productsObj, setProductsObj] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const configStore = useSelector((state) => state.config);
  const { showFilterPanel } = configStore;
  const [prodcutsFilter, setProdcutsFilter] = useState({
    category: [],
    rating: [],
    price: [],
  });
  let filterdProducts = [];

  const fetchProducts = async () => {
    try {
      const response = await fetch("https://dummyjson.com/products");
      const data = await response.json();
      setProducts(data);
      setProductsObj(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleCateoryProductsFilter = () => {
    if (prodcutsFilter?.category?.length > 0) {
      return productsObj?.filter((product) => {
        if (prodcutsFilter?.category?.includes(product.category)) {
          return product;
        }
      });
    } else {
      return productsObj || null;
    }
  };

  useEffect(() => {
    const filterdProducts = handleCateoryProductsFilter();
    setProducts({
      ...products,
      products: filterdProducts,
    });
  }, [prodcutsFilter]);

  let total = products?.products?.length;

  let numberOfProductsOnPage = 6;

  const indexOfLastProduct = currentPage * numberOfProductsOnPage;
  const indexOfFirstProduct = indexOfLastProduct - numberOfProductsOnPage;

  filterdProducts =
    products?.products?.length > 0 &&
    products?.products.slice(indexOfFirstProduct, indexOfLastProduct);

  if (!filterdProducts?.length) return null;
  return (
    <div className="row">
      <div className="col-xs-12 col-lg-12">
        <h1 className="text-left">Products</h1>
        <hr />
      </div>
      <div className="col-xs-12 col-md-12 col-lg-8 products-wrapper">
        <div className="row">
          {showFilterPanel && (
            <Filter
              productsList={productsObj}
              setProdcutsFilter={setProdcutsFilter}
              prodcutsFilter={prodcutsFilter}
            />
          )}
          <div className="offset-md-12 offset-lg-12 offset-xs-12">
            <button
              className="btn btn-primary btn-sm pull-right my-2"
              onClick={() => dispatch(toggleFilterPanel())}
            >
              Filter
            </button>
          </div>
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
      <div className="col-xs-12 col-md-12 col-lg-4">
        <Cart />
      </div>
    </div>
  );
};

export default Products;
