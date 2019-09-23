import React from 'react'

type SvgProps = {
    className?:any
    onClick? : any
}

export const FaPlus: React.FunctionComponent<SvgProps> = ({onClick, className}: SvgProps): JSX.Element => (
    <svg
        className={className}
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

export const FaMinus: React.FunctionComponent<SvgProps> = ({onClick}: SvgProps): JSX.Element => (
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

export const FiHeart: React.FunctionComponent<SvgProps> = ({
    className,
                                                               onClick
                                                           }: SvgProps): JSX.Element => (
    <svg
        className={className}
        stroke="currentColor"
        fill="none"
        strokeWidth="2"
        viewBox="0 0 24 24"
        strokeLinecap="round"
        strokeLinejoin="round"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
        color="#333"
    >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
)