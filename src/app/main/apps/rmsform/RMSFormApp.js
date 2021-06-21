import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {Icon, Typography} from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import { FusePageSimple} from '@fuse';
//ACCORDIAN EXPANSIN PANNEL
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
///select import
// eslint-disable-next-line
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';

/////radio import
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
//datetime picker
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDateTimePicker ,MuiPickersUtilsProvider } from "@material-ui/pickers";
//// button import
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';

////text area import

import './RMSFormApp.css';  

  
  const useStyles = makeStyles(theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center'
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: '68%',
    },
    dense: {
      marginTop: theme.spacing(2),
    },
    menu: {
      width: 200,
    },
    expansionroot: {
        width: '100%',
      },
      expansionheading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
      },
      expansioncolor:{
          backgroundColor: '#039be5',
      }
  }));
  
  
const useStylesSelect = makeStyles(theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    formControl: {
      margin: theme.spacing(1),
      marginTop: '16px',
      minWidth: 120,
      width: '68%',
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

  const useStylesButtons = makeStyles(theme => ({
    defaultButton: {
      margin: theme.spacing(1),
    },
    greeenButton: {
        margin: theme.spacing(1),
        backgroundColor: 'green',
      },
    input: {
      display: 'none',
    },
  }));


function RMSFormApp(props)
{
    const classes = useStyles();
    const selectClasses = useStylesSelect();
    const buttonsClasses     = useStylesButtons();
  const [values, setValues] = React.useState({
    name: '',
    age: '10',
    mobileNo:'',
    zipCode:'',
    multiline: 'Controlled',
    currency: 'EUR',
    radioButton:'male',
    country:'100',
  });

  
  const [selectedDate, handleDateChange] = React.useState(new Date("2021-01-01T00:00:00.000Z"));
  const handleChange = name => event => {
    console.log("name" + name +"event.keyCode" + event.key);
    setValues({ ...values, [name]: event.target.value });
  };
  function handleChangeNum (event){
    const target = event.target;
    const value = target.value;
    const name = target.name;
    const length=  value.length;
    const re = /^[0-9\b]+$/;
    console.log("name" + name + "value" + value + "length" + length + "event.keyCode" + event.keyCode);
    if( value !== '' && re.test(value)  ){
        setValues(oldValues => ({
            ...oldValues,
            [event.target.name]: event.target.value,
          }));
    }
    
  }
    
  function handleChangeSelect(event) {
    setValues(oldValues => ({
      ...oldValues,
      [event.target.name]: event.target.value,
    }));
  }
  const [selectedValue, setSelectedValue] = React.useState('a');

  function handleChangeRadio(event) {
    setSelectedValue(event.target.value);
  }

  const [selectedValue2, setSelectedValue2] = React.useState('a1');
  function handleChangeRadioCon(event) {
    setSelectedValue2(event.target.value);
  }


    return (
        <FusePageSimple
        header={
            <div className="flex flex-1 items-center justify-between p-24">
                <div className="flex flex-col">
                
                    <Typography variant="h6">Dashboard Doctor</Typography>
                    <div className="flex items-center mb-16">
                       <Typography color="textSecondary">Add Patient</Typography>
                        
                        
                    </div>
                </div>
                <Button
                    className="normal-case"
                    variant="contained"
                    component="a"
                    component={Link} to="/apps/dashboards/analytics"
                >
                    <CancelIcon className="mr-4">link</CancelIcon>
                    Close
                </Button>
            </div>
        }
        content={

<div className={classes.root}>
      <ExpansionPanel defaultExpanded>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.expansionheading}>Patients Demographic</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            
<form className={classes.container} noValidate autoComplete="off">

<div class="field">
    <label class="fieldLabel">First Name<span class="required">*</span></label>
<TextField
        id="outlined-name"
        placeholder="First Name"
        className={classes.textField}
        value={values.name}
        onChange={handleChange('name')}
        margin="normal"
        variant="outlined"
        inputProps={{
            minlength: "4",
            maxlength: "12"
          }}
      />
      </div>
      <div class="field">
    <label class="fieldLabel">Last Name<span class="required">*</span></label>
      <TextField
        id="outlined-uncontrolled"
        placeholder="Last Name"
        className={classes.textField}
        margin="normal"
        variant="outlined"
        inputProps={{
            minlength: "4",
            maxlength: "12"
          }}
      />
 </div>
 

 <div class="field">

    <label class="fieldLabel">Gender<span class="required">*</span></label>
    <FormControl className={selectClasses.formControl}>
        
        <Select
          value={values.age}
          onChange={handleChangeSelect}
          inputProps={{
            name: 'age',
            id: 'age-simple',
          }}
          input={<OutlinedInput  name="age" id="outlined-age-simple" />}
        >
          
          <MenuItem value={10}>Male</MenuItem>
          <MenuItem value={20}>Female</MenuItem>
          <MenuItem value={30}>Rather not to say</MenuItem>
        </Select>
      </FormControl>
 </div>


 <div class="field"> 
 
 
 <label class="fieldLabel">Date of Birth<span class="required">*</span></label> 
 <MuiPickersUtilsProvider utils={DateFnsUtils}>


<KeyboardDateTimePicker
        variant="inline"
        ampm={false}
        value={selectedDate}
        onChange={handleDateChange}
        onError={console.log}
        inputVariant="outlined"
        style={{ width : '69%', paddingLeft: '8px', marginTop: '16px' }} 
        
        format="yyyy/MM/dd HH:mm"
      />
       </MuiPickersUtilsProvider>
      </div>

 <div class="field"> 
 
 <div class="radioBtn">
 <label class="fieldLabel">Status<span class="required">*</span></label> 
 <FormControlLabel
          value="top"
          control={<Radio
            checked={selectedValue === 'a'}
            onChange={handleChangeRadio}
            value="a"
            name="radio-button-demo"
            aria-label="A"
            label="Active"
          />}
          label="Active"
          labelPlacement="start"
        />  
 
 <FormControlLabel
            value="other"
            control={<Radio
                checked={selectedValue === 'b'}
                onChange={handleChangeRadio}
                value="b"
                name="radio-button-demo"
                aria-label="B"
                label="Inactive"
              />}
            label="Inactive"
            labelPlacement="start"
          />
</div>
</div>

</form>
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel defaultExpanded>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Patient Contact Information </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            
<form className={classes.container} noValidate autoComplete="off">

<div class="field">
    <label class="fieldLabel">Mobile no.<span class="required">*</span></label>
<TextField
        id="outlined-name"
        placeholder="Mobile no."
        className={classes.textField}
        value={values.mobileNo}
        onChange={handleChangeNum}
        margin="normal"
        variant="outlined"
        name="mobileNo"
        inputProps={{
            minlength: "4",
            maxlength: "10",
          }}
        
    
      />
      </div>
      <div class="field">
    <label class="fieldLabel">Zip Code<span class="required">*</span></label>
      <TextField
        id="outlined-uncontrolled"
        placeholder="Zip Code"
        className={classes.textField}
        margin="normal"
        onChange={handleChangeNum}
        variant="outlined"
        name="zipCode"
        value={values.zipCode}
        inputProps={{
            minlength: "4",
            maxlength: "10",
          }}
      />
 </div>
 

 <div class="field">

    <label class="fieldLabel">Country<span class="required">*</span></label>
    <FormControl className={selectClasses.formControl}>
        
        <Select
          value={values.country}
          onChange={handleChangeSelect}
          inputProps={{
            name: 'country',
            id: 'age-simple',
          }}
          input={<OutlinedInput  name="country" id="outlined-age-simple" />}
        >
          
          <MenuItem value={100}>India</MenuItem>
          <MenuItem value={200}>Uk</MenuItem>
          <MenuItem value={300}>USA</MenuItem>
        </Select>
      </FormControl>
 </div>



 <div class="field"> 
 
 <div class="radioBtn">
 <label class="fieldLabel">Residency<span class="required">*</span></label> 
 <FormControlLabel
          value="top"
          control={<Radio
            checked={selectedValue2 === 'a1'}
            onChange={handleChangeRadioCon}
            value="a1"
            name="radio-button-demo"
            aria-label="A"
            label="Permanent"
          />}
          label="Permanent"
          labelPlacement="start"
        />  
 
 <FormControlLabel
            value="other"
            control={<Radio
                checked={selectedValue2 === 'b1'}
                onChange={handleChangeRadioCon}
                value="b1"
                name="radio-button-demo"
                aria-label="B"
                label="Temporary"
              />}
            label="Temporary"
            labelPlacement="start"
          />
</div>
</div>

<div class="field"> 
<div class="btns"> 
<Button variant="contained" className={buttonsClasses.defaultButton}>
        Reset
      </Button>
      <span class='or_btn'>or</span>
      <Button variant="contained" color="primary" className={buttonsClasses.greeenButton}>
        Save
      </Button>
      </div>
</div>
</form>
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>

      </div>
      
   }
   />
    );

}

export default RMSFormApp;