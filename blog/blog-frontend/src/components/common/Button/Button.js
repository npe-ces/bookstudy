import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Button.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

//전달받은 className, onClick등 값이 rest안에 들어있음
//JSX에서 ...을 사용하면 내부에 있는 값들을 props로 넣어준다.

const Div = ({ children, ...rest }) => <div {...rest}>{children}</div>

const Button = ({
    children, to, onClick, disabled, theme = 'default',
}) => {
    //to값이 존재하면 link를 사용하고, 그렇지 않으면 div를 사용한다.
    //비활성화되어있는 버튼일때도 div를 사용함

    const Element = (to && !disabled) ? Link : Div;

    //비활성화 하면 onClick은 실행안됨
    // disabled값이 true면 className에 disabled추가하기
    return (
        <Element
            to={to}
            className={cx('button', theme, { disabled })}
            onClick={disabled ? () => null : onClick}>
            {children}
        </Element>
    )
}

export default Button
