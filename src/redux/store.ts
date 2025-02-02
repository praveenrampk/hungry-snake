import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import homeReducer, { homeSlice, homeSliceAsync } from '@src/home/slice';

export const store = configureStore({
  reducer: {
    [homeSlice.name]: homeReducer,
  },
});

export const storeAsync = async () => {
  const homeSliceAsyncReducer = (await homeSliceAsync()).reducer;

  return configureStore({
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        immutableCheck: { warnAfter: 128 },
        serializableCheck: { warnAfter: 128 },
      }),
    reducer: {
      [homeSlice.name]: homeSliceAsyncReducer,
    },
  });
};

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
