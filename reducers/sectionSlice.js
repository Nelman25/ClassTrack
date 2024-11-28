import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

const sectionCollectionRef = collection(db, "Sections");

export const fetchSectionsInfo = createAsyncThunk(
  "sectionInfo/fetchSectionsInfo",
  async () => {
    try {
      const data = await getDocs(sectionCollectionRef);
      const sectionInfo = data.docs.map((doc) => {
        const id = doc.id;
        const { members, section, subject } = doc.data();
        return { id, members, section, subject };
      });
      return sectionInfo;
    } catch (err) {
      console.error(err);
    }
  }
);

const initialState = {
  loading: false,
  sectionInfo: [],
  error: "",
};

const sectionSlice = createSlice({
  name: "sectionInfo",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchSectionsInfo.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(fetchSectionsInfo.fulfilled, (state, action) => {
      state.loading = false;
      state.sectionInfo = action.payload;
    });
    builder.addCase(fetchSectionsInfo.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to fetch sections.";
    });
  },
});

export default sectionSlice.reducer;
