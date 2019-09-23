import React from 'react'

type SvgProp = {
    onClick? : any
}

export const FaPlus: React.FunctionComponent<SvgProp> = ({onClick}: SvgProp): JSX.Element => (
    <svg
        onClick={onClick}
        stroke="currentColor"
        fill="currentColor"
        viewBox="0 0 448 512"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
        color="#333"
    >
        <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
    </svg>
)

export const FaMinus: React.FunctionComponent<SvgProp> = ({onClick}: SvgProp): JSX.Element => (
    <svg
        onClick={onClick}
        stroke="currentColor"
        fill="currentColor"
        viewBox="0 0 448 512"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
        color="#333"
    >
        <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
    </svg>
)
