import React from 'react'
import Layout from '../components/Layout'
import 'bootstrap/dist/css/bootstrap.css';
import '../style/slidebar.css'
import { graphql } from 'gatsby';
import Sidebar from '../components/Sidebar';

const Book=( {data} ) => {

    return (
        <Layout>

        {/* sidebar */}
        <Sidebar data={data} />
        
        {/* content */}
        <div id="page-content-wrapper">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-lg-12">
                        <h1>کتاب</h1>
                        <p>شروع کتاب</p>
                    </div>
                </div>
            </div>
        </div>

        </Layout>
    )
}

export default Book

export const query = graphql`
query SidebarQuery {
    allMarkdownRemark {
      nodes {
        id
        frontmatter {
          title
          slug
        }
      }
    }
  }
  
`



  
