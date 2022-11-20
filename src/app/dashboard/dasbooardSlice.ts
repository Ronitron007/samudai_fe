import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState, AppThunk } from '../../app/store'
import apicall from '../../features/counter/api'

const Covalent_KEY = 'ckey_b35d2712fd444de5b9a07332cef'

export const getTransactions = createAsyncThunk(
  'etc/transactions',
  async (walletAddres: string | null) => {
    let tempWallet = '0xB7b9526e61738032cefAaAEA37164E279ab87C76'
    if (walletAddres) tempWallet = walletAddres
    return await apicall({
      url: `https://api.covalenthq.com/v1/1/address/${tempWallet}/transactions_v2/?&key=${Covalent_KEY}`,
      method: 'GET',
      payload: null,
    })
  }
)

export const getLatestBlockHeight = createAsyncThunk(
  'etc/blockHeight',
  async (chain_id?: number) => {
    let temp_chain_id = 11297108109
    if (chain_id) {
      temp_chain_id = chain_id
    }
    return await apicall({
      url: `https://api.covalenthq.com/v1/${temp_chain_id}/block_v2/latest/?key=${Covalent_KEY}`,
      method: 'GET',
      payload: null,
    })
  }
)

export type SingleTransaction = {
  block_signed_at: string
  block_height: number
  tx_hash: string
  tx_offset: number
  successful: boolean
  from_address: string
  from_address_label: string | null
  to_address: string
  to_address_label: string | null
  value: '0'
  value_quote: number
  gas_offered: number
  gas_spent: number
  gas_price: number
  fees_paid: string | number
  gas_quote: number
  gas_quote_rate: number
  log_events: [
    {
      block_signed_at: string
      block_height: number
      tx_offset: number
      log_offset: number
      tx_hash: string
      raw_log_topics: [string, string, string]
      sender_contract_decimals: number
      sender_name: string
      sender_contract_ticker_symbol: string
      sender_address: string
      sender_address_label: null
      sender_logo_url: string | null
      raw_log_data: string
      decoded: {
        name: string
        signature: string
        params: [
          {
            name: string
            type: string
            indexed: true
            decoded: true
            value: string
          }
        ]
      }
    }
  ]
}

export type transactionAPIresp<TransactionInfo> = {
  data: {
    address: string
    updated_at: string
    next_update_at: string
    quote_currency: string
    chain_id: number
    items: TransactionInfo
    pagination: {
      has_more: boolean
      page_number: number
      page_size: number
      total_count: number | null
    }
  }
  error: boolean
  error_message: string | null
  error_code: string | number | null
}

interface DashboardState {
  wallet: string | null
  loading: boolean
  walletTransactions?: transactionAPIresp<SingleTransaction[]>
  latestBlockHeight?: number
}

const initialState: DashboardState = {
  wallet: null,
  loading: false,
}

export const DashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTransactions.pending, (state) => {
      state.loading = true
    })
    builder.addCase(getTransactions.fulfilled, (state, action) => {
      state.loading = false
      state.walletTransactions = action.payload
    })
    builder.addCase(getLatestBlockHeight.fulfilled, (state, action) => {
      state.latestBlockHeight = action.payload.data.items[0].height
    })
  },
})

export const selectTransactions = (state: RootState) =>
  state.dashboard.walletTransactions
export const selectLatesBlockHeight = (state: RootState) =>
  state.dashboard.latestBlockHeight

export default DashboardSlice.reducer
