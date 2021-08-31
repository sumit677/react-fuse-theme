import React from "react";
import "./Widget.css";
import TextField from "../TextField/TextField";
import UnMappedField from "../UnMappedField/UnMappedField";

function Widget(props) {
  const widgetDataArray = props.widgetData;

  return (
    <div>
      {Object.keys(widgetDataArray).map((fieldIndex) => {
        if (widgetDataArray[fieldIndex] === null) {
          return (
            <UnMappedField key={fieldIndex} id={fieldIndex}></UnMappedField>
          );
        } else {
          switch (widgetDataArray[fieldIndex].FieldType) {
            case "Text": {
              return (
                <TextField
                  key={fieldIndex}
                  fieldData={widgetDataArray[fieldIndex]}
                ></TextField>
              );
            }
            default: {
              return <div key={fieldIndex}></div>;
            }
          }
        }
      })}
    </div>
  );
}

export default Widget;
