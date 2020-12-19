import React from 'react';
import "./style.css"
const Navbar = (props)=>{
    return <div class="nav">
    <input type="checkbox" id="nav-check"/>
    <div class="nav-header">
      <div class="nav-title">
        PizzaShop
      </div>
    </div>
    <div class="nav-btn">
      <label for="nav-check">
        <span></span>
        <span></span>
        <span></span>
      </label>
    </div>
    
  </div>
}
export default Navbar;