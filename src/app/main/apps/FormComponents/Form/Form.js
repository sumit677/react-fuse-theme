import React from "react";
import "./Form.css";
import FormCard from "../Card/FromCard";
import Section from "../Section/Section";

function Form(props) {
  const jsonData = props.formFieldData;
  
  return (
    <div className="formWidth">
      {Object.keys(jsonData).map((sectionName, sectionIndex) => {
        return (
          <FormCard key={sectionName} cardTitle={sectionName}>
            <Section sectionData={jsonData[sectionName]}></Section>
          </FormCard>
        );
      })}
    </div>
  );
}

export default Form;
