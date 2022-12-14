import { Tooltip } from '@material-ui/core'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import React from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { useCookies } from 'react-cookie';
import { logout } from "../../api/auth"
import united_states from '../../assets/countries/5_united_states_flag_icon.svg'
import {
  HeaderLogo,
  MenuTopWrapper,
  MenuWpapper,
  MobileTabsWrapper,
  NavList,
  ProLogIn
} from '../../styled'
import { device } from '../../utils/screen'
import { ModeSwitch } from '../ModeSwitch/ModeSwitch'
import Tabs from './Tabs'

interface HeaderProps {
  darkMode: boolean
  handleModeSwitch: () => void
}

export default function Header({ darkMode, handleModeSwitch }: HeaderProps) {
  const location = useLocation()
  const isLaptop = useMediaQuery(device.laptop)
  const isMobile = useMediaQuery(device.mobileL)
  const [cookies, setCookie] = useCookies(['Authorization']);
  const history = useHistory()
  const routeLogin = () => {
    console.log(cookies)
    history.push('/login')
  }
  const routeSignup = () => {
    history.push('/signup')
  }
  const routeLogout = () => {
    logout()
      .then((res) => {
        history.push('/login')
      })
      .catch((res) => {
        console.log('error logout', res)
      });
    history.push('/signup')
  }
  return (
    <MenuWpapper>
      <MenuTopWrapper
        container
        justifyContent="space-between"
        alignItems="center"
      >
        <NavList className="NavList">
          <Link to="/farms">
            <HeaderLogo />
          </Link>

          {!isLaptop && <Tabs />}
        </NavList>

        <div className="right-section">
          {!isMobile && (
            <>
              <Tooltip title="Coming soon">
                <span>
                  <ModeSwitch state={darkMode} onClick={handleModeSwitch} />
                </span>
              </Tooltip>

              <Tooltip title="Coming soon">
                <img src={united_states} alt="" className="country" />
              </Tooltip>
            </>
          )}

          {location.pathname == '/login' && (
            <>
              <Tooltip title="Signup">
                <span>
                  <ProLogIn onClick={routeSignup}>Start 7-day trial</ProLogIn>
                </span>
              </Tooltip>
            </>
          )}
          {location.pathname != '/login' && !cookies.Authorization && (
            <>
              <Tooltip title="Pro Log In">
                <span>
                  <ProLogIn onClick={routeLogin}>Pro Log In</ProLogIn>
                </span>
              </Tooltip>
            </>
          )}
          {location.pathname != '/login' && cookies.Authorization && (
            <>
              <Tooltip title="Pro Log Out">
                <span>
                  <ProLogIn onClick={routeLogout}>Logout</ProLogIn>
                </span>
              </Tooltip>
            </>
          )}
        </div>
      </MenuTopWrapper>

      {isLaptop && (
        <MobileTabsWrapper container justifyContent="center">
          <Tabs />
        </MobileTabsWrapper>
      )}
    </MenuWpapper>
  )
}
