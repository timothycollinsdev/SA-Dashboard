import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useHistory, useLocation } from "react-router";

import { addComparisonFeature } from "../redux/action-creators";
import Map from "../components/map";
import Sidebar from "../components/Sidebar";
import Legend from '../components/legend';
import Footer from '../components/footer';
import Routes from "../routes/index";
import TableView from "../components/TableView";
import HamburgerMenu from "../components/HamburgerMenu";

import "../css/main.css";

const Main = (props) => {
    const {comparisonFeatures, features} = props;
    const mapStyler = {
      zindex: 0,
      width: "100%",
    };
    const screenFlexStyle = {
      display: "flex",
      flexDirection: "row",
      width: "100%",
      height: "100%",
      overflow: "hidden",
    };

    const [comparisonMode, setComparisonMode] = useState(false);
    const location = useLocation();
    const history = useHistory();

    useEffect(() => {
      setComparisonMode(location.pathname.startsWith('/comparison'));
    }, [location]);

    // Efect to load features from url ids
    useEffect(() => {
      if (!comparisonFeatures.length && location.pathname.startsWith('/comparison/')) {
        const pathIds = location.pathname.replace('/comparison/', '');
        if (pathIds) {
          const ids = pathIds.split('+');
          const featuresFromUrl = features.filter(ft => ids.includes(ft.properties["SA2_MAIN16"].toString()));
          featuresFromUrl.forEach(feature => {
            addComparisonFeature(feature);
          })
        }
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [features, location]);

    // Effect to update url when removing comparionFeatures
    useEffect(() => {
      if (location.pathname.startsWith('/comparison/') && features.length) {
        if (!comparisonFeatures.length) {
          history.push('/');
        }
        else {
          const ids = comparisonFeatures.map(feature => feature.properties.SA2_MAIN16);
          const newPath = '/comparison/' + ids.join('+');
          if (location.pathname !== newPath) {
            history.replace(newPath);
          }
        }
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [comparisonFeatures]);

    return (

      <div className="main" style={mapStyler}>
        <div style={screenFlexStyle}>
          <Sidebar />
          {!comparisonMode && <Map />}
          {comparisonMode && <TableView />}
          <HamburgerMenu />
        </div>
        {props.selectedFeature && !comparisonMode && <Legend absolute />}
        <Footer inDarkMode={!comparisonMode}/>
        <Routes />
      </div>
    );
  }

Main.propTypes = {
  comparisonFeatures: PropTypes.arrayOf(PropTypes.object),
  features: PropTypes.arrayOf(PropTypes.object),
  selectedFeature: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    comparisonFeatures: state.comparisonFeatures,
    features: state.features,
    selectedFeature: state.selectedFeature,
  };
}

export default connect(mapStateToProps)(Main);
