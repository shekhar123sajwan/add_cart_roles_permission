import { createSlice, current } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      let find = state.products.find(
        (product) => product.id === action.payload.id
      );
      if (!find) {
        state.products.push({
          ...action.payload,
          quantity: 1,
          total: action.payload.price,
        });
      } else {
        find.quantity += 1;
        find.total += action.payload.price;
        state.products = state.products.map((product) => {
          return product.id === action.payload.id ? find : product;
        });
      }

      state.quantity += 1;
      state.total += action.payload.price;
    },
    removeProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload.id
      );
      state.quantity -= action.payload.quantity;
      state.total -= action.payload.price * action.payload.quantity;
    },
    increaseProductQuantity: (state, action) => {
      let find = state.products.find(
        (product) => product.id === action.payload.id
      );
      find.quantity += 1;
      find.total += action.payload.price;
      state.quantity += 1;
      state.total += action.payload.price;
    },
    decreaseProductQuantity: (state, action) => {
      let find = state.products.find(
        (product) => product.id === action.payload.id
      );
      find.quantity -= 1;
      find.total -= action.payload.price;
      state.quantity -= 1;
      state.total -= action.payload.price;
    },
  },
});

export const {
  addProduct,
  removeProduct,
  increaseProductQuantity,
  decreaseProductQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
