/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import styles from './PostInfo.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const PostInfo = () => {
    return (
        <div className={cx('post-info')}>
            <div className={cx('info')}>
                <h1>타이틀</h1>
                <div className={cx('tags')}>
                    <a>#태그</a>
                    <a>#태그</a>
                    <a>#태그</a>
                </div>
                <div className={cx('date')}>
                0ct 29,2018
                </div>
            </div>
        </div>
    )
}

export default PostInfo
