import React, {useEffect, useState}  from 'react';
import {Avatar, Checkbox, Icon, IconButton, Typography} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import CancelIcon from '@material-ui/icons/Cancel';
import { FusePageSimple,FuseAnimate,FuseUtils} from '@fuse';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import {useDispatch, useSelector} from 'react-redux';

import * as Actions from './store/actions';
import reducer from './store/reducers';
import withReducer from 'app/store/withReducer';
//ACCORDIAN EXPANSIN PANNEL
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


//select 

  
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


//table
import ReactTable from "react-table";
import ContactsList from './ContactsList';

// new css
const useStyles = makeStyles(theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    dense: {
      marginTop: theme.spacing(2),
    },
    menu: {
      width: 200,
    },
    formControl: {
          marginTop: 16,
          marginBottom: 8,
        },
    // formControl: {
    //     margin: theme.spacing(1),
    //     minWidth: 120,
    //   },
  }));

  

function SearchFieldWidget(Props){

    const classes = useStyles();
    const events = useSelector(({ManageOrganizationApp}) => ManageOrganizationApp.contacts);
    const [values, setValues] = React.useState({
      organizationName:'',
      organizationCode:'',
      organizationType: 'OTHER',
      city:'',
      state:'',
      organizationStatus: 'ACTIVE',
        searchscreenDisabled:events.searchscreenDisabled
        
      });
    
      const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
      };
      useEffect(() => {
        events.searchWidgetValues =values;
      }, [values])
      const inputLabel = React.useRef(null);
      const [labelWidth, setLabelWidth] = React.useState(0);
      
      React.useEffect(() => {
        if(values.searchscreenDisabled==false){
          
        setLabelWidth(inputLabel.current.offsetWidth);
        }
        
        
      
      }, []);
     

if(values.searchscreenDisabled==true){

  return  (
    <div className="flex flex-1 items-center justify-center h-full">
        <Typography color="textSecondary" variant="h5">
            There are no widget!
        </Typography>
    </div>
);
}
      return (
      <ExpansionPanel defaultExpanded>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography className={classes.expansionheading}>Search Filter(s) </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Typography>

            {/* start */}
            <form className={classes.container} noValidate autoComplete="off">
                <div className="MuiCollapse-wrapper">
                <TextField
                    id="outlined-name"
                    label="Organization Name"
                    className= {`${classes.textField} makeStyles-wrapper-6`}
                    onChange={handleChange('organizationName')}
                    margin="normal"
                    variant="outlined"
                    name="organizationName"
                    value={values.organizationName}
                />
                <TextField
                    id="outlined-name"
                    label="Organization Code"
                    className= {`${classes.textField} makeStyles-wrapper-6`}
                    onChange={handleChange('organizationCode')}
                    margin="normal"
                    variant="outlined"
                    name="organizationCode"
                    value={values.organizationCode}
                />
                 <FormControl variant="outlined"  className= {`${classes.formControl} makeStyles-wrapper-6 makeStyles-textField-1486
`}>
                    <InputLabel ref={inputLabel} htmlFor="outlined-age-native-simple">
                    Organization Type
                    </InputLabel> 
                    <Select
                    native
                    value={values.organizationType}
                    name="organizationType"
                    onChange={handleChange('organizationType')}
                    input={
                        <OutlinedInput name="age" labelWidth={labelWidth} id="outlined-age-native-simple" />
                    }
                    >
                    <option value={'OTHER'}>Other</option>
                    </Select>
                </FormControl>
                </div>
                <div className="MuiCollapse-wrapper">
                <TextField
                    id="outlined-name"
                    label="City"
                    name="city"
                    className= {`${classes.textField} makeStyles-wrapper-6`}
                    onChange={handleChange('city')}
                    margin="normal"
                    value={values.city}
                    variant="outlined"
                />
                <TextField
                    id="outlined-name"
                    label="State"
                    name="state"
                    className= {`${classes.textField} makeStyles-wrapper-6`}
                    onChange={handleChange('state')}
                    value={values.state}
                    margin="normal"
                    variant="outlined"
                />
                 <FormControl variant="outlined"  className= {`${classes.formControl} makeStyles-wrapper-6`}>
                    <InputLabel ref={inputLabel} htmlFor="outlined-age-native-simple">
                    Organization Status
                    </InputLabel>
                    <Select
                    native
                    name="organizationStatus"
                    value={values.organizationStatus}
                    onChange={handleChange('organizationStatus')}
                    input={
                        <OutlinedInput name="age" labelWidth={labelWidth} id="outlined-age-native-simple" />
                    }
                    >
                    <option value={'ACTIVE'}>Active</option>
                    <option value={'INACTIVE'}>Inactive</option>
                    </Select>
                </FormControl>
                    </div>
                </form>
            {/* end */}
            </Typography>
            </ExpansionPanelDetails>
            </ExpansionPanel>)


}
export default  SearchFieldWidget;
;