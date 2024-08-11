import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAddress } from '../../services/apiGeocoding';

const initialState = {
  user: '',
  status: 'idel',
  address: '',
  postion: {},
  error: ''
}

function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

export const fetchAddress = createAsyncThunk('user/fetchAddress',
  async function () {
    const positionObj = await getPosition();
    const position = {
      latitude: positionObj.coords.latitude,
      longitude: positionObj.coords.longitude,
    };
    const addressObj = await getAddress(position);
    const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;
    return { position, address };
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateName(state, action) {
      state.user = action.payload
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchAddress.pending, (state) => {
      state.status = 'loading'
    })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.address = action.payload.address,
          state.postion = action.payload.position,
          state.status = 'idel'
      })
      .addCase(fetchAddress.rejected, (state, action) => {
        state.error = action.error.message,
          state.status = 'idel'
      })
  }
})

export const { updateName } = userSlice.actions

export default userSlice.reducer 