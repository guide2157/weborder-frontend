// This file holds our state type, as well as any other types related to this Redux store.

// Response object for GET /Activities
import {Menu} from "../menus/types";

export interface Restaurant extends ApiResponse {
    detail: string
    gallery: string[]
    id: number
    image_thumbnail: string
    meta_description: string
    meta_title: string
    name: string
    slug: string
    tags: string[]
    featured_menus: Menu[]
    updated_at: number
}

// This type is shorthand for `{ [key: string]: any }`.
export type ApiResponse = Record<string, any>

export enum RestaurantActionTypes {
    FETCH_REQUEST = '@@restaurant/FETCH_REQUEST',
    FETCH_SUCCESS = '@@restaurant/FETCH_SUCCESS',
    FETCH_ERROR = '@@restaurant/FETCH_ERROR',
}

// Declare state types with `readonly` modifier to get compile time immutability.
// https://github.com/piotrwitek/react-redux-typescript-guide#state-with-type-level-immutability
export interface RestaurantState {
    readonly loading: boolean
    readonly data: Restaurant | undefined
    readonly errors?: string
}
