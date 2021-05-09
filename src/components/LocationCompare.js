import React from 'react'
import { useSelector } from 'react-redux';
import { getComparisonFeatures } from '../redux/getters';
import { ReactComponent as CloseIcon } from "../assets/close_icon.svg";
import { removeComparisonFeature } from '../redux/action-creators';

const root = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "100%"
}

const featureRoot = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
}

const closeIcon = {
    cursor: "pointer"
}

const buttonRoot = {
    "width": "161px",
    "height": "36px",
    "left": "79.5px",
    "top": "0px",
    "background": "#FFFFFF",
    "border": "2px solid #000000",
    "boxSizing": "border-box",
    "borderRadius": "100px",
    margin: "auto",
    marginTop: 15,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer"
  }

const buttonText = {
    "fontFamily": "Roboto",
    "fontSize": "14px",
    "fontStyle": "normal",
    "fontWeight": "500",
    "lineHeight": "16px",
    "letterSpacing": "0em",
    "textAlign": "center"
  }

const disclaimerText = {
    "fontFamily": "Roboto",
    "fontSize": "14px",
    "fontStyle": "normal",
    "fontWeight": "400",
    "lineHeight": "16px",
    "letterSpacing": "0em",
    "textAlign": "center",
    color: "#666666",
    marginTop: 10
  }

const LocationCompare = () => {
    const comparisonFeatures = useSelector(getComparisonFeatures);
    return <div style={root}>
        {comparisonFeatures.map(feature => {
            console.log(feature)
            return <div style={featureRoot} key={feature.primary}>
                <div>
                    <p>{feature.primary || feature.properties["SA2_NAME16"]}</p>
                </div>
                <CloseIcon style={closeIcon} onClick={()=>{
                   removeComparisonFeature(feature)
                }}/>
            </div>
        })}
        <div style={buttonRoot}>
            <p style={buttonText}>Show Comparison</p>
        </div>
        <div>
            <p style={disclaimerText}>Add up to 4 regions.</p>
        </div>
    </div>
}

export default LocationCompare;