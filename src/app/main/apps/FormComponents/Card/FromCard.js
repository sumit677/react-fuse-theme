import React from "react";
import "./FormCard.css";

function FormCard(props) {
  const classes = "formCard " + props.className;
  return (
    <div className={classes}>
      <h2>{props.cardTitle}</h2>
      {props.children}
    </div>
  );
}

export default FormCard;
