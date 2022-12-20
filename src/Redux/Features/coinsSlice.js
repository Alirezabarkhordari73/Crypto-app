import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "b0f1e78a94msh3fe7c2facafbf42p16f9fdjsnf187850e2920",
    "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
  },
};

const initialState = {
  Loading: null,
  coins: [],
  error: "",
};

export const fetchCoins = createAsyncThunk("coins/getCoins", async () => {
  const response = await fetch(
    "https://coinranking1.p.rapidapi.com/coins",
    options
  );
  const coinsList = await response.json();
  return coinsList;
});

const coinsSlice = createSlice({
  name: "coins",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchCoins.pending, (state) => {
      state.Loading = true;
      state.coins = [];
      state.error = "";
    });
    builder.addCase(fetchCoins.fulfilled, (state, action) => {
      state.Loading = false;
      state.coins = action.payload;
      state.error = "";
    });
    builder.addCase(fetchCoins.rejected, (state, { error }) => {
      state.Loading = false;
      state.coins = [];
      state.error = error.message;
    });
  },
});

export default coinsSlice.reducer;
