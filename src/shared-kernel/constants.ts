export enum LOCAL_STORAGE_KEYS {
  TRANSACTION_ID = "transactionId",
  NETWORK = "network",
  CONTRACT_ADDRESS = "contractAddress",
  ROOT_TOKEN_ID = "rootTokenId",
}

export const checkTransactionStatus = "./check-tx-status";

export enum TRANSACTION_STATUSES {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  FAILED = "FAILED",
}

// tokenisation api urls
export const tokenizationBaseURL = process.env.NEXT_PUBLIC_TOKENISATION_BASE_URL;

export const getTransactionUrl = (transactionID: string) =>
  `${tokenizationBaseURL}/transaction/${transactionID}`;

export const tokenizationAPIMultiStageNestMintEndpoint = (
  contractAddress: string
) => `/erc7401/${contractAddress}/process/single`;

// function returnValueWithLocalStroage() {
//   if(typeof window !== 'undefined'){
//     return `${tokenizationBaseURL}/erc7401/${localStorage.getItem(
//       LOCAL_STORAGE_KEYS.CONTRACT_ADDRESS
//     )}/token/${localStorage.getItem(LOCAL_STORAGE_KEYS.ROOT_TOKEN_ID)}`
//    } else {
//     return '';
//    }
// }

// 
// export const getChildrenOfTokenUrl = returnValueWithLocalStroage();
