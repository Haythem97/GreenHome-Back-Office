import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import objectService from './objectService';


const initialState = {
    objects: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

// Create new object
export const createObject = createAsyncThunk(
    'objects/create',
    async ({ goalId, objectData }, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await objectService.createObject(goalId,objectData,token)
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

// Get user objects
export const getObjects = createAsyncThunk(
   'objects/getAll',
   async (goalId, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            console.log(token)
            return await objectService.getObjects(goalId,token)
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

// Delete user object
export const deleteObject = createAsyncThunk(
    'objects/delete',
    async (object, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await objectService.deleteObject(object, token)
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const objectSlice = createSlice({
    name: 'object',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createObject.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createObject.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.objects.push(action.payload)
            })
            .addCase(createObject.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getObjects.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getObjects.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.objects = action.payload
            })
            .addCase(getObjects.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deleteObject.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteObject.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.objects = state.objects.filter(
                    (object) => object._id !== action.payload.id
                )
            })
            .addCase(deleteObject.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    },
})

export const { reset } = objectSlice.actions
export default objectSlice.reducer
