// This file holds our state type, as well as any other types related to this Redux store.

// Response object for GET /Activities
export interface Menu extends ApiResponse {
    about: string
    category_name: string
    detail: string
    image: string
    id: number
    meta_description: string
    meta_title: string
    name: string
    price: number
    slug: string
    tags: string[]
    updated_at: number
}

// This type is shorthand for `{ [key: string]: any }`.
export type ApiResponse = Record<string, any>

export enum MenusActionTypes {
    FETCH_REQUEST = '@@menus/FETCH_REQUEST',
    FETCH_SUCCESS = '@@menus/FETCH_SUCCESS',
    FETCH_ERROR = '@@menus/FETCH_ERROR',
    ADD_TO_WISH_LIST = '@@menus/ADD_TO_WISH_LIST',
    REMOVE_FROM_WISH_LIST = '@@menus/REMOVE_FROM_WISH_LIST',
    CLEAR_WISH_LIST = '@@menus/CLEAR_WISH_LIST'
}

// Declare state types with `readonly` modifier to get compile time immutability.
// https://github.com/piotrwitek/react-redux-typescript-guide#state-with-type-level-immutability
export interface MenusState {
    readonly loading: boolean
    readonly data: Menu[]
    readonly errors?: string
    wishList: number[]
}
