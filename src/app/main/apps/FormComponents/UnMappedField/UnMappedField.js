import React from "react";
import { TextField } from "@material-ui/core";
import "./UnMappedField.css";

function UnMappedField(props) {
  return (
    <div>
      <TextField
        className="UnMappedField"
        id={props.id}
        name={props.id}
        type="text"
        disabled={true}
        variant="outlined"
        fullWidth
        placeholder="Unmapped Field Type"
        InputProps={{classes:{input:'UnMappedFieldBgColor'}}}
      />
    </div>
  );
}

export default UnMappedField;
