import React, { useEffect } from "react";

const Filter = ({ productsList, setProdcutsFilter, prodcutsFilter }) => {
  useEffect(() => {
    const myDiv = document.querySelector(".filter-wrapper");
    const offsetTop = myDiv.offsetTop;

    window.onscroll = () => {
      if (window.scrollY > offsetTop) {
        myDiv.classList.add("fixed-top-filter");
      } else {
        myDiv.classList.remove("fixed-top-filter");
      }
    };
  }, []);

  const categories = [
    ...new Set(productsList.map((product) => product.category)),
  ];
  const priceRange = [...new Set(productsList.map((product) => product.price))];
  return (
    <div className="filter-wrapper">
      <div className="mb-3">
        <h6>Category</h6>
        <ul className="list-unstyled">
          {categories?.map((category) => (
            <li key={category}>
              <input
                type="checkbox"
                id={category}
                className="form-check-input"
                name={category}
                onChange={(e) => {
                  setProdcutsFilter({
                    ...prodcutsFilter,
                    category: e.target.checked
                      ? [...prodcutsFilter.category, category]
                      : prodcutsFilter.category.filter(
                          (item) => item !== category
                        ),
                  });
                }}
              />
              <label htmlFor={category} className="form-check-label ms-1">
                {category?.toUpperCase()}
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Rating Filter */}
      <div className="mb-3">
        <h6>Rating</h6>
        <ul className="list-unstyled">
          <li>
            <input
              type="radio"
              name="rating"
              id="rating1"
              className="form-check-input"
            />
            <label htmlFor="rating1" className="form-check-label">
              1 Star &amp; Up
            </label>
          </li>
          <li>
            <input
              type="radio"
              name="rating"
              id="rating2"
              className="form-check-input"
            />
            <label htmlFor="rating2" className="form-check-label">
              2 Stars &amp; Up
            </label>
          </li>
          <li>
            <input
              type="radio"
              name="rating"
              id="rating3"
              className="form-check-input"
            />
            <label htmlFor="rating3" className="form-check-label">
              3 Stars &amp; Up
            </label>
          </li>
          <li>
            <input
              type="radio"
              name="rating"
              id="rating4"
              className="form-check-input"
            />
            <label htmlFor="rating4" className="form-check-label">
              4 Stars &amp; Up
            </label>
          </li>
          <li>
            <input
              type="radio"
              name="rating"
              id="rating5"
              className="form-check-input"
            />
            <label htmlFor="rating5" className="form-check-label">
              5 Stars
            </label>
          </li>
        </ul>
      </div>
      <div className="mb-3">
        <h6>Price Range</h6>
        <input
          type="range"
          className="form-range"
          id="priceRange"
          min={Math.min(...priceRange)}
          max={Math.max(...priceRange)}
          step={10}
        />
        <div className="d-flex justify-content-between">
          <span>${Math.min(...priceRange)}</span>
          <span>${Math.max(...priceRange)}</span>
        </div>
      </div>
    </div>
  );
};

export default Filter;
