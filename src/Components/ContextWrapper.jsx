// import React from "react";
import PropTypes from "prop-types"; // Import PropTypes

import "./styles.css";

const ContentWrapper = ({ children }) => {
  return <div className="contentWrapper">{children}</div>;
};

// Add propTypes validation for the 'children' prop
ContentWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ContentWrapper;
