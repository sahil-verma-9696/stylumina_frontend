import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  events: [],
};

const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    // Action to update event data
    updateEventData: (state, action) => {
      const newEvent = action.payload;

      // You can store the event data directly or manipulate it based on your needs
      state.events.push(newEvent);

      // Optionally, you can trim the array if it gets too large
      // state.events = state.events.slice(-50); // Keep the last 50 events, for example
    },
  },
});

export const { updateEventData } = eventSlice.actions;
export default eventSlice.reducer;
