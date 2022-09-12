import React from "react";
import { FaRegMoon, FaRegLightbulb } from "react-icons/fa";

function DarkMode({ mode, handleMode }) {
    return (
        <div>
            <span onClick={handleMode} type="button" className={``}>{mode === 'dark' ? <FaRegLightbulb /> : <FaRegMoon />}</span>
        </div>
    )
}

export default DarkMode;