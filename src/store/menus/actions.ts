import { action } from 'typesafe-actions'
import { MenusActionTypes } from './types'

// Here we use the `action` helper function provided by `typesafe-actions`.
export const fetchMenusRequest = (payload?: any) => action(MenusActionTypes.FETCH_REQUEST, payload)


export const fetchSuccess = (payload: any) => action(MenusActionTypes.FETCH_SUCCESS, payload)
export const fetchError = (message: string) => action(MenusActionTypes.FETCH_ERROR, message)

// WishList
export const addWishList = (id: any) => action(MenusActionTypes.ADD_TO_WISH_LIST, id)
export const removeWishList = (id: any) => action(MenusActionTypes.REMOVE_FROM_WISH_LIST, id)
export const clearWishList = () => action(MenusActionTypes.CLEAR_WISH_LIST)

// Orders
export const addOrder = (id: any) => action(MenusActionTypes.ADD_TO_ORDERS, id)
export const removeOrder = (id: any) => action(MenusActionTypes.REMOVE_FROM_ORDERS, id)
export const clearOrder = () => action(MenusActionTypes.CLEAR_ORDERS)
export const placeOrder = (ref: any) => action(MenusActionTypes.PLACE_ORDERS,ref)