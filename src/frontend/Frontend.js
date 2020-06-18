import React, {Component, Fragment} from 'react';
import Header from "./components/sections/header/Header";
import scriptLinks from "./scriptLinks";
import "./assets/css/frontend/frontend.css";
import Footer from "./components/sections/footer/Footer";
import Views from "./views/Views";

class Frontend extends Component {
    componentDidMount() {

       
       this.loadScript()

        /*const style = document.createElement("style");
        style.sheet = frontendCSS;
        style.async = true;
        document.head.appendChild(style)*/
    }

    loadScript(){
        scriptLinks.map(item => {
            const script = document.createElement("script");
            script.src = item.src;
            script.async = true;
            document.body.appendChild(script)
            
        });
    }

    render() {
        return (
            <Fragment>
                <Header navBarType={"light"}/>
                <Views/>
                <Footer/>
            </Fragment>
        );
    }
}

export default Frontend;
