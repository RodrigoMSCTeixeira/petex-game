import React from "react"
import Header from '../Header'
import Footer from '../Footer'

function Layout({ children }) {
  return (
    <>
      <Header />
      <main>
        <section>
          <div>{children}</div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default Layout