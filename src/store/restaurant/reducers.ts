import { Reducer } from 'redux'
import { RestaurantState, RestaurantActionTypes } from './types'

// Type-safe initialState!
const initialState: RestaurantState = {
    data: undefined,
    errors: undefined,
    loading: false,
}

const reducer: Reducer<RestaurantState> = (state = initialState, action) => {
    switch (action.type) {
        case RestaurantActionTypes.FETCH_REQUEST: {
            return { ...state, loading: true }
        }
        case RestaurantActionTypes.FETCH_SUCCESS: {
            return {
                ...state,
                loading: false,
                data: action.payload.data
            }
        }
        case RestaurantActionTypes.FETCH_ERROR: {
            return { ...state, loading: false, errors: action.payload }
        }
        default: {
            return state
        }
    }
}


export { reducer as restaurantReducer }
