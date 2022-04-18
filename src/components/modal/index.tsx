import React from 'react';
import ReactDOM from 'react-dom';

import Button from '../button';

import styles from './styles.module.scss';

// interfaces
interface IModalProps {
    className?: string,
    children: React.ReactNode,
    title?: string,
    onClose?: () => void,
    actions?: React.ReactNode,
    preventManuallyClose?: boolean,
    disabledOverlay?: boolean,
    disabledFooter?: boolean,
    bodyClassName?: string,
    mainClassName?: string;
    theme?: 'green' | '',
    id?: string | number;
    disabledOverlayClick?: boolean;
}

// main
const Modal = ({ id, className, theme, bodyClassName, mainClassName, children, title, onClose, actions, preventManuallyClose, disabledFooter, disabledOverlay, disabledOverlayClick = true }: IModalProps): JSX.Element => {
    const [animating, setAnimating] = React.useState<'open' | 'close' | 'stay' | undefined>(undefined);
    const timeoutHandlerRef = React.useRef<ReturnType<typeof setTimeout> | undefined>();

    const getClassNameWithAnimatingState = (): string => {
        switch (animating) {
            case 'open': return styles.showing;
            case 'stay': return styles.stay;
            case 'close': return styles.hidding;
            default: return '';
        }
    };

    const close = React.useCallback((): void => {
        if (preventManuallyClose) return;

        setAnimating('close');
        timeoutHandlerRef.current = setTimeout(() => {
            setAnimating('stay');
            if (onClose) onClose();
        }, 300);
    }, [onClose, preventManuallyClose]);

    const handleKeyUpEventListener = React.useCallback((e: KeyboardEvent): void => {
        switch (e.key) {
            case 'Escape': {
                close();
                break;
            }
            default:
                break;
        }
    }, [close]);

    React.useEffect(() => {
        window.addEventListener('keyup', handleKeyUpEventListener);
        setAnimating('open');
        timeoutHandlerRef.current = setTimeout(() => {
            setAnimating('stay');
        }, 300);

        return (): void => {
            if (id) {
                removeExtendModalById(id);
            }
            if (timeoutHandlerRef.current) clearTimeout(timeoutHandlerRef.current);
            window.removeEventListener('keyup', handleKeyUpEventListener);
        };
    }, [handleKeyUpEventListener, id]);

    return (
        <div className={[styles.container, theme === 'green' ? styles.green : '', disabledOverlay ? styles.disabledOverlay : '', className].join(' ')}>
            {
                !disabledOverlay
                &&
                <div className={styles.overlay} onClick={disabledOverlayClick ? (): void => {
                    //
                } : close } />
            }
            <div className={[
                styles.body,
                bodyClassName,
                getClassNameWithAnimatingState(),
            ].join(' ')}>
                {
                    !preventManuallyClose
                    &&
                    <Button primary className={styles.close} onClick={close}>x</Button>
                }
                {title && <h3 className={styles.title}>{title}</h3>}
                <div className={`${styles.main} ${mainClassName}`}>{children}</div>
                <div className={styles.actions}>
                    {
                        !preventManuallyClose && !disabledFooter
                        &&
                        <Button onClick={close}>Close</Button>
                    }
                    {actions}
                </div>
            </div>
        </div>
    );
};

const removeExtendModalById = (id: string | number): void => {
    try {
        const extendModal = document.getElementById(id as string);
        if (extendModal) {
            extendModal.remove();
        }
    } catch (e) {
        // Logger.log('ERROR', e);
    }
};

Modal.show = (props: IModalProps, containerId = ''): string | undefined => {
    try {
        const root = document.getElementById('root');
        if (root) {
            const id = containerId || Math.random().toString().substring(2);
            const container = document.createElement('div');
            container.id = id;
            container.classList.add('extend-modal');
            container.style.zIndex = '1000';
            container.style.position = 'fixed';
            container.style.top = '0';
            container.style.left = '0';

            const handleOnClose = (): void => {
                if (props.onClose) {
                    props.onClose();
                }
                container.remove();
            };
            root.appendChild(container);

            ReactDOM.render(
                <Modal
                    {...{ ...props, onClose: handleOnClose, id }}
                />,
                container,
            );
            return id;
        }
    } catch (e) {
        // Logger.log('ERROR', e);
    }
};

export default Modal;