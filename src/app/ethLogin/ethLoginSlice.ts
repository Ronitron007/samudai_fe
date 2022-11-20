import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Url } from 'url'
import { RootState, AppThunk } from '../../app/store'
import apicall from '../../features/counter/api'
import { signIn } from '../../features/counter/counterAPI'

export interface CounterState {
  value: number
  status: 'idle' | 'loading' | 'failed'
}

// const initialState: CounterState = {
//   value: 0,
//   status: 'idle',
// }
export interface member {
  member_id: string
  username: string | null
  did: ''
  open_for_opportunity: boolean
  captain: boolean
  name: null | string
  email: string
  phone: null | number | string
  about: null | string
  skills: string[] | []
  profile_picture: null | Url | string
  ceramic_stream: null
  subdomain: null
  discord: {
    discord_user_id: ''
    username: ''
    avatar: ''
    discriminator: ''
    locale: ''
    email: ''
  }
  wallets: [
    {
      wallet_id: number
      wallet_address: string
      chain_id: number
      default: boolean
    }
  ]
  default_wallet: {
    id: number
    member_id: string
    wallet_address: string
    chain_id: number
    default: boolean
  }
  default_wallet_address: string
  invite_code: string
  invite_count: number
  created_at: string
  updated_at: null | string
}

export type LogInStatus = 'logged_out' | 'loading' | 'logged_in'

interface LogInState {
  logInStatus: LogInStatus
  member: member | null
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

const internalSignIn = createAsyncThunk(
  'eth/internalSignIn',
  async (payload: any) => {
    const { data: walletAddress } = payload
    let member = await apicall({
      url: `https://dev-gcn.samudai.xyz/api/member/demo/login`,
      method: 'POST',
      payload: { walletAddress: walletAddress, chainId: 1 },
    })
    return member
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
      let signInExternal = dispatch(myasyncExample(statement)).then((resp) => {
        const { payload } = resp
        dispatch(internalSignIn(payload))
      })
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
      .addCase(myasyncExample.rejected, (state) => {
        state.logInStatus = 'logged_out'
      })
      .addCase(internalSignIn.fulfilled, (state, action) => {
        state.logInStatus = 'logged_in'
        state.member = action.payload.data.member
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
