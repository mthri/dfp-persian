import * as React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import '../style/slidebar.css'
import { Link } from "gatsby"

export default function Layout( {children} ) {

    const isActive = ({ isCurrent }) => {
        return isCurrent ? { id: "active" } : {}
    }

    const sidebarClick = ( ) => {

        const classlist = document.getElementById("wrapper").classList

        if (!classlist.contains("toggled")) {
            classlist.add("toggled")
        } else {
            classlist.remove("toggled")
        }
        return {  }
    }

    return (

        <div>
            {/* navbar */}
            <nav class="nav navbar-dark fixed-top" id="nav">
                <Link getProps={isActive} to={"/"} className="nav-link">خانه</Link>
                <Link getProps={isActive} to={"/book"} className="nav-link">کتاب</Link>
                <Link getProps={isActive} to={"/about"} className="nav-link">درباره</Link>
                <a onClick={e => sidebarClick()} className="btn btn-default nav-link menu-toggle" id="menu-toggle"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-list-ul" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                </svg>
                </a>
            </nav>

        <div id="wrapper">
            {/* context */}
            {children}
        </div>

        </div>
    )

}



