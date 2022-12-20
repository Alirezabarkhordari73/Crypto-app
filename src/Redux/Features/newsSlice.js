import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const options = {
  method: "GET",
  headers: {
    "X-BingApis-SDK": "true",
    "X-RapidAPI-Key": "b0f1e78a94msh3fe7c2facafbf42p16f9fdjsnf187850e2920",
    "X-RapidAPI-Host": "bing-news-search1.p.rapidapi.com",
  },
};

const initialState = {
  Loading: null,
  news: [],
  error: "",
};

export const fetchNews = createAsyncThunk(
  "news/getNews",
  async ({ newsCategory }) => {
    const response = await fetch(
      `https://bing-news-search1.p.rapidapi.com/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw`,
      options
    );
    const newsList = await response.json();
    return newsList;
  }
);

const newsSlice = createSlice({
  name: "news",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchNews.pending, (state) => {
      state.Loading = true;
      state.news = [];
      state.error = "";
    });
    builder.addCase(fetchNews.fulfilled, (state, action) => {
      state.Loading = false;
      state.news = action.payload;
      state.error = "";
    });
    builder.addCase(fetchNews.rejected, (state, { error }) => {
      state.Loading = false;
      state.news = [];
      state.error = error.message;
    });
  },
});

export default newsSlice.reducer;
