import * as React from "react"
import { Link } from "gatsby"
import Layout from "../components/Layout"
import 'bootstrap/dist/css/bootstrap.css';

// markup
export default function Home( ) {
  
  
  return (
    <Layout>
        <div className="container" id="page-content-wrapper">
          
          <h1>خوش آمدید</h1>
          <p>ترجمه آزاد کتاب Django for Professionals</p>
          <p>شما می توانید از<Link to={"/book"} className="nav-link">اینجا</Link>شروع به خواندن کتاب کنید</p>
         </div>
        

    </Layout>
  )
}