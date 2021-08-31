import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {Typography} from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import { FusePageSimple} from '@fuse';
//ACCORDIAN EXPANSIN PANNEL
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FormControl from '@material-ui/core/FormControl';
import {Link} from 'react-router-dom';
/////radio import
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
//// button import
import Button from '@material-ui/core/Button';
import { useDispatch,useSelector } from 'react-redux'

////text area import
import './RMSForgetPasswordEsignApp.css';  
import * as Actions from './store/actions';
import withReducer from 'app/store/withReducer';
import reducer from './store/reducers';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import Fade from '@material-ui/core/Fade';
import CircularProgress from '@material-ui/core/CircularProgress';

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const useStyles1 = makeStyles(theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
}));

function MySnackbarContentWrapper(props) {
  const classes = useStyles1();
  const { className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={clsx(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={clsx(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton key="close" aria-label="Close" color="inherit" onClick={onClose}>
          <CloseIcon className={classes.icon} />
        </IconButton>,
      ]}
      {...other}
    />
  );
}
MySnackbarContentWrapper.propTypes = {
className: PropTypes.string,
message: PropTypes.node,
onClose: PropTypes.func,
variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
};


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
    label: {
      marginLeft: theme.spacing(0),
      paddingLeft: theme.spacing(0),
      padding: theme.spacing(2),
      width: '68%',
    },
    textLabel:{
      marginLeft: theme.spacing(0),
    },
    button: {
      margin: theme.spacing(1),
    },
    radioButton: {    
      padding: theme.spacing(2),
      paddingRight: theme.spacing(10),
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
    },
    snackbar:{
      bottom:'70px',
      right:'83px',
    },
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    progressBar: {
      height: '100%',
      width: '100%',
      position: 'absolute',
      top: 0, left: 0,
      zIndex:9999,
      opacity:0.7,
      background: '#000',
      opacity: .5,
    },
    progressBarInternal:{
      
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

  


  
function RMSForgetPasswordEsignApp(props)
{



  const classes = useStyles();
  const selectClasses = useStylesSelect();
  const dispatch = useDispatch();
  
  

  const [values, setValues] = React.useState({
    disableFLag:useSelector(({RMSForgetPasswordEsignApp}) => RMSForgetPasswordEsignApp.events.disableFLag),
    sendDisableFlag:useSelector(({RMSForgetPasswordEsignApp}) => RMSForgetPasswordEsignApp.events.sendDisableFlag),
    successSnackbar:useSelector(({RMSForgetPasswordEsignApp}) => RMSForgetPasswordEsignApp.events.successSnackbar),
    errorSnackbar:useSelector(({RMSForgetPasswordEsignApp}) => RMSForgetPasswordEsignApp.events.errorSnackbar),
    loading: true,
    confirmNeweSign:'',
    newEsign:'',
    confirmNewPassword:'',
    newPassword:'',
    code:'',
    successMessage:'',
    errorMessage:'',
    forgetType:'radioVerificationCode',
    secutityAnswer:'',
    checkedPasswordReset:false,
    checkedEsignReset:false,

    messages:{
      sendMailSuccessMessage:'Mail Sent Successfully.',
      sendMailErrorMessage:'Error While Sending Email.',
      verifyCodeSuccessMessage:'Code Verified Successfully.',
      verifyCodeErrorMessage:'Incorrect Code.',
      passwordsDontMatch:'Passwords do not match.',
      eSignDoNotMatch:'Esigns do not match.',
      fieldsareEmpty:'Atleast one of mandatory fields are empty.',
      submitCodeSuccess:'Password and Esign changed successfully.',
      submitAnswerSuccess:<p>Login Credentials Changed. <br/>Mail Sent Successfully.</p>,
      submitCodeError:'Error while Submitting.',
      submitAnswerNotVerified:'Security answer not verified.',
    },
  });
  
  const events = useSelector(({RMSForgetPasswordEsignApp}) => RMSForgetPasswordEsignApp.events);
  const [selectedValue, setSelectedValue] = React.useState('radioVerificationCode');
  // const timerRef = React.useRef();

  // React.useEffect(
  //   () => () => {
  //     clearTimeout(timerRef.current);
  //   },
  //   [],
  // );

  // function handleClickLoading() {
  //   setValues({ ...values, 'loading': !values.loading });
  // }

  function resetButtonAction(){
      setSelectedValue('radioVerificationCode');
      changeView('radioVerificationCode');
      dispatch(Actions.resetEvent(values));
      values.forgetType='radioVerificationCode';
  }

  function handleSuccessClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }
    if(values.errorSnackbar===true){
      setValues({ ...values, 'errorSnackbar': false });
    }
    if(values.successSnackbar===true){
      setValues({ ...values, 'successSnackbar': false });
    }
  }
  
  function handleSubmit()
  {
    if(values.forgetType==='radioVerificationCode'){
        if(values.newPassword === '' || values.confirmNewPassword === '' || values.newEsign === '' || values.confirmNeweSign === '' ){
          values.errorMessage = values.messages.fieldsareEmpty;
          setValues({ ...values, 'errorSnackbar': true });
        }
        else if(values.newPassword !== values.confirmNewPassword){
          values.errorMessage = values.messages.passwordsDontMatch;
          setValues({ ...values, 'errorSnackbar': true });
        }
        else if(values.newEsign !== values.confirmNeweSign){
            values.errorMessage = values.messages.eSignDoNotMatch;
            setValues({ ...values, 'errorSnackbar': true });
        }
        else{
          dispatch(Actions.submitEvent(events.userName, values)); 
        }
    }else{
      if(values.secutityAnswer === '' || (values.checkedEsignReset === false && values.checkedPasswordReset === false)){
        values.errorMessage = values.messages.fieldsareEmpty;
        setValues({ ...values, 'errorSnackbar': true });
      }
      else {
        dispatch(Actions.submitEvent(events.userName, values)); 
      }
    }
    
  }

  
  function handleClose()
  {
    events.userName = 'valleyadmin';
    events.response = [];
    events.error ="";
    events.progressStatus='inProgress';
    events.radioButtonFlag= true;
    events.verifyDisableFlag= true;
    events.submitDisableFlag=true;
    events.securityQuestion= 'admin';
    events.sendCodeLabel= 'SEND CODE';
    events.disableFLag= false;
    events.sendDisableFlag= true;
    events.successSnackbar=false;
    events.errorSnackbar=false
    
  }
  
  function sendCodeEvent()
  {

      // handleClickLoading();
      dispatch(Actions.sendCodeEvent(events.userName, values));
  }

  function verifyCodeEvent()
  {
      dispatch(Actions.verifyCodeEvent( events.userName,values.code, values));
  }
  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  function handleChangeRadio(event) {
    setSelectedValue(event.target.value);
    setValues({ ...values, 'forgetType': event.target.value });
    changeView(event.target.value);
  }

  function changeView(value){
    if(value==='radioVerificationCode'){
      events.submitDisableFlag= true;
      document.querySelectorAll(".SecurityQuestion").forEach(
        function(item){
          item.style.display = "none";
        }
      );
      document.querySelectorAll(".SecurityCode").forEach(
        function(item){
          item.style.display = "flex";
        }
      );
    }else if(value==='radioSecurityQuestion'){
      events.submitDisableFlag= false;
      document.querySelectorAll(".SecurityQuestion").forEach(
        function(item){
          item.style.display = "flex";
        }
      );
      document.querySelectorAll(".SecurityCode").forEach(
        function(item){
          item.style.display = "none";
        }
      );
    }

  }

  const handleChangeCheckBox  = event => {
    if(event.target.value==='checkedPasswordReset'){
      setValues({ ...values, 'checkedPasswordReset': event.target.checked });
    }
    else if(event.target.value==='checkedEsignReset'){
      setValues({ ...values, 'checkedEsignReset': event.target.checked });
    }
  };

    return (
        <FusePageSimple
        header={
            <div className="flex flex-1 items-center justify-between p-24">
                <div className="flex flex-col">
                
                    <Typography variant="h6">Forget Password/eSign</Typography>
                    {/* <div className="flex items-center mb-16">
                       <Typography color="textSecondary">Forget Password/eSign</Typography>
                        
                        
                    </div> */}
                </div>
                <Button
                    className="normal-case"
                    variant="contained"
                    component="a"  onClick={handleClose}
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
          <Typography className={classes.expansionheading}>Forgot Password/eSign</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>


        {/* <div className={classes.progressBar}>
          <div className={classes.progressBarInternal}>
          <Fade
            in={values.loading}
            style={{
              transitionDelay: values.loading ? '800ms' : '0ms',
            }}
            unmountOnExit
          >
            <CircularProgress />
          </Fade>
          </div>
        </div> */}

<form className={classes.container} noValidate autoComplete="off">

      <div className="field">
          <label className={classes.label}>Username</label>
          <label className={classes.label}>{events.userName}</label>
      </div>


      <div className="field">
    
      <FormControlLabel
            value="other"
            control={<Radio
                className={classes.radioButton}
                checked={selectedValue === 'radioVerificationCode'}
                onChange={handleChangeRadio}
                value="radioVerificationCode"
                name="radio-button-demo"
                aria-label="radioVerificationCode"
                label="Verification Code"
              />}
            label="Verification Code"
            labelPlacement="start"
            className={classes.textLabel}
          />
          <FormControlLabel
            value="other"
            control={<Radio
                className={classes.radioButton}
                checked={selectedValue === 'radioSecurityQuestion'}
                onChange={handleChangeRadio}
                value="radioSecurityQuestion"
                name="radio-button-demo"
                aria-label="radioSecurityQuestion"
                label="Security Question"
                disabled={!events.radioButtonFlag}
              />}
            label="Security Question"
            labelPlacement="start"
          />
          <div className="SecurityCode">
            <Button variant="contained" disabled={values.disableFLag} color="secondary" className={classes.button} onClick={sendCodeEvent} >
              {events.sendCodeLabel}
            </Button>
          </div>
      </div>
 

 <div className="field SecurityCode">

    <label className="fieldLabel">Enter Code<span className="required">*</span></label>
    <FormControl className={selectClasses.formControl}>
        
    <TextField
          id="outlined-Code"
          placeholder="Enter Code"
          className={classes.textField}
          margin="normal"
          name="Code"
          variant="outlined"
          disabled={events.sendDisableFlag}
          inputProps={{
              minLength: "4",
              maxLength: "12"
            }}
          value={values.code}
          onChange={handleChange('code')}
        />
      </FormControl>
      <Button variant="contained" color="secondary" className={classes.button} onClick={verifyCodeEvent} disabled={events.sendDisableFlag}>
        Verify
      </Button>
 </div>
 <div className="field SecurityCode">

    <label className="fieldLabel">New Password<span className="required">*</span></label>
    <FormControl className={selectClasses.formControl}>
        
    <TextField
          id="outlined-Code"
          placeholder="New Password"
          className={classes.textField}
          margin="normal"
          name="newPassword"
          variant="outlined"
          inputProps={{
              minLength: "4",
              maxLength: "12"
            }}
          type="password"
          value={values.newPassword}
          onChange={handleChange('newPassword')}
          disabled={events.verifyDisableFlag}
        />
      </FormControl>
 </div>

 <div className="field SecurityCode">

    <label className="fieldLabel">Confirm New Password<span className="required">*</span></label>
    <FormControl className={selectClasses.formControl}>
        
    <TextField
          id="outlined-Code"
          placeholder="Confirm New Password"
          className={classes.textField}
          margin="normal"
          name="confirmNewPassword"
          variant="outlined"
          type="password"
          disabled={events.verifyDisableFlag}
          inputProps={{
              minLength: "4",
              maxLength: "12"
            }}
          value={values.confirmNewPassword}
          onChange={handleChange('confirmNewPassword')}
        />
      </FormControl>
 </div>

 <div className="field SecurityCode">

<label className="fieldLabel">New eSign<span className="required">*</span></label>
<FormControl className={selectClasses.formControl}>
    
<TextField
      id="outlined-Code"
      placeholder="New eSign"
      className={classes.textField}
      margin="normal"
      type="password"
      name="newEsign"
      variant="outlined"
      disabled={events.verifyDisableFlag}
      inputProps={{
          minLength: "4",
          maxLength: "12"
        }}
      value={values.newEsign}
      onChange={handleChange('newEsign')}
    />
  </FormControl>
</div>

<div className="field SecurityCode">

<label className="fieldLabel">Confirm New eSign<span className="required">*</span></label>
<FormControl className={selectClasses.formControl}>
    
<TextField
      id="outlined-Code"
      placeholder="Confirm New eSign"
      className={classes.textField}
      margin="normal"
      type="password"
      name="confirmNeweSign"
      variant="outlined"
      disabled={events.verifyDisableFlag}
      inputProps={{
          minLength: "4",
          maxLength: "12"
        }}
      value={values.confirmNeweSign}
      onChange={handleChange('confirmNeweSign')}
    />
  </FormControl>
</div>

<div className="field SecurityQuestion">
    <label className={classes.label}>Security Question</label>
    <label className={classes.label}>{events.securityQuestion}</label>
</div>

<div className="field SecurityQuestion">

<label className="fieldLabel">Security Answer<span className="required">*</span></label>
<FormControl className={selectClasses.formControl}>
    
<TextField
      id="outlined-Code"
      placeholder="Security Answer"
      className={classes.textField}
      value={values.secutityAnswer}
      onChange={handleChange('secutityAnswer')}
      margin="normal"
      name="securityAnswer"
      variant="outlined"
      inputProps={{
          minLength: "4",
          maxLength: "12"
        }}
    />
  </FormControl>
</div>
<div className="field SecurityQuestion">
  <FormControlLabel control={<Checkbox value='checkedPasswordReset'  checked={values.checkedPasswordReset} onChange={handleChangeCheckBox} />} label="Reset Password" />
</div>
<div className="field SecurityQuestion">
  <FormControlLabel control={<Checkbox value='checkedEsignReset'  checked={values.checkedEsignReset} onChange={handleChangeCheckBox}/>} label="Reset eSign" />
</div>
<div className="field">
  <Button variant="contained" color="secondary" disabled={events.submitDisableFlag} className={classes.button} onClick={handleSubmit}>
    Submit
  </Button>
  <Button variant="contained" onClick={resetButtonAction} color="secondary" className={classes.button}>
    Reset
  </Button>
</div>

<Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      className={classes.snackbar}
      open={values.successSnackbar}
      autoHideDuration={4000}
      onClose={handleSuccessClose}
    >
  <MySnackbarContentWrapper
    onClose={handleSuccessClose}
    variant="success"
    message={values.successMessage}
  />
</Snackbar> 

<Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      className={classes.snackbar}
      open={values.errorSnackbar}
      autoHideDuration={4000}
      onClose={handleSuccessClose}
    >
  <MySnackbarContentWrapper
    onClose={handleSuccessClose}
    variant="error"
    message={values.errorMessage}
  />
</Snackbar>

</form>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      

      </div>
      
   }
   />
   
    );

}

export default withReducer('RMSForgetPasswordEsignApp', reducer)(RMSForgetPasswordEsignApp);