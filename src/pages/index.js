import * as React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import 'bootstrap/dist/css/bootstrap.css';

// markup
export default function Home( {data} ) {
  
  const {html} = data.homePage.nodes[0]

  
  return (
    <Layout>
        <div className="container" id="page-content-wrapper">
          <div dangerouslySetInnerHTML={{ __html: html}} />
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