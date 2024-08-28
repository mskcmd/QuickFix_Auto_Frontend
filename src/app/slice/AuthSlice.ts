import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReactNode } from "react";
import { MechanicProfile } from "../../Components/Common/Interface";

// export interface UserData {
//     _id: string;
//     name: string;
//     email: string;
//     phone: string;
//     password: string;
//     token: string;
//     refreshToken: string;
//     userId: string;
// }

export interface MechanicResponse {
  email: string;
  isCompleted: boolean;
  isMechanic: boolean;
  isSubscriber?: boolean;
  isVerified: boolean;
  name: string;
  phone: string;
  __v: number;
  _id: string;
  mechnicId: string; // Consider correcting the spelling if applicable
  message: string;
  refreshToken: string;
  succuss: boolean; // Consider correcting the spelling if applicable
  token: string;
}

export interface UserData {
  name: ReactNode;
  success: boolean;
  message: string;
  data: {
    email: string;
    isUser: boolean;
    isVerified: boolean;
    name: string;
    phone: string;
    imageUrl?:string
  };
  userId: string;
  token: string;
  refreshToken: string;
}
interface AdminData {
  email: string;
  password: string;
}


interface AuthState {
  userData: UserData | null;
  mechanicData: MechanicResponse | null;
  adminData: AdminData | null;
  userSerchData: MechanicProfile | null;

}

const initialState: AuthState = {
  userData: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo") as string)
    : null,
  mechanicData: localStorage.getItem("mechInfo")
    ? JSON.parse(localStorage.getItem("mechInfo") as string)
    : null,
  adminData: localStorage.getItem("adminInfo")
    ? JSON.parse(localStorage.getItem("adminInfo") as string)
    : null,
  userSerchData: localStorage.getItem("userSercInfo")
    ? JSON.parse(localStorage.getItem("userSercInfo") as string)
    : null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserCredential: (state, action: PayloadAction<UserData>) => {
      state.userData = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    setMechanicCredential: (state, action: PayloadAction<MechanicResponse>) => {
      state.mechanicData = action.payload;
      localStorage.setItem("mechInfo", JSON.stringify(action.payload));
    },
    setAdminCredential: (state, action: PayloadAction<AdminData>) => {
      state.adminData = action.payload;
      localStorage.setItem("adminInfo", JSON.stringify(action.payload));
    },
    setUserSerchCredential: (state, action: PayloadAction<MechanicProfile>) => {
      state.userSerchData = action.payload;
      localStorage.setItem("userSercInfo", JSON.stringify(action.payload));
    },
    clearUserCredential: (state) => {
      state.userData = null;
      localStorage.removeItem("userInfo");
    },
    userLogout: (state) => {
      state.userData = null;
      localStorage.removeItem("userInfo");
    },
    mechLogout: (state) => {
      state.mechanicData = null;
      localStorage.removeItem("mechInfo");
    },
    adminLogout: (state) => {
      state.adminData = null;
      localStorage.removeItem("adminInfo");
    },

  },
});

export const {
  setUserCredential,
  clearUserCredential,
  setMechanicCredential,
  setAdminCredential,
  userLogout,
  mechLogout,
  adminLogout,
  setUserSerchCredential
} = authSlice.actions;

export default authSlice.reducer;
