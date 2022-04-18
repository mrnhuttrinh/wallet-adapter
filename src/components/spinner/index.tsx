import React from 'react';
// styles
import styles from './styles.module.scss';

// interfaces
interface ISpinnerProps {
    className?: string,
    isFullScreen?: boolean,
}

// main
const Spinner = ({ className, isFullScreen }: ISpinnerProps): JSX.Element => {

    if (isFullScreen) return (
        <div className={`${styles.container} ${className}`}>
            <div className={`${styles.loading} loading`}></div>
        </div>
    );

    return <div className={`${styles.loading} ${className} loading`}></div>;
};

export default Spinner;