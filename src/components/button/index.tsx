import React, { ButtonHTMLAttributes } from 'react';
import Spinner from '../spinner';
import styles from './styles.module.scss';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    primary?: boolean,
    disabled?: boolean,
    disabledClassName?: string,
    isLoading?: boolean;
    children?: React.ReactNode;
    fullWidth?: boolean,
    outline?: boolean;
}

const Button = (props: IButtonProps): JSX.Element => {
    const { primary, disabled, className, disabledClassName, isLoading, children, fullWidth, outline, ...ogButtonProps } = props;

    return (
        <button
            className={[
                styles.container,
                props.className,
                primary ? styles.primary : styles.default,
                isLoading ? styles.loading : '',
                disabled ? `${styles.disabled} ${disabledClassName || ''}` : '',
                fullWidth ? styles.fullWidth : '',
                outline ? styles.outline : '',
            ].join(' ')}
            {...ogButtonProps}
        >
            <div className={styles.content}>
                {children}
                {isLoading && <div className={styles.spinner}><Spinner /></div>}
            </div>
        </button>
    );
};

export default Button;