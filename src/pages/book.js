import React from 'react'
import Layout from '../components/Layout'
import 'bootstrap/dist/css/bootstrap.css';
import '../style/slidebar.css'
import { graphql } from 'gatsby';
import Sidebar from '../components/Sidebar';

const Book=( {data} ) => {

    const {html} = data.bookCover.nodes[0]

    return (
        <Layout>

        {/* sidebar */}
        <Sidebar data={data} />
        
        {/* content */}
        <div id="page-content-wrapper">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-lg-12">
                      <div dangerouslySetInnerHTML={{ __html: html}} />
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
  allMarkdownRemark(filter: {}, sort: {fields: frontmatter___order, order: ASC}) {
    nodes {
      id
      frontmatter {
        title
        slug
        order
      }
    }
  }

  bookCover: allMarkdownRemark(filter: {frontmatter: {slug: {eq: "bookCover"}}}) {
    nodes {
      html
    }
  }
}

`



  
