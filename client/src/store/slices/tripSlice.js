import { createSlice } from "@reduxjs/toolkit";

const tripSlice = createSlice({
    name:"tripData",
    initialState:{
        tripId:"",
        tripAmount:0,
        totalBookings:0,
},

    reducers:{

        setTripData:(state,action)=>{
            const {tripId,tripAmount,totalBookings} = action.payload;
            state.tripId = tripId;
            state.tripAmount = tripAmount;
            state.totalBookings = totalBookings;
        }
    }
})

export const {setTripData} = tripSlice.actions
export default tripSlice.reducer