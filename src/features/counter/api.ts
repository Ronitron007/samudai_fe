import axios from 'axios'
// import { getToken } from "./localstorage";

type transactionAPIresp = {
  address: '0xb7b9526e61738032cefaaaea37164e279ab87c76'
  updated_at: '2022-11-17T18:59:19.947596327Z'
  next_update_at: '2022-11-17T19:04:19.947596607Z'
  quote_currency: 'USD'
  chain_id: 1
}

type transactionAPIKey = {
  key: string
}

interface APIParams<PAYLOAD_TYPE> {
  url: string
  method: 'POST' | 'GET'
  payload: PAYLOAD_TYPE | null
}

export default async function apicall(params: APIParams<null>) {
  const { url, method, payload } = params
  return axios({
    url,
    method,
    data: payload,
    validateStatus: (status) => status < 500,
  })
    .then((resp) => {
      console.log(resp)
      return resp.data
    })
    .catch((error) => {
      console.log('Axios error', error)
      return { error }
    })
}
