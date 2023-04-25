import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ICategory} from "../../types";

const initialState: ICategory[] = [];

const CategorySlice = createSlice({
  name: "Category",
  initialState,
  reducers: {
    categorys: (_, action: PayloadAction<ICategory[]>) => {
      return action.payload;
    },
    clearCategory: () => {
      return initialState;
    },
  },
});

// Action creators are generated for each case reducer function
export const {categorys, clearCategory} = CategorySlice.actions;

export default CategorySlice.reducer;
