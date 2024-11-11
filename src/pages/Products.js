import React, { useEffect, useLayoutEffect, useState } from "react";
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
    rating: null,
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

  useLayoutEffect(() => {
    fetchProducts();
  }, []);

  const handleCateoryProductsFilter = () => {
    let newFIlterdProducts = null;
    if (prodcutsFilter?.category?.length > 0) {
      newFIlterdProducts = productsObj?.filter((product) => {
        if (prodcutsFilter?.category?.includes(product.category)) {
          return product;
        }
      });
    }
    if (prodcutsFilter?.rating !== null) {
      let copyFilterdProducts = structuredClone(newFIlterdProducts);
      if (prodcutsFilter?.category?.length <= 0) {
        copyFilterdProducts = [...productsObj];
      }
      newFIlterdProducts = copyFilterdProducts?.filter((product) => {
        if (product.rating >= prodcutsFilter?.rating) {
          return product;
        }
      });
    }
    return newFIlterdProducts || productsObj || null;
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

  // if (!filterdProducts?.length) return null;
  return (
    <div className="row">
      <div className="col-xs-12 col-lg-12">
        <h1 className="text-left">Products</h1>
        <hr />
      </div>
      <div className="col-xs-12 col-md-12 col-lg-8 products-wrapper">
        <div className="row">
          <Filter
            productsList={productsObj}
            setProdcutsFilter={setProdcutsFilter}
            prodcutsFilter={prodcutsFilter}
            showFilterPanel={showFilterPanel}
          />

          <div className="offset-md-12 offset-lg-12 offset-xs-12">
            <button
              className="btn btn-primary btn-sm pull-right my-2"
              onClick={() => dispatch(toggleFilterPanel())}
            >
              Filter
            </button>
          </div>
          {(filterdProducts?.length === 0 || !filterdProducts) && (
            <div className="text-center">
              <h3>No Products Found</h3>
            </div>
          )}
          {filterdProducts?.length > 0 &&
            filterdProducts?.map((product) => (
              <Product key={product.id} product={product} />
            ))}

          {filterdProducts?.length > 0 && (
            <Pagination
              setCurrentPage={setCurrentPage}
              numberOfProductsOnPage={numberOfProductsOnPage}
              totalProducts={total}
            />
          )}
        </div>
      </div>
      <div className="col-xs-12 col-md-12 col-lg-4">
        <Cart />
      </div>
    </div>
  );
};

export default Products;
