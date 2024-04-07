import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { user: null, token: null, posts: [], loggedIn: false },
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.loggedIn = true;
    },
    setLogout: (state, action) => {
      state.user = null;
      state.token = null;
      state.loggedIn = false;
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.log("No friends");
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
  },
});

export default userSlice.reducer;
export const { setLogin, setLogout, setFriends, setPosts } = userSlice.actions;
