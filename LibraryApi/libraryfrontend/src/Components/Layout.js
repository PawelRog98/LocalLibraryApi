import React, { Component } from 'react';
import { Container } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css"
import NavMenu from './NavMenu';

const Layout =({children}) =>{
        return(
            <div>
                <NavMenu/>
                <Container>
                    {children}
                </Container>
            </div>
        )
}
export default Layout;