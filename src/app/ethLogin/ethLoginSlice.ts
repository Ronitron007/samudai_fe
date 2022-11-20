import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState, AppThunk } from '../../app/store'
import { signIn } from '../../features/counter/counterAPI'

export interface CounterState {
  value: number
  status: 'idle' | 'loading' | 'failed'
}

// const initialState: CounterState = {
//   value: 0,
//   status: 'idle',
// }
interface member {
  member_id: string
}

export type LogInStatus = 'logged_out' | 'loading' | 'logged_in'

interface LogInState {
  logInStatus: LogInStatus
  member: string | null
}
const initialState: LogInState = {
  logInStatus: 'logged_out',
  member: null,
}

export const myasyncExample = createAsyncThunk(
  'eth/signIn',
  async (statement: string) => {
    console.log(statement)
    // signIn(Providers.METAMASK, statement)
    return await signIn(statement)
  }
)

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.

export const logInFlow =
  (statement: string): AppThunk =>
  (dispatch, getState) => {
    const currentStatus = getLogInStatus(getState())
    if (currentStatus === 'logged_out') {
      dispatch(setLoading())
      dispatch(myasyncExample(statement))
    }
  }

export const LogInSlice = createSlice({
  name: 'logIn',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.logInStatus = 'loading'
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(myasyncExample.pending, (state) => {
        console.log(state.logInStatus, 'we loading')
        state.logInStatus = 'loading'
      })
      .addCase(myasyncExample.fulfilled, (state, action) => {
        state.logInStatus = 'logged_in'
        state.member = action.payload.data
      })
      .addCase(myasyncExample.rejected, (state) => {
        state.logInStatus = 'logged_out'
      })
  },
})

export const { setLoading } = LogInSlice.actions

export default LogInSlice.reducer
// export const { increment, decrement, incrementByAmount } = counterSlice.actions

// The function below is called a SELECTOR FUNCTION and allows us to select a value from
// the state.
//Selectors can also be defined inline where they're used instead of
// in the slice file.
//For example: `useSelector((state: RootState) => state.counter.value)`
export const selectCount = (state: RootState) => state.counter.value
export const getLogInStatus = (state: RootState) => state.logIn.logInStatus
export const getMember = (state: RootState) => state.logIn.member
