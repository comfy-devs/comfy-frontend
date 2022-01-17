/* Base */
import styled, { css } from "styled-components";

interface Props {
    readonly secondary?: boolean;
    readonly icon?: string;
    readonly iconText?: boolean;
}

export type ButtonProps = Props & Omit<React.HTMLAttributes<HTMLButtonElement>, "as">;

export default styled.button<Props>`
    z-index: 1;
    display: flex;
    height: 42px;
    min-width: 96px;
    align-items: center;
    justify-content: center;
    padding: 8px 24px;
    font-size: 0.75rem;
    font-family: inherit;
    font-weight: 500;

    transition: 0.2s ease opacity;
    transition: 0.2s ease background-color;

    background-color: var(--color-primary);
    color: var(--color-primary-text);

    border-radius: var(--button-border-radius);
    cursor: pointer;
    border: none;

    &:hover {
        background-color: var(--color-primary-light);
    }
    &:disabled {
        background-color: var(--color-primary) !important;
        cursor: not-allowed;
        opacity: 0.5;
    }
    &:active {
        background-color: var(--color-primary-dark);
    }

    ${(props) =>
        props.secondary &&
        css`
            background-color: var(--color-secondary);
            color: var(--color-secondary-text);

            &:hover {
                background-color: var(--color-secondary-light);
            }
            &:disabled {
                background-color: var(--color-secondary) !important;
                cursor: not-allowed;
                opacity: 0.5;
            }
            &:active {
                background-color: var(--color-secondary-dark);
            }
        `}

    ${(props) =>
        props.icon &&
        css`
            min-width: 38px;
            padding: 0px;
            background-image: url(${props.icon});
            background-size: 24px;
            background-repeat: no-repeat;
            background-position-x: 7px;
            background-position-y: center;
        `}
    
    ${(props) =>
        props.iconText &&
        css`
            padding: 0px 20px 0px 38px;
        `}
`;
