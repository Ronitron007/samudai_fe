import { ethers } from 'ethers'
import { SiweMessage } from 'siwe'

const domain = window.location.host
const origin = window.location.origin
export const enum Providers {
  METAMASK = 'metamask',
  WALLET_CONNECT = 'walletconnect',
}

declare global {
  interface Window {
    ethereum: { request: (opt: { method: string }) => Promise<Array<string>> }
    web3: unknown
  }
}
const metamask = window.ethereum
const provider = new ethers.providers.Web3Provider(window.ethereum)
const signer = provider.getSigner()

// connector: Providers ; if other wallets need to be included
export const signIn = async (statement: string) => {
  let provider: ethers.providers.Web3Provider
  // if (connector === "metamask"){
  await metamask.request({ method: 'eth_requestAccounts' })
  provider = new ethers.providers.Web3Provider(metamask)
  // }
  console.log('awaited 1')
  const [address] = await provider.listAccounts()
  if (!address) {
    throw new Error('Address not found.')
  } else {
    console.log(address)
  }
  let ens: string | null
  try {
    ens = await provider.lookupAddress(address)
    console.log(ens)
  } catch (error) {
    console.error(error)
  }

  // return
  // const nonce = "yxou dont have to typecast this anymore. This is implict definition";

  const message = new SiweMessage({
    domain: document.location.host,
    address,
    chainId: await provider.getNetwork().then(({ chainId }) => chainId),
    uri: document.location.origin,
    version: '1',
    statement: statement,
  }).prepareMessage()
  let signedMessage = await provider.getSigner().signMessage(message)
  return { data: address }
}
// function createSiweMessage (address, statement) {
//   const message = new SiweMessage({
//     domain,
//     address,
//     statement,
//     uri: origin,
//     version: '1',
//     chainId: '1'
//   });
//   return message.prepareMessage();
// }

// function connectWallet () {
//   provider.send('eth_requestAccounts', [])
//     .catch(() => console.log('user rejected request'));
// }

// async function signInWithEthereum () {
//   console.log(signer)
//   const message = createSiweMessage(
//       await signer.getAddress(),
//       'Sign in with Ethereum to the app.'
//     );
//   console.log(await signer.signMessage(message), message, "and this is our confirmation probably");
// }

// // Buttons from the HTML page
// const connectWalletBtn = document.getElementById('connectWalletBtn');
// const siweBtn = document.getElementById('siweBtn');
// connectWalletBtn.onclick = connectWallet;
// siweBtn.onclick = signInWithEthereum;

// A mock function to mimic making an async request for data
export function fetchCount(amount = 1) {
  return new Promise<{ data: number }>((resolve) =>
    setTimeout(() => resolve({ data: amount }), 500)
  )
}
