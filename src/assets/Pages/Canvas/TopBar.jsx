import React from 'react'
import './TopBar.css'
function TopBar() {
  return(
    <>
    <div className="TopBar">
      <button className="choice choice1">
        <span class="material-symbols-outlined">
arrow_selector_tool
</span>
      </button>
      <br />
      <button className="choice choice2">
        <span class="material-symbols-outlined">
      edit
      </span>
      </button>
      <br />
      <button className="choice choice3">
        <span class="material-symbols-outlined">
delete_forever
</span> 
      </button>
      <br />
      <button className="choice choice4"><span class="material-symbols-outlined">
undo
</span></button>
      <br />
      <button className="choice choice5"><span class="material-symbols-outlined">
power_settings_new
</span></button>
      <br />
    </div>
    </>
  )
}

export default TopBar
