import React, { useEffect, useState } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler,Nav, NavItem, NavLink, Badge } from 'reactstrap';
import { Link } from 'react-router-dom';
import AuthorizeService from './Authorization/AuthorizeService';  
import './NavMenu.css';
import useLibraryContext from '../UseLibraryContext';

const NavMenu = () =>{
    const [isOpen, setOpen] = useState(true);
    const [isAuthorized, setAuthorized] = useState(false);
    const [role, setRole] = useState("");
    //const [cartItems, setCartItems] = useState("");
    const {cartItems} = useLibraryContext();

    useEffect(()=>{
        var user=AuthorizeService.GetAccessToken();
        // if(!sessionStorage.getItem("cart")){
        //     setCartItems(0);
        // }
        // else{
        //     setCartItems((JSON.parse(sessionStorage.getItem("cart"))).length);
        // }
        if(user){
            setAuthorized(true);
            setRole(user.roleName);
        }
        else{
            setAuthorized(false);
        }
    },[]);

    const toggle = () => {
        setOpen(!isOpen);
    };

    const logout = () => {
        AuthorizeService.Logout();
        window.location.reload();
    };

        return(
            <div>
                <Navbar sticky="top" className='navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow'>
                    <NavbarBrand tag={Link} to='/'>Library</NavbarBrand>
                    <NavbarToggler onClick={toggle}></NavbarToggler>
                    <Collapse isOpen={isOpen} navbar></Collapse>
                    <Nav className='ml-auto'navbar>
                        <NavItem>
                            <NavLink tag={Link} className={'text-dark'} to={'/'}>Home</NavLink>
                        </NavItem>
                        {!isAuthorized ?
                        <React.Fragment>
                        <NavItem>
                            <NavLink tag={Link} className={'text-dark'} to={'/Authorization/Login'}>Login</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} className={'text-dark'} to={'/Authorization/Register'}>Register</NavLink>
                        </NavItem>
                        </React.Fragment>
                        :
                        <React.Fragment>
                        <NavItem>
                            <NavLink tag={Link} className={'text-dark'} to={'/Authorization/Login'} onClick={()=>logout()}>Logout</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} className={'text-dark'} to={'/Authorization/EditAccount'}>Profile</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} className={'text-dark'} to={'/Transactions/MyTransactions'}>My transactions</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} className={'text-dark'} to={'/Cart/Cart'}>Cart <Badge pill color='primary'>{cartItems}</Badge></NavLink>
                        </NavItem>
                        </React.Fragment>}
                        {role==="Administrator" &&
                        <NavItem>
                            <NavLink tag={Link} className={'text-dark'} to={'/Administrator/AdminDashboard'}>Admin</NavLink>
                        </NavItem> }
                        {(role==="Administrator" || role==="Employee") &&
                        <React.Fragment>
                            <NavItem>
                                <NavLink tag={Link} className={'text-dark'} to={'/Category/Categories'}>Categories</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} className={'text-dark'} to={'/Transactions/AllTransactions'}>All transactions</NavLink>
                            </NavItem>
                        </React.Fragment>}
                    </Nav>
                </Navbar>
            </div>
        );
}
export default NavMenu;