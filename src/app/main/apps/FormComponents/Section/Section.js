import React from "react";
import "./Section.css";
import FormCard from "../Card/FromCard";
import Widget from "../Widget/Widget";

function Section(props) {
  const jsonData = props.sectionData;

  return (
    <div>
      {Object.keys(jsonData).map((WidgetName, widgetIndex) => {
        return (
          <FormCard key={WidgetName} cardTitle={WidgetName}>
            <div className='childWidgetborder'>
              <Widget widgetData={jsonData[WidgetName]}></Widget>
            </div>
          </FormCard>
        );
      })}
    </div>
  );
}

export default Section;
