import React from "react";
import PropTypes from "prop-types";
import ReactTooltip from "react-tooltip";
import propsMapping from "./propsMapping";
import CollapsibleSection from "./CollapsibleSection";
import { formatValue } from "../utils/formatValue";
import MetricDetails from "./MetricDetails";

const LocationDetails = (props) => {
  const selectedFeature = props.feature;
  const comparisonFts = props.comparison;
  let allFeatures = comparisonFts;
  if (selectedFeature && !comparisonFts.find(feature => feature.properties["SA2_MAIN16"] === selectedFeature.properties["SA2_MAIN16"])) {
    allFeatures = [...allFeatures, props.feature]
  }

  const renderMetric = (metric) => {
    let rawValue = selectedFeature ? selectedFeature.properties[metric.id] : "";
    const value = formatValue(rawValue, metric.format);

    return (
      <div key={metric.id}>
        <h2 data-tip data-for={metric.id}>{metric.label}</h2>
        {metric.desc && (
          <ReactTooltip id={metric.id}>
            <strong>{metric.label}</strong>
            <div style={{maxWidth: 400}}>
              {metric.desc}
            </div>
          </ReactTooltip>
        )}
        {comparisonFts.length ? (
          allFeatures.map(ft => 
            <MetricDetails key={ft.properties.SA2_MAIN16} feature={ft} metric={metric} />
          )
        ) : (
          <p>{value}</p>
        )}
      </div>
    )
  }

  return (
    <div
      style={{ overflowY: "auto" }}
      className={`sidebar-content`}
    >
      {props.children}
      {propsMapping.map((section) => (
        <CollapsibleSection title={section.title} key={section.title}>
          {section.content.map((metric) => (
            renderMetric(metric)
          ))}
        </CollapsibleSection>
      ))}
    </div>
  )
}

LocationDetails.propTypes = {
  feature: PropTypes.shape({
    properties: PropTypes.any
  }),
  comparison: PropTypes.array,
  children: PropTypes.node
}

export default LocationDetails;
