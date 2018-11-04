import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.scss';
import classNames from 'classnames/bind';
import Button from 'components/common/Button';

const cx = classNames.bind(styles);

const Header = () => {
  return (
    <header className={cx('header')}>
      <div className={cx('header-content')}>
        <div className={cx('brand')}>
          <Link to="/">Reactblog</Link>
        </div>
        <div className={cx('right')}>
          {/* 조건에 따라 버튼 랜더 */}
          <Button theme="outline" to="/editor">새 포스트</Button>
        </div>
      </div>

    </header>
  )
}

export default Header;