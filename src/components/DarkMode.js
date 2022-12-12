import React, { useContext } from "react";
import { FaRegMoon, FaRegLightbulb } from "react-icons/fa";
import { ThemeContext } from "../context/ThemeContext";


function DarkMode({  }) {
    const {mode, handleMode} = useContext(ThemeContext)

    return (
        <div>
            <span onClick={handleMode} type="button" className={``}>{ mode === 'dark' ? <FaRegLightbulb /> : <FaRegMoon />}</span>
        </div>
    )
}

export default DarkMode;