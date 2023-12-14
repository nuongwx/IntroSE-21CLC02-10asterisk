import Menu from "../../components/Menu";
import Navbar from "../../components/Navbar";

const Layout = ({ children }) => {
    return (
        <div className="layout-wrapper layout-content-navbar">
            <div className="layout-container">
                <Menu />
                <div className="layout-page">
                    {/* <Navbar /> */}
                    <div className="content-wrapper">
                        {children}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Layout;