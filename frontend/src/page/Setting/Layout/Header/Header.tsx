import styles from './HeaderSetting.module.scss'
import classNames from 'classnames/bind'

import PersonAddIcon from '@mui/icons-material/PersonAdd'
import PeopleIcon from '@mui/icons-material/People'
import { useState } from 'react'

import { NavLink, useLocation } from 'react-router-dom'

const cx = classNames.bind(styles)

function Header() {
  const location = useLocation()
  const [value, setValue] = useState(() => {
    if (location.pathname === '/friends/recommend') return 0
    if (location.pathname === '/friends/request-receive') return 1
    if (location.pathname === '/friends/request-send') return 2
    if (location.pathname === '/friends/all') return 3
    return 0
  })
  const handleChange = (v: number) => {
    setValue(v)
  }
  return (
    <header className={cx('header-setting-page')}>
      <h1 className={cx('header-page-title')}>Friend</h1>
      <div className={cx('header-list')}>
        <NavLink
          onClick={() => handleChange(0)}
          to='/setting?tab=account'
          className={
            value === 0
              ? cx('header-list-item', 'header-list-item-active')
              : cx('header-list-item', 'header-list-item-no-active')
          }
        >
          <PersonAddIcon />
          <span className={cx('setting-header-nav')}>Recommend</span>
        </NavLink>
      </div>
    </header>
  )
}

export default Header
