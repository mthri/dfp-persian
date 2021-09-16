import * as React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import 'bootstrap/dist/css/bootstrap.css';

// markup
export default function Home( {data} ) {
  
  const {html} = data.homePage.nodes[0]

  
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
query homeQuery {
  
  homePage: allMarkdownRemark(filter: {frontmatter: {slug: {eq: "homePage"}}}) {
    nodes {
      html
    }
  }
}

`