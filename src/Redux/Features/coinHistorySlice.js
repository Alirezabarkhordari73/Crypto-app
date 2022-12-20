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
  History: [],
  error: "",
};

export const fetchCoinHistory = createAsyncThunk(
  "history/gethistorys",
  async (coinId, timeperiod) => {
    const response = await fetch(
      `https://coinranking1.p.rapidapi.com/coin/${coinId}/history?timeperiod=${timeperiod}`,
      options
    );
    const coinHistory = await response.json();
    return coinHistory;
  }
);

const coinHistorySlice = createSlice({
  name: "history",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchCoinHistory.pending, (state) => {
      state.Loading = true;
      state.History = [];
      state.error = "";
    });
    builder.addCase(fetchCoinHistory.fulfilled, (state, action) => {
      state.Loading = false;
      state.History = action.payload;
      state.error = "";
    });
    builder.addCase(fetchCoinHistory.rejected, (state, { error }) => {
      state.Loading = false;
      state.History = [];
      state.error = error.message;
    });
  },
});

export default coinHistorySlice.reducer;
