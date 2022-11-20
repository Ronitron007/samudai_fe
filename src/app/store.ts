import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import DashboardReducer from './dashboard/dasbooardSlice'
import logInReducer from './ethLogin/ethLoginSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    logIn: logInReducer,
    dashboard: DashboardReducer,
  },
})

export type AppDispatch = typeof store.dispatch // A type returned by App Dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
