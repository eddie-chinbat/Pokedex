import React from 'react'
import './Header.css'

function Header() {
    function switchTheme(e) {
        // let lightThemeText = document.getElementById("light-theme-text");
        // let darkThemeText = document.getElementById("dark-theme-text");
        // lightThemeText.classList.toggle("disabled");
        // darkThemeText.classList.toggle("disabled");
        if (e.target.checked)
            document.documentElement.setAttribute("data-theme", "dark");
        else
            document.documentElement.setAttribute("data-theme", "light");
    }

    return (
        <div className="header">
            <div className="header_left">
                {/* left */}
            </div>
            <div className="header_center">
                <h2>React Pokédex Challenge</h2>
            </div>
            <div className="header_right">
                <div className="main-wrapper">
                    <div className="text" id="light-theme-text">Day</div>
                    <div className="theme-switch-wrapper">
                        <label htmlFor="theme-btn">
                        <input type="checkbox" id="theme-btn" onClick={ switchTheme }/>
                        <div className="slider-wrapper">
                            <div className="theme-btn-slider"></div>
                            <span className="star star-1"></span>
                            <span className="star star-2"></span>
                            <span className="star star-3"></span>
                            <span className="star star-4"></span>
                            <span className="star star-5"></span>
                            <span className="star star-6"></span>
                        </div>
                        </label>
                    </div>
                    <div className="text disabled" id="dark-theme-text">Night</div>
                </div>
            </div>
        </div>
    )
}

export default Header
