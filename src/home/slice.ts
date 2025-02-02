import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from '@reduxjs/toolkit';
import { RootState } from '@src/redux/store';
import * as browser from 'webextension-polyfill';

const getAccountDetails = async () => {
  try {
    const result = await browser.storage.local.get('accountDetails');

    return result.accountDetails;
  } catch {
    return null;
  }
};

async function getInitialState() {
  const storedAccountDetails = await getAccountDetails();
  console.log('storedAccountDetails: ', storedAccountDetails);

  return {
    data: storedAccountDetails?.data || initialState.data,
  };
}

const initialState = {
  data: 'Hello',
};

export const fetchAccountsState = createAsyncThunk('home/details', async () => {
  return browser.storage.local.get('accountDetails');
});

export const isWalletUnlocked = createAsyncThunk(
  'wallet/lock-status',
  async () => {
    return browser.storage.session.get('walletLock');
  }
);

export const lockWallet = createAsyncThunk(
  'wallet/lock',
  async (_, _thunkAPI) => {
    await browser.storage.session.set({
      walletLock: false,
    });

    return _thunkAPI.dispatch(isWalletUnlocked()).unwrap();
  }
);

export const unlockWallet = createAsyncThunk(
  'wallet/unlock',
  async (_, _thunkAPI) => {
    await browser.storage.session.set({
      walletLock: true,
    });

    return _thunkAPI.dispatch(isWalletUnlocked()).unwrap();
  }
);

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    const fulfilledActions = [
      fetchAccountsState.fulfilled,
      unlockWallet.fulfilled,
      lockWallet.fulfilled,
      isWalletUnlocked.fulfilled,
    ];

    fulfilledActions.forEach((action) => {
      builder.addCase(action, (state, action) => {
        return { ...state, ...action.payload.accountDetails };
      });
    });
  },
});

export const homeSliceAsync = async () => {
  const loadedInitialState = await getInitialState();

  return createSlice({
    name: 'home',
    initialState: loadedInitialState,
    reducers: {},

    extraReducers: (builder) => {
      const fulfilledActions = [
        fetchAccountsState.fulfilled,
        unlockWallet.fulfilled,
        lockWallet.fulfilled,
        isWalletUnlocked.fulfilled,
      ];

      fulfilledActions.forEach((action) => {
        builder.addCase(action, (state, action) => {
          return { ...state, ...action.payload.accountDetails };
        });
      });
    },
  });
};

export type HomeSlice = {
  [homeSlice.name]: ReturnType<(typeof homeSlice)['reducer']>;
};

const selectHome = (state: RootState) => state[homeSlice.name];

export const homeSelectors = createSelector([selectHome], (state) => state);

export default homeSlice.reducer;
