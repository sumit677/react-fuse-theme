import React  from 'react';
import './Section.css'

function FormFields(props){
    const jsonData = props.formFieldData;
    var keys = Object.keys(props.formFieldData);
    for(var i = 0; i< keys.length;i++ ){
        console.log(keys[i]);
        console.log(jsonData[keys[i]]);
    }
    return (
        <div>
            
        </div>
    );
}

export default FormFields;