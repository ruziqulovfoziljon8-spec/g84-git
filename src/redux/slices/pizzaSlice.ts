
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export type Pizza = {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
};

interface PizzaState {
  items: Pizza[];
  status: "loading" | "success" | "error";
}

const initialState: PizzaState = {
  items: [],
  status: "loading",
};

export const fetchPizzas = createAsyncThunk<
  Pizza[],
  "rating" | "price" | "title"
>("pizza/fetchPizzas", async (sort) => {
  const { data } = await axios.get<Pizza[]>(
    `http://localhost:3001/pizzas?_sort=${sort}&_order=desc`
  );
  return data;
});

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "success";
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = "error";
      });
  },
});

export default pizzaSlice.reducer;
