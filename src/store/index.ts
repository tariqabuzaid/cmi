import {configureStore} from '@reduxjs/toolkit';
import notesReducer from './notesSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {combineReducers} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';

const reducers = combineReducers({
  notes: notesReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
