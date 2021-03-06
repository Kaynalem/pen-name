import React from 'react';
import {TOGGLE_NAV} from '../../utils/actions';
import Auth from '../../utils/auth';
import { useStoreContext } from '../../utils/GlobalState';
import {QUERY_ME_BASIC} from '../../utils/queries';
import { useQuery } from '@apollo/react-hooks';

import { Link } from 'react-router-dom';

const Header = () => {

  const { data:userData } = useQuery(QUERY_ME_BASIC);
  console.log(userData)

  const [state, dispatch] = useStoreContext();

  const logout = event => {
    event.preventDefault();
    Auth.logout();
  };

  
 function toggleNav() {
    dispatch({type: TOGGLE_NAV});
}
 
      
  
 if (!state.navActive){
    return(
      <>
      {Auth.loggedIn() ? (
      <nav className="navbar  is-fixed-top" role="navigation" aria-label="main navigation">
      <div className="navbar-brand" >
        <Link to="/" className="logo">
        <img className="graphic"src={require("../../resources/PenNameGraphicLight.svg")}></img>
          {/* <h1 className="main-title">Pen Name</h1>*/ }
          </Link>
        
          <a role="button" onClick={toggleNav} className="navbar-burger burger" id="" aria-label="menu" aria-expanded="false" data-target="navMenu">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
       </div>
       <div id="navMenu" className="navbar-menu"> 
        <div className="navbar-start">
          
            
            
            <Link className="navbar-item" to="/profile" >Profile</Link>
            <Link className="navbar-item" to="/write" >Write</Link>
            <Link className="navbar-item" to="/" onClick={logout}>
             Logout
            </Link>
            </div>
            <div className="navbar-end">
            {userData?(
              <span className="navbar-item">Logged in as {userData.me.username}</span>
            ):(<span></span>)}
            
            </div>
            </div>
          </nav> 
          ):( 
            <nav className="navbar  is-fixed-top" role="navigation" aria-label="main navigation">
            <div className="navbar-brand" >
              <Link to="/" className="logo">
              <img className="graphic"src={require("../../resources/PenNameGraphicLight.svg")} alt=""></img>
                {/* <h1 className="main-title">Pen Name</h1>*/ }
                </Link>
              
                <a role="button" onClick={toggleNav} className="navbar-burger burger" id="" aria-label="menu" aria-expanded="false" data-target="navMenu">
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
             </div>
             <div id="navMenu" className="navbar-menu"> 
              <div className="navbar-start">
            <Link  className="navbar-item" to="/login" >Login</Link>
            <Link  className="navbar-item" to="/signup" >Signup</Link>
         
        </div>
        <div className="navbar-end"></div>
        </div>
      </nav>
      )} 
      </>
      )
      
    } else {
      
    return (
      <nav className="navbar is-transparent is-fixed-top" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link to="/" className="">
        <img className="graphic"src={require("../../resources/PenNameGraphicLight.svg")}></img>
        </Link>
        
        <a role="button" onClick={toggleNav} className="navbar-burger burger is-active" id="" aria-label="menu" aria-expanded="false" data-target="navMenu">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
     </div>
    
  
       <div id="navMenu" className="navbar-menu is-active "> 
        <div className="navbar-start">
          
          {Auth.loggedIn()? (
            <>
            
            <Link className="navbar-item" to="/profile" onClick={toggleNav}>Profile</Link>
            <Link className="navbar-item" to="/write" onClick={toggleNav}>Write</Link>
            <Link className="navbar-item" to="/" onClick={logout}>
             Logout
            </Link>
            <div className="navbar-end">
            {userData?(
              <span className="navbar-item">Logged in as {userData.me.username}</span>
            ):(<span></span>)}
            </div>
            </>
            
          ):(  <>
            <Link  className="navbar-item" to="/login" onClick={toggleNav}>Login</Link>
            <Link  className="navbar-item" to="/signup" onClick={toggleNav}>Signup</Link>
          </>)}
        </div>
        <div className="navbar-end"></div>
        </div>
  
         
  
        </nav>
       ) 
        
        
    
   }
  };
  
  export default Header;




  /*
  import React,{useEffect} from 'react';
import {TOGGLE_NAV} from '../../utils/actions';
import Auth from '../../utils/auth';
import { useStoreContext } from '../../utils/GlobalState';
import {QUERY_ME_BASIC} from '../../utils/queries';
import { useQuery } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';
const Header = () => {
  const { data:userData } = useQuery(QUERY_ME_BASIC);
  console.log(userData)
  const [state, dispatch] = useStoreContext();
  const logout = event => {
    event.preventDefault();
    Auth.logout();
  };
  
  function toggleNav() {
    dispatch({type: TOGGLE_NAV});
}
 
      
  
  if (!state.navActive){
    return(
      <nav className="navbar is-transparent is-fixed-top" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link to="/" className="">
        <img className="graphic"src={require("../../resources/PenNameGraphic.svg")}></img>
          {// <h1 className="main-title">Pen Name</h1> //}
          </Link>
        
          <a role="button" onClick={toggleNav} className="navbar-burger" id="stick" aria-label="menu" aria-expanded="false" >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
       </div>
       
      </nav>
      )
    } else {
      
    return (
      <nav className="navbar is-transparent is-fixed-top" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link to="/" className="navbar-item">
        <img className="graphic"src={require("../../resources/PenNameGraphic.svg")}></img>
        </Link>
        
        <a role="button" onClick={toggleNav} className="navbar-burger is-active" id="stick" aria-label="menu" aria-expanded="false" >
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
     </div>
    
  
       <div className="navbar-menu is-active "> 
        <div className="navbar-start">
          {Auth.loggedIn() ? (
            <>
            <span>Logged in as {userData.me.username}</span>
            <Link className="navbar-item" to="/profile" onClick={toggleNav}>Profile</Link>
            <Link className="navbar-item" to="/write" onClick={toggleNav}>Write</Link>
            <Link className="navbar-item" to="/" onClick={logout}>
             Logout
            </Link>
            </>
          ):(  <>
            <Link  className="navbar-item" to="/login" onClick={toggleNav}>Login</Link>
            <Link  className="navbar-item" to="/signup" onClick={toggleNav}>Signup</Link>
          </>)}
        </div>
        <div className="navbar-end"></div>
        </div>
  
         
  
        </nav>
       ) 
        
        
    
   }
  };
  
  export default Header;*/