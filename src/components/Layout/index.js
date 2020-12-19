import React from 'react';
import Footer from '../Footer';
import Navbar from '../Navbar';
const Layout = (props) => {
    return <div>
        <Navbar />
        <main>
            {props.children}
        </main>
        <Footer />
    </div>
}
export default Layout;