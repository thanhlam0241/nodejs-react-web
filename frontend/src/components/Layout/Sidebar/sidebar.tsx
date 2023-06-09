import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import styles from './sidebar.module.scss'
import classNames from 'classnames/bind'
import { useNavigate } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu'
import IconButton from '@mui/material/IconButton'

import List from '@mui/material/List'

import MyListItem from '~/components/components/ListItem'

import listSideBar from './listSidebar'
import { useAppSelector, useAppDispatch } from '~/hooks/storeHook'
const cx = classNames.bind(styles)

interface SidebarProps {
  open: boolean
  location: any
  setOpen?: any
}

function Sidebar({ open, location, setOpen }: SidebarProps) {
  const auth: any = useAppSelector((state) => state.auth)
  const navigate = useNavigate()

  console.log(location.pathname.startsWith('/friends'))

  const [selectedIndex, setSelectedIndex] = useState<number>(() => {
    const index = listSideBar.findIndex((item) => {
      if (item.root.length > 1) {
        return location.pathname.toString().startsWith(item.root)
      }
    })
    console.log(index)
    return index === -1 ? 0 : index
  })

  const changeStateSidebar = () => {
    setOpen(!open)
  }

  const handleListItemClick = (index: number, link: string) => {
    setSelectedIndex(index)
    navigate(link === '/profile' ? `/profile?id=${auth.id}` : link)
  }

  useEffect(() => {
    if (location.pathname === '/profile' || location.pathname.startsWith('/friends')) {
      setOpen(false)
    }
  }, [location.pathname])

  return (
    <div className={open ? cx('fake-side-bar') : cx('fake-sidebar_hide')}>
      <div className={open ? cx('sidebar') : cx('sidebar_hide')}>
        <div className={cx('button-open-close')}>
          <IconButton
            disabled={location.pathname === '/profile' || location.pathname.startsWith('/friends')}
            onClick={changeStateSidebar}
          >
            <MenuIcon />
          </IconButton>
        </div>
        <List
          sx={{
            marginTop: 10,
            borderTop: '1px solid #fff',
            '@media (max-width: 680px)': {
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              marginTop: 0
            }
          }}
        >
          {listSideBar.map((item) => (
            <MyListItem
              key={'sidebar' + item.index}
              icon={item.icon}
              text={item.name}
              handleClick={() => handleListItemClick(item.index, item.link)}
              selected={selectedIndex === item.index}
            />
          ))}
        </List>
      </div>
    </div>
  )
}

export default Sidebar
