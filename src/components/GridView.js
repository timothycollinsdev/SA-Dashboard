import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Collapsible from "react-collapsible";
import { useSelector } from "react-redux";

import { getANZSICCodes } from "../redux/getters";
import { formatLabel } from "../utils/formatValue";
import propsMapping from "../config/propsMapping";
import MetricDetails from "./MetricDetails";
import generateMetrics from "../utils/generateMetrics";
import "../css/GridView.css"

const GridView = ({comparisonFeatures}) => {
  const anzsicCodes = useSelector(getANZSICCodes);

  const renderGrid = (section) => {
    return (
      <div className="grid-container">
        {generateMetrics(section.content, comparisonFeatures).map((metric) => (
          <div key={metric.id} className="grid-item metric">
            <div className="grid-item-head">
              <h2>{formatLabel(metric, anzsicCodes)}</h2>
            </div>
            <div className="grid-item-body">
              <MetricDetails featureList={comparisonFeatures} metric={metric} small />
            </div>
          </div>
        ))}
      </div>
    )
  }
  
  return (
    <div className="grid-view">
      {propsMapping.map((section) => (
        <Collapsible trigger={section.title} key={section.title} open={true}>
          {renderGrid(section)}
        </Collapsible>
      ))}
    </div>
  )
}

GridView.propTypes = {
  comparisonFeatures: PropTypes.array,
};

function mapStateToProps(state) {
  return {
    comparisonFeatures: state.comparisonFeatures,
  };
}

export default connect(mapStateToProps)(GridView);