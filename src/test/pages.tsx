import axios from 'axios';
import React, { useState } from 'react';
import { Loader } from '../components/loader/loader.component';
import {
  checkTransactionStatus,
  LOCAL_STORAGE_KEYS,
  tokenizationAPIMultiStageNestMintEndpoint,
  tokenizationBaseURL,
} from '@src/shared-kernel/constants';
import '@src/styles/main.css';

const TokensPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [inputJson, setInputJson] = useState<any>('');
  const [networkName, setNetworkName] = useState<string>('');
  const [tokenData, setTokenData] = useState(null);
  const [backendResponse, setBackendResponse] = useState(null);
  const [showResponse, setShowResponse] = useState(false);

  const setLocalStorage = (key: string, val: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, val);
    } else {
      return null;
    }
  };

  const handleJsonInput = async () => {
    try {
      const parsedData = JSON.parse(inputJson);

      setNetworkName(parsedData.network);
      setLocalStorage(LOCAL_STORAGE_KEYS.NETWORK, parsedData.network);

      delete parsedData.network;

      setTokenData(parsedData);
      setShowResponse(false);
      setLoading(false);
    } catch {
      alert('Invalid JSON format');
    } finally {
      setLoading(false);
    }
  };

  const tokenizeDiamond = async () => {
    if (!inputJson) return;

    try {
      const parsedJSON = JSON.parse(inputJson);
      const { contractAddress, tokenId } = parsedJSON;

      if (!contractAddress || !tokenId) {
        throw new Error('Contract address and token ID must be provided.');
      }

      setLoading(true);

      const { data } = await axios.post(
        tokenizationBaseURL +
          tokenizationAPIMultiStageNestMintEndpoint(contractAddress),
        parsedJSON
      );

      const backendResponse = { ...data };

      setLocalStorage(LOCAL_STORAGE_KEYS.CONTRACT_ADDRESS, contractAddress);
      setLocalStorage(LOCAL_STORAGE_KEYS.ROOT_TOKEN_ID, tokenId);
      setLocalStorage(
        LOCAL_STORAGE_KEYS.TRANSACTION_ID,
        backendResponse.transactionID
      );

      setBackendResponse({ ...backendResponse, checkTransactionStatus });
      setShowResponse(true);
      setTokenData(null);
    } catch {
      alert('Failed to tokenize. Check console for details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex items-center justify-center p-10">
      <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg p-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Rough Diamond Data Simulation
        </h1>

        <textarea
          className="w-full h-40 p-2 border border-gray-300 rounded-md mb-4 bg-gray-200 text-gray-800"
          value={inputJson}
          onChange={(e) => setInputJson(e.target.value)}
          placeholder="Paste your JSON here..."
        />
        <button
          className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          onClick={handleJsonInput}
        >
          Analyze and Verify Content
        </button>

        {loading ? (
          <div className="flex justify-center items-center mt-6">
            <Loader />
          </div>
        ) : (
          <>
            {showResponse && backendResponse && (
              <div className="mb-4 p-4 bg-gray-100 rounded-md border border-gray-300">
                <h2 className="text-xl font-semibold text-gray-800">
                  Blockchain Transaction Response
                </h2>
                <p className="text-gray-800">
                  <span className="font-medium">Transaction ID:</span>{' '}
                  {backendResponse.transactionID}
                </p>
                <p className="text-gray-800">
                  <span className="font-medium">Hash:</span>{' '}
                  {backendResponse.hash}
                </p>
                <p className="text-gray-800">
                  <span className="font-medium">Message:</span>{' '}
                  {backendResponse.message}
                </p>
                <p className="mt-3 text-gray-800">
                  <span className="font-medium">View transaction:</span>{' '}
                  <button className="font-medium mt-2 cursor-pointer text-blue-600 hover:underline">
                    Click here
                  </button>
                </p>
              </div>
            )}

            {!showResponse && tokenData && (
              <div className="mb-4 p-4 bg-gray-100 rounded-md border border-gray-300">
                <h2 className="text-xl font-semibold text-gray-800">
                  Chain Info
                </h2>
                <p className="text-gray-800">
                  <span className="font-medium">Network:</span> {networkName}
                </p>
                <p className="text-gray-800">
                  <span className="font-medium">Owner Address:</span>{' '}
                  {tokenData.ownerAddress}
                </p>
                <p className="text-gray-800">
                  <span className="font-medium">Contract Address:</span>{' '}
                  {tokenData.contractAddress}
                </p>
              </div>
            )}

            {/* {!showResponse && (
              <div className="max-h-[75vh] overflow-y-auto p-4 border border-gray-300 rounded-lg">
                {tokenData ? (
                  <TokenItem token={tokenData} />
                ) : (
                  <p className="text-gray-500">No token data available.</p>
                )}
              </div>
            )} */}

            {!showResponse && (
              <div>
                {tokenData ? (
                  <TreeBox token={tokenData} />
                ) : (
                  <p className="text-gray-500">No token data available.</p>
                )}
              </div>
            )}
          </>
        )}

        <button
          className="mt-4 px-6 py-3 text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          onClick={tokenizeDiamond}
        >
          Tokenize Diamond
        </button>
      </div>
    </div>
  );
};

export default TokensPage;
