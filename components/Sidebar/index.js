import React from 'react'
import {SidebarWrapper, SettingsWrapper, SidebarButton} from './styles'
import {useTheme} from '../Shared/ThemeContext'
import {useStore} from '../Shared/StoreContext'
import {Moon} from '../Icons'
import Button from '../Button'

class Debouncer {

  constructor(func, n){
    this.timeout = null;
    this.n = n || 320;
    this.func = func;
  }

  execute = () => {
    this.cancel();
    this.timeout = setTimeout(() => { this.func() }, this.n)
  }

  cancel = () => {
    if(this.timeout)
      clearTimeout(this.timeout);
  }

}

const Sidebar = (props) => {

  const storeState = useStore()
  const themeState = useTheme()
  
  const openSidebar = (bool) => {
    return storeState.dispatch({
      type: "SIDEBAR_OPEN",
      payload: bool
    })
  }


  const setSidebar = () => {
    const isMobile = (typeof window !== 'undefined') && (window.innerWidth < 600)

    isMobile && storeState.state.sidebarOpen && openSidebar(false);
    !isMobile && storeState.state.sidebarOpen && openSidebar(true);
  }
  
  const debouncer = React.useRef(new Debouncer(() => setSidebar()))
  const setSidebarDebounced = () => debouncer.current.execute() 

  React.useEffect(() => {

    const isMobile = (typeof window !== 'undefined') && (window.innerWidth < 750)
    isMobile && openSidebar(false);
    
    window.addEventListener("resize", setSidebarDebounced);
    return () => window.removeEventListener("resize", setSidebarDebounced);

  }, [])


  return (
    <SidebarWrapper sidebarOpen={storeState.state.sidebarOpen}>
      
        <ul>
          {props.render}
        </ul>
        <SettingsWrapper>
          <Button onClick={() => themeState.toggle()}><Moon /></Button>
        </SettingsWrapper>
        
    </SidebarWrapper>
  )
}


export default Sidebar