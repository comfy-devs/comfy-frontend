/* Base */
import styled, { css } from "styled-components";

interface Props {
    readonly secondary?: boolean;
}

export type CheckboxProps = Props & Omit<React.HTMLAttributes<HTMLInputElement>, "as">;

export default styled.input<Props>`
    z-index: 1;
    display: flex;
    height: 36px;
    width: 36px;

    transition: 0.2s ease opacity;
    transition: 0.2s ease background-color;

    background-color: var(--color-primary);
    color: var(--color-primary-text);

    cursor: pointer;

    &:hover {
        background-color: var(--color-primary-light);
    }
    &:disabled {
        cursor: not-allowed;
        background-color: var(--color-primary-disabled);
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
                cursor: not-allowed;
                background-color: var(--color-secondary-disabled);
            }
            &:active {
                background-color: var(--color-secondary-dark);
            }
        `}
`;
