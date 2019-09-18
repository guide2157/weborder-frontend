import { Reducer } from 'redux'
import { MenusState, MenusActionTypes } from './types'

// Type-safe initialState!
const initialState: MenusState = {
    data: [],
    errors: undefined,
    loading: false,
    wishList: [],
    orders: []
}

const reducer: Reducer<MenusState> = (state = initialState, action) => {
    switch (action.type) {
        case MenusActionTypes.FETCH_REQUEST: {
            return { ...state, loading: true }
        }
        case MenusActionTypes.FETCH_SUCCESS: {
            return {
                ...state,
                loading: false,
                data: action.payload.data
            }
        }
        case MenusActionTypes.FETCH_ERROR: {
            return { ...state, loading: false, errors: action.payload }
        }
        case MenusActionTypes.ADD_TO_WISH_LIST: {
            const { wishList } = state
            wishList.push(action.payload)
            return {
                ...state,
                wishList
            }
        }
        case MenusActionTypes.REMOVE_FROM_WISH_LIST: {
            const result = state.wishList.filter((menuID: any) => menuID !== action.payload)
            return {
                ...state,
                wishList: result
            }
        }
        case MenusActionTypes.CLEAR_WISH_LIST: {
            return {
                ...state,
                wishList: []
            }
        }
        case MenusActionTypes.ADD_TO_ORDERS: {
            const { orders } = state
            orders.push(action.payload)
            return {
                ...state,
                orders
            }
        }
        case MenusActionTypes.REMOVE_FROM_ORDERS: {
            const result = state.orders.filter((menuID: any) => menuID !== action.payload)
            return {
                ...state,
                orders: result
            }
        }
        case MenusActionTypes.CLEAR_ORDERS: {
            return {
                ...state,
                orders: []
            }
        }

        default: {
            return state
        }
    }
}


export { reducer as menusReducer }
