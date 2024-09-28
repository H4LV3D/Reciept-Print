import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FormData {
  cardNo: string;
  patientName: string;
  services: string[];
  paymentMethod: string;
  paymentTotal: number;
  amountPaid: number;
  amountOutstanding: number;
}

interface InitialState {
  data: FormData | null;
}

const initialState: InitialState = {
  data: {
    cardNo: "",
    patientName: "",
    services: [],
    paymentMethod: "",
    paymentTotal: 0,
    amountPaid: 0,
    amountOutstanding: 0,
  },
};

const userSlice = createSlice({
  name: "formData",
  initialState,
  reducers: {
    updateForm: (state, action: PayloadAction<FormData>) => {
      state.data = action.payload;
    },
    clearForm: (state) => {
      state.data = null;
    },
  },
});

export const { updateForm, clearForm } = userSlice.actions;
export default userSlice.reducer;
