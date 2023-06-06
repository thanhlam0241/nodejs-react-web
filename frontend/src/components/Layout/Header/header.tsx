import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router'

import ButtonPopper from '~/components/components/ButtonPopper/ButtonPopper'

import className from 'classnames/bind'
import styles from './header.module.scss'
import Avatar from '@mui/material/Avatar'

import Person2Icon from '@mui/icons-material/Person2'
import SearchIcon from '@mui/icons-material/Search'
import ClearIcon from '@mui/icons-material/Clear'
import reactIcon from '~/assets/icons/react2.png'
import LogoutIcon from '@mui/icons-material/Logout'

import { useAppSelector, useAppDispatch } from '~/hooks/storeHook'
import { useGetAvatarQuery, usePrefetch } from '~/service/redux/api/api'
import { setAuth } from '~/service/redux/slice/authSlice'
import authenticateApi from '~/service/api/authenticate/authenticateApi'
import Cookies from 'js-cookie'

import defaultAvatar from '~/assets/images/default_avatar.png'

const cx = className.bind(styles)

function Header() {
  const dispatch = useAppDispatch()
  const auth: any = useAppSelector((state) => state.auth)
  const searchBar = useRef(null)
  const [openPopper, setOpenPopper] = useState(false)
  const popperRef = useRef<HTMLDivElement>(null)
  const avatarRef = useRef<HTMLButtonElement>(null)

  const { data, isLoading, error } = useGetAvatarQuery(auth.id)
  const navigate = useNavigate()

  const prefetchAvatar = usePrefetch('getAvatar')

  const handleClickAvatar = () => {
    setOpenPopper(!openPopper)
  }

  const [search, setSearch] = useState('')
  const handleSearch = (e: any) => {
    setSearch(e.target.value)
  }
  const clearSearch = () => {
    setSearch('')
  }
  const handleLogout = async () => {
    if (auth?.token) {
      const rtk = Cookies.get('rtk')
      const response = await authenticateApi.Logout(auth.token, rtk)
      if (response?.success) {
        Cookies.remove('atk')
        Cookies.remove('rtk')
        dispatch(setAuth({ id: '', token: '', username: '', role: '' }))
        navigate('/authenticate/login')
      } else {
        alert('Logout failed')
      }
    }
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!popperRef.current?.contains(event.target as Node) && !avatarRef.current?.contains(event.target as Node)) {
        setOpenPopper(false)
      }
    }

    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    if (auth.id) {
      prefetchAvatar(auth.id)
    }
  }, [auth.id])
  return (
    <div className={cx('header-main')}>
      <div>
        <img style={{ width: 40 }} src={reactIcon} alt='hello' />
      </div>
      <div className={cx('search')}>
        <input ref={searchBar} value={search} onChange={handleSearch} placeholder='Tìm kiếm' spellCheck={false} />
        <div className={cx('clear')}>
          {search.length > 0 && (
            <button style={{ backgroundColor: 'transparent' }} onClick={clearSearch}>
              <ClearIcon />
            </button>
          )}
        </div>
        <button className={cx('search-btn')}>
          <SearchIcon />
        </button>
      </div>
      <button ref={avatarRef} onClick={handleClickAvatar} className={cx('div_avatar')}>
        <Avatar
          sx={{
            '&:hover': {
              cursor: 'pointer'
            }
          }}
          src={auth.id && data?.url ? data.url : defaultAvatar}
          alt='Error'
        />
        {auth.token && openPopper && (
          <div ref={popperRef} className={cx('popper-avatar')}>
            <ButtonPopper onClick={() => navigate('/profile')} text='Profile' icon={<Person2Icon />} />
            <ButtonPopper onClick={handleLogout} text='Logout' icon={<LogoutIcon />} />
          </div>
        )}
      </button>
    </div>
  )
}

export default Header
