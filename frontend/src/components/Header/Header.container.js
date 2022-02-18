import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router'

import Header from './Header'
import { SHOW_SCROLLED_HEADER_HEIGHT } from '../../utils/constants'

function HeaderContainer({ toggleSidebar, config }) {
  // hooks
  const navigate = useNavigate()

  // state
  const [pageScrolled, setPageScrolled] = useState(false)

  // vars
  const { backRoute, content, contentScrolled, leftContainerProps } = useMemo(() => config || {}, [config])

  // methods
  const onScroll = useCallback(e => {
    setPageScrolled(window.scrollY > SHOW_SCROLLED_HEADER_HEIGHT)
  }, [])

  // effects
  useEffect(() => {
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [onScroll])

  return (
    <Header
      toggleSidebar={toggleSidebar}
      scrolled={pageScrolled}
      navigate={navigate}
      backRoute={backRoute}
      content={content}
      contentScrolled={contentScrolled}
      leftContainerProps={leftContainerProps}
    />
  )
}

export default HeaderContainer