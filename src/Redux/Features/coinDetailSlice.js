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
  coin: [],
  error: "",
};

export const fetchCoinDetail = createAsyncThunk(
  "coin/getCoinDetail",
  async (coinId) => {
    const response = await fetch(
      `https://coinranking1.p.rapidapi.com/coin/${coinId}`,
      options
    );
    const coinDetail = await response.json();
    return coinDetail;
  }
);

const coinDetailSlice = createSlice({
  name: "coin",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchCoinDetail.pending, (state) => {
      state.Loading = true;
      state.coin = [];
      state.error = "";
    });
    builder.addCase(fetchCoinDetail.fulfilled, (state, action) => {
      state.Loading = false;
      state.coin = action.payload;
      state.error = "";
    });
    builder.addCase(fetchCoinDetail.rejected, (state, { error }) => {
      state.Loading = false;
      state.coin = [];
      state.error = error.message;
    });
  },
});

export default coinDetailSlice.reducer;
