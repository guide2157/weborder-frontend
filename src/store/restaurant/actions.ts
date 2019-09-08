import { action } from 'typesafe-actions'
import { RestaurantActionTypes } from './types'

// Here we use the `action` helper function provided by `typesafe-actions`.
export const fetchRequest = (payload?: any) => action(RestaurantActionTypes.FETCH_REQUEST, payload)


export const fetchSuccess = (payload: any) => action(RestaurantActionTypes.FETCH_SUCCESS, payload)
export const fetchError = (message: string) => action(RestaurantActionTypes.FETCH_ERROR, message)
