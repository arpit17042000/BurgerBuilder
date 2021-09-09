import React from 'react';

import NavigationItems from '../NavigationItems/NavigationItems'
import classes from './SideDrawer.module.css'
import Backdrop from '../../UI/Backdrop/Backdrop'
import Aux from '../../../hoc/Auxilliary/Auxiliary'

const SideDrawer = (props) => {
    let attachedClasses=[classes.SideDrawer,classes.Close];
    if(props.open){
        attachedClasses=[classes.SiderDrawer,classes.Open];
    }
    return (
        <Aux>
        <Backdrop show={props.open} clicked={props.closed}/>
        <div className={attachedClasses.join(' ')}>
            <nav>
                <NavigationItems/>
            </nav>
        </div>
        </Aux>
    )
}

export default SideDrawer
