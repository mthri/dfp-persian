import React from 'react'
import Layout from '../components/Layout'
import { graphql } from 'gatsby'

export default function about({data}) {

    const {html} = data.aboutPage.nodes[0]

    return (
        <Layout>
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

export const query = graphql`
query aboutQuery {
  
  aboutPage: allMarkdownRemark(filter: {frontmatter: {slug: {eq: "aboutPage"}}}) {
    nodes {
      html
    }
  }
}
`