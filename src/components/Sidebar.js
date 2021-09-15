import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import '../style/slidebar.css'
import { Link } from 'gatsby';

export default function Sidebar( {data} ) {

    const chaps = data.allMarkdownRemark.nodes

    const isActive = ({ isCurrent }) => {
        return isCurrent ? { id: "active" } : {}
    }

    return (
        <div id="sidebar-wrapper">
        <ul class="sidebar-nav">
            <br/><br/><br/><br/>
            {chaps.map(chap => (
                <li><Link getProps={isActive} to={"/documents/" + chap.frontmatter.slug} key={chap.id}>{chap.frontmatter.title}</Link></li>
            ))} 
        </ul>
        </div>
    )
}
