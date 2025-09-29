import React, { useState } from 'react';
import "./mainpage.css";
import Ipad from './Ipad';
import EditBar from './EditBar';
import TopBar from './TopBar';
import MenuThing from './MenuThing';
function MainPage() {

  return(
  <>
  <div className="page"> 
    <Ipad />
    <EditBar></EditBar>
    <TopBar></TopBar>
    <MenuThing></MenuThing>
  </div>
  </>
  )
}

export default MainPage;