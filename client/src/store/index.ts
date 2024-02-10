import { configureStore } from '@reduxjs/toolkit'
import { createWrapper, Context } from 'next-redux-wrapper'
import { rootReducer } from './reducers'

const configureStoreWrapper = (context: Context) =>
  configureStore({
    reducer: rootReducer,
  })

export const wrapper = createWrapper(configureStoreWrapper, { debug: true })
