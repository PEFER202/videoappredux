import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch all videos
export const fetchVideos = createAsyncThunk("video/fetchVideos", async () => {
  try {
    const response = await axios.get("http://localhost:5000/Videos");
    return response.data;
  } catch (error) {
    throw Error("Failed to fetch videos data");
  }
});

// Add a new video
export const addNewVideo = createAsyncThunk(
  "video/addNewVideo",
  async (newVideo) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/Videos",
        newVideo
      );
      return response.data;
    } catch (error) {
      throw Error("Failed to add video");
    }
  }
);

// Update a video
export const updateVideo = createAsyncThunk(
  "video/updateVideo",
  async ({ id, updatedVideo }) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/Videos/${id}`,
        updatedVideo
      );
      return response.data;
    } catch (error) {
      throw Error("Failed to update video");
    }
  }
);

// Delete a video
export const deleteVideo = createAsyncThunk("video/deleteVideo", async (id) => {
  try {
    await axios.delete(`http://localhost:5000/Videos/${id}`);
    return id;
  } catch (error) {
    throw Error("Failed to delete video");
  }
});

const videoSlice = createSlice({
  name: "video",
  initialState: { videos: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVideos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchVideos.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.videos = action.payload;
      })
      .addCase(fetchVideos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addNewVideo.fulfilled, (state, action) => {
        state.videos.push(action.payload);
      })
      .addCase(updateVideo.fulfilled, (state, action) => {
        const index = state.videos.findIndex(
          (video) => video.id === action.payload.id
        );
        if (index !== -1) {
          state.videos[index] = action.payload;
        }
      })
      .addCase(deleteVideo.fulfilled, (state, action) => {
        state.videos = state.videos.filter(
          (video) => video.id !== action.payload
        );
      });
  },
});

export default videoSlice.reducer;
