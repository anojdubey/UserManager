import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: [
    {
      _id: "1",
      name: "John Doe",
      email: "anoja@gmail.com",
      phone: "9156885245",
    },
  ],
  manage:"adduser",
  editUserData:{}
};

export const userSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.user = action.payload;
    },
    addUser: (state, action) => {
      state.user.push(action.payload);
    },
    updateUser: (state, action) => {
      state.user.map((item) => {
        if (item.id === action.payload.id) {
          item.name = action.payload.name;
          item.email = action.payload.email;
          item.phone = action.payload.phone;
        }
      });
    },
    manageUser: (state, action) => {
      state.manage = action.payload;
    },
    editUser:(state,action)=>{
      state.editUserData = action.payload;
    },
  },
});

export const { setUserData ,manageUser,editUser} = userSlice.actions;

export default userSlice.reducer;
