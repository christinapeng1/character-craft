import React from 'react';
import { Button } from 'antd';
import {HiOutlineSun, HiOutlineMoon} from 'react-icons/hi';
import "./ToggleThemeButton.css"

const ToggleThemeButton = ({darkTheme, togglTheme}) => {
  return (
    <div className="toggle-theme-button pointer-events-auto">
        <Button onClick={togglTheme}>
            {darkTheme ? <HiOutlineSun /> : <HiOutlineMoon />}
        </Button>
    </div>
  )
}

export default ToggleThemeButton