import { graphql } from 'gatsby'
import React from 'react'
import Layout from '../components/Layout'
import Sidebar from '../components/Sidebar'

export default function chapterDetails({ data }) {

    const { html } = data.markdownRemark
    const { title } = data.markdownRemark.frontmatter

    return (
        <Layout>

        {/* sidebar */}
        <Sidebar data={data} />
        
        {/* content */}
        <div id="page-content-wrapper">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-lg-12">
                    {/* <h3>{title}</h3> */}
                    <br/>
                    <div dangerouslySetInnerHTML={{ __html: html}} />
                    </div>
                </div>
            </div>
        </div>


        </Layout>            
    )
}

export const query = graphql`
    query ChapterDetails($slug: String) {
        markdownRemark(frontmatter: {slug: {eq: $slug}}) {
            html
            frontmatter {
                title
            }
        }

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
    }
`