import React from "react";
import "./spinner.css";

const Spinner = () => {
    return (
        <div id='preloader-overlay' className="valign-wrapper">
            <div className="preloader-wrapper big active loading">
                <div className="spinner-layer spinner-blue-only">
                    <div className="circle-clipper left">
                        <div className="circle"></div>
                    </div>
                    <div className="gap-patch">
                        <div className="circle"></div>
                    </div>
                    <div className="circle-clipper right">
                        <div className="circle"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Spinner;
