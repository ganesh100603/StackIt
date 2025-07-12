import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchQuestions = createAsyncThunk("questions", async () => {
  try {
    const res = await axios.get("/api/questions");
    return res.data;
  } catch (error) {
    return error?.response?.error
  }
});

const questionSlice = createSlice({
  name: "question",
  initialState: {
    questions: [],
    loading: false,
  },
  reducers: {
    addQuestion: (state, action) => {
      state.questions.unshift(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.questions = action.payload;
        state.loading = false;
      });
  },
});

export const { addQuestion } = questionSlice.actions;
export default questionSlice.reducer;
