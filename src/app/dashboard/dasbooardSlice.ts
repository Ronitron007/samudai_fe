import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState, AppThunk } from '../../app/store'
import apicall from '../../features/counter/api'

const Covalent_KEY = 'ckey_b35d2712fd444de5b9a07332cef'

export const getTransactions = createAsyncThunk(
  'etc/transactions',
  async (walletAddres?: string) => {
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
  block_signed_at: '2022-10-14T18:28:35Z'
  block_height: 15748139
  tx_hash: '0x14e2c152b757d13a671b4d639a7b43d020a3ff1e50aacaedbec0dc178405ed00'
  tx_offset: 46
  successful: true
  from_address: '0xb513936331b4179f57b49fd593f6e526ee1e1995'
  from_address_label: null
  to_address: '0xc48b4814faed1ccc885dd6fde62a6474aecbb19a'
  to_address_label: null
  value: '0'
  value_quote: 0.0
  gas_offered: 581064
  gas_spent: 341976
  gas_price: 18363310805
  fees_paid: '6279811575850680'
  gas_quote: 8.245286811250455
  gas_quote_rate: 1312.983154296875
  log_events: [
    {
      block_signed_at: '2022-10-14T18:28:35Z'
      block_height: 15748139
      tx_offset: 46
      log_offset: 95
      tx_hash: '0x14e2c152b757d13a671b4d639a7b43d020a3ff1e50aacaedbec0dc178405ed00'
      raw_log_topics: [
        '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
        '0x000000000000000000000000b513936331b4179f57b49fd593f6e526ee1e1995',
        '0x000000000000000000000000b7b9526e61738032cefaaaea37164e279ab87c76'
      ]
      sender_contract_decimals: 9
      sender_name: 'Coin Merge'
      sender_contract_ticker_symbol: 'CMERGE'
      sender_address: '0xc48b4814faed1ccc885dd6fde62a6474aecbb19a'
      sender_address_label: null
      sender_logo_url: 'https://logos.covalenthq.com/tokens/0xc48b4814faed1ccc885dd6fde62a6474aecbb19a.png'
      raw_log_data: '0x00000000000000000000000000000000000000000000000000038d7ea4c68000'
      decoded: {
        name: 'Transfer'
        signature: 'Transfer(indexed address from, indexed address to, uint256 value)'
        params: [
          {
            name: 'from'
            type: 'address'
            indexed: true
            decoded: true
            value: '0xb513936331b4179f57b49fd593f6e526ee1e1995'
          }
        ]
      }
    }
  ]
}

export type transactionAPIresp<TransactionInfo> = {
  data: {
    address: '0xb7b9526e61738032cefaaaea37164e279ab87c76'
    updated_at: '2022-11-17T20:16:03.464004203Z'
    next_update_at: '2022-11-17T20:21:03.464004683Z'
    quote_currency: 'USD'
    chain_id: 1
    items: TransactionInfo
    pagination: {
      has_more: false
      page_number: 0
      page_size: 100
      total_count: null
    }
  }
  error: false
  error_message: null
  error_code: null
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
