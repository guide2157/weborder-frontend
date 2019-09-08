import { Reducer } from 'redux'
import { MenusState, MenusActionTypes } from './types'

// Type-safe initialState!
const initialState: MenusState = {
    data: [],
    errors: undefined,
    loading: false,
    wishList: []
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
            const result = state.wishList.filter((activityID: any) => activityID !== action.payload)
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
        default: {
            return state
        }
    }
}


export { reducer as menusReducer }
