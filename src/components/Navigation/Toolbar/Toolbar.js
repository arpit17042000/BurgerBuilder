import React from 'react'
import classes from './Toolbar.module.css'
import NavigationItems from '../NavigationItems/NavigationItems'
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle'


const Toolbar = (props) => {
    return (
        <header className={classes.Toolbar  }>
            <DrawerToggle clicked={props.drawerToggleClicked}/>
            <div>LOGO</div>
            <nav className={classes.DesktopOnly}>
                <NavigationItems/>
            </nav>
        </header>
    )
}

export default Toolbar
