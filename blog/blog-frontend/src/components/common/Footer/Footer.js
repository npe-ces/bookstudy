import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const Footer = () => {
  return (
    <footer className={cx('footer')}>
      <Link to="/" className={cx('brand')}>react</Link>
      <div className={cx('admin-login')}>
        관리자 로그인
      </div>
    </footer>
  )
}

export default Footer