import React, {useEffect, useState} from "react";

export const SpinnerLoading = () => {
    return(<>
        <div id="chat-conversation" className="chat-conversation p-3 p-lg-4" data-simplebar="init">
            <div id="loading" className="d-block">
                <center>
                    <div className="justify-content-center">
                        <div className="loadingio-eclipse">
                            <div className="ldio-rpinwye8j0b">
                                <div></div>
                            </div>
                        </div>           
                    </div>
                </center>
            </div>
        </div> 
    </>)
}

export const SpinnerLoadingMin = (props) => {
    const [color, setColor] = useState(props.color);
    return (
      <div className="spinner-container">
        <div className="loading-spinner">
        </div>
      </div>
    );
}

export const SpinnerLoadingMin25 = (props) => {
    const [color, setColor] = useState(props.color);
    return (
      <div className="spinner-container">
        <div className="loading-spinner-25">
        </div>
      </div>
    );
}

export const SpinnerLoadingMinColor = (props) => {
    const [color, setColor] = useState('spinner-container');
    return (
      <div className="spinner-container">
        <center>
        <div className={props.color != '' ? props.color : color}>
        </div>
        </center>
      </div>
    );
}