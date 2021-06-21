import React,{useEffect, useState}  from 'react'

import * as Actions from '../store/actions';
import reducer from '../store/reducers';
import withReducer from 'app/store/withReducer';
import {Link} from 'react-router-dom';
import CancelIcon from '@material-ui/icons/Cancel';
import {useDispatch, useSelector} from 'react-redux';
import { makeStyles,useTheme } from '@material-ui/core/styles';
import { FuseAnimate, FusePageCarded, FuseChipSelect, FuseUtils} from '@fuse';
import {Button, Tab, Tabs, TextField, InputAdornment, Icon, Typography} from '@material-ui/core';
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

import ContactsList from '../ContactsList';
import SearchFieldWidget from '../SearchFieldWidget';


//autocomplete
import NoSsr from '@material-ui/core/NoSsr';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import { emphasize } from '@material-ui/core/styles/colorManipulator';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import AutocompleteSelect from 'react-select';
import {showMessage} from 'app/store/actions/fuse';
import history from '@history';
////css import

import '../CustomCSS.css';  
import { blueGrey } from '@material-ui/core/colors';

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
        margin: theme.spacing(1),
        minWidth: 120,
      },
  }));

  const countrySuggestions = [

    { label: 'Afghanistan'},
    { label: 'Aland Islands'  },
    { label: 'Albania' },
    { label: 'Algeria'  },
    { label: 'American Samoa' },
    { label: 'Andorra'  },
  ].map(suggestion => ({
    value: suggestion.label,
    label: suggestion.label,
    exrtaInfo: 'country',
  }));

  const suggestions = [
    { label: 'Afghanistan'},
    { label: 'Aland Islands'  },
    { label: 'Albania' },
    { label: 'Algeria'  },
    { label: 'American Samoa' },
    { label: 'Andorra'  },
    { label: 'Angola' },
    { label: 'Anguilla' },
    { label: 'Antarctica' },
    { label: 'Antigua and Barbuda' },
    { label: 'Argentina' },
    { label: 'Armenia' },
    { label: 'Aruba' },
    { label: 'Australia' },
    { label: 'Austria' },
    { label: 'Azerbaijan' },
    { label: 'Bahamas' },
    { label: 'Bahrain' },
    { label: 'Bangladesh' },
    { label: 'Barbados' },
    { label: 'Belarus' },
    { label: 'Belgium' },
    { label: 'Belize' },
    { label: 'Benin' },
    { label: 'Bermuda' },
    { label: 'Bhutan' },
    { label: 'Bolivia, Plurinational State of' },
    { label: 'Bonaire, Sint Eustatius and Saba' },
    { label: 'Bosnia and Herzegovina' },
    { label: 'Botswana' },
    { label: 'Bouvet Island' },
    { label: 'Brazil' },
    { label: 'British Indian Ocean Territory' },
    { label: 'Brunei Darussalam' },
  ].map(suggestion => ({
    value: suggestion.label,
    label: suggestion.label,
    exrtaInfo: 'state',
  }));
  
  const useStylesAutocompelete = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      height: 250,
    },
    input: {
      display: 'flex',
      padding: 0,
      height: 'auto',
    },
    valueContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      flex: 1,
      alignItems: 'center',
      overflow: 'hidden',
    },
    chip: {
      margin: theme.spacing(0.5, 0.25),
    },
    chipFocused: {
      backgroundColor: emphasize(
        theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
        0.08,
      ),
    },
    noOptionsMessage: {
      padding: theme.spacing(1, 2),
    },
    singleValue: {
      fontSize: 16,
    },
    placeholder: {
      position: 'absolute',
      left: 2,
      bottom: 6,
      fontSize: 16,
    },
    paper: {
      position: 'absolute',
      zIndex: 1,
      marginTop: theme.spacing(1),
      left: 0,
      right: 0,
    },
    divider: {
      height: theme.spacing(2),
    },
    
  }));
  
  function NoOptionsMessage(props) {
    return (
      <Typography
        color="textSecondary"
        className={props.selectProps.classes.noOptionsMessage}
        {...props.innerProps}
      >
        {props.children}
      </Typography>
    );
  }
  
  NoOptionsMessage.propTypes = {
    children: PropTypes.node,
    innerProps: PropTypes.object,
    selectProps: PropTypes.object.isRequired,
  };
  
  function inputComponent({ inputRef, ...props }) {
    return <div ref={inputRef} {...props} />;
  }
  
  inputComponent.propTypes = {
    inputRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  };
  
  function Control(props) {
    return (
      <TextField
        fullWidth
        InputProps={{
          inputComponent,
          inputProps: {
            className: props.selectProps.classes.input,
            inputRef: props.innerRef,
            children: props.children,
            ...props.innerProps,
          },
        }}
        {...props.selectProps.TextFieldProps}
      />
    );
  }
  
  Control.propTypes = {
    children: PropTypes.node,
    innerProps: PropTypes.object,
    innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    selectProps: PropTypes.object.isRequired,
  };
  
  function Option(props) {
    return (
      <MenuItem
        ref={props.innerRef}
        selected={props.isFocused}
        component="div"
        style={{
          fontWeight: props.isSelected ? 500 : 400,
        }}
        {...props.innerProps}
      >
        {props.children}
      </MenuItem>
    );
  }
  
  Option.propTypes = {
    children: PropTypes.node,
    innerProps: PropTypes.object,
    innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    isFocused: PropTypes.bool,
    isSelected: PropTypes.bool,
  };
  
  function Placeholder(props) {
    return (
      <Typography
        color="textSecondary"
        className={props.selectProps.classes.placeholder}
        {...props.innerProps}
      >
        {props.children}
      </Typography>
    );
  }
  
  Placeholder.propTypes = {
    children: PropTypes.node,
    innerProps: PropTypes.object,
    selectProps: PropTypes.object.isRequired,
  };
  
  function SingleValue(props) {
    return (
      <Typography className={`${props.selectProps.classes.singleValue} w-49-5p`} {...props.innerProps}>
        {props.children}
      </Typography>
    );
  }
  
  SingleValue.propTypes = {
    children: PropTypes.node,
    innerProps: PropTypes.object,
    selectProps: PropTypes.object.isRequired,
  };
  
  function ValueContainer(props) {
    return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
  }
  
  ValueContainer.propTypes = {
    children: PropTypes.node,
    selectProps: PropTypes.object.isRequired,
  };
  
  function MultiValue(props) {
    return (
      <Chip
        tabIndex={-1}
        label={props.children}
        className={clsx(props.selectProps.classes.chip, {
          [props.selectProps.classes.chipFocused]: props.isFocused,
        })}
        onDelete={props.removeProps.onClick}
        deleteIcon={<CancelIcon {...props.removeProps} />}
      />
    );
  }
  
  MultiValue.propTypes = {
    children: PropTypes.node,
    isFocused: PropTypes.bool,
    removeProps: PropTypes.object.isRequired,
    selectProps: PropTypes.object.isRequired,
  };
  
  function Menu(props) {
    return (
      <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
        {props.children}
      </Paper>
    );
  }
  
  Menu.propTypes = {
    children: PropTypes.node,
    innerProps: PropTypes.object,
    selectProps: PropTypes.object,
  };
  
  const components = {
    Control,
    Menu,
    MultiValue,
    NoOptionsMessage,
    Option,
    Placeholder,
    SingleValue,
    ValueContainer,
  };
  
  
    
  

function AddOrganization(props) {
    const dispatch = useDispatch();
    const seacrhScreenState = useSelector(({ManageOrganizationApp}) => ManageOrganizationApp.contacts);
  const addOrganizationState = useSelector(({ManageOrganizationApp}) => ManageOrganizationApp.addorganization);
  const [tabValue, setTabValue] = useState(0);
  const autocompleteclasses = useStylesAutocompelete();
    const theme = useTheme();
    const [esign, setEsign] = React.useState(null);
    const [initValuesObj, setInitValuesObj] = React.useState(null);
    const selectStyles = {
        input: base => ({
          ...base,
          color: theme.palette.text.primary,
          '& input': {
            font: 'inherit',
          },
        }),
      };
  const [values, setValues] = React.useState({
    siteName: '',
    siteCode:'',
    siteType: 'OTHER',
    city:'',
    state:'Albania',
    siteStatus: 'ACTIVE',
    otherState:'',
    zipCode:'',
    country:'',
    workPhone:'',
    faxPhone :'',
    emailAddress:'',
    address1:'',
    address2:''
      
      
    });

    useEffect(() => {
      console.log("useEffect  addEditOrganizationState " + JSON.stringify(addOrganizationState.addEditOrganizationState));
      console.log("useEffect  values " + JSON.stringify(values));
      if(seacrhScreenState.selectedRowId!=null && seacrhScreenState.selectedRowId!=0){
        setInitValuesObj(addOrganizationState.addEditOrganizationState);
        setValues(addOrganizationState.addEditOrganizationState);
      }
      
  }, [addOrganizationState.addEditOrganizationState]);

    useEffect(() => {
      console.log("useEffect" );
      function updateOganizationState()
      {
          const params = props.match.params;
          const {siteId} = params;
          console.log("params in add org"+ JSON.stringify(props.match.params));

          if ( siteId==null || siteId==0 )
          {
             // dispatch(Actions.newProduct());
             setInitValuesObj(values);
          }
          else
          {
              dispatch(Actions.getSiteInfo(props.match.params));
          }
      }

      updateOganizationState();
  }, [dispatch, props.match.params]);
  console.log("addEditOrganizationState"+ JSON.stringify(addOrganizationState.addEditOrganizationState));
  
    function handleAutocompChnage(value) {
        
        
        setValues({ ...values, [value.exrtaInfo]: value})
       
      }
    const handleChange = name => event => { setValues({ ...values, [name]: event.target.value }); };
    useEffect(() => {    }, [values]);

    const handleChangeEsign = name => event => {
       console.log("esign value" + event.target.value );
       if(event.target.value!=null && event.target.value=='admin'){
          dispatch(Actions.enableSubmitBtn(false));
      }else{
        dispatch(Actions.enableSubmitBtn(true));
      }
       setEsign(event.target.value ); };
    
   

  function handleChangeTab(event, tabValue)
  {
      setTabValue(tabValue);
  }

  
  function handleSubmit(value)
  {
    console.log("handleSubmit" + value);
    console.log("handleSubmit2" + JSON.stringify(values));
    dispatch(Actions.addOrganization(values));
    
  }
  function handleEsign(value)
  {
    console.log("handleSubmit" + value);
    console.log("handleSubmit2" + JSON.stringify(values));
    dispatch(Actions.addOrganization(values));
    
  }
  function handleClose(value)
  {
    seacrhScreenState.selectedRowId=0;
    seacrhScreenState.editBtnFlagDisabled=true;
    
  }
  function handleReset()
  {
    setValues(initValuesObj);
    
  }
  
  React.useEffect(() => { 
    if(addOrganizationState.showAddOrganizationSuccessMsg==true){
        seacrhScreenState.showAddOrganizationSuccessMsg=true;
        addOrganizationState.showAddOrganizationSuccessMsg=false;
        seacrhScreenState.selectedRowId=0;
        seacrhScreenState.editBtnFlagDisabled=true;
        history.push({
            pathname: '/apps/organizations/'
        });
    }else if(addOrganizationState.showAddOrganizatioErrornMsg==true){
        dispatch(showMessage({message: 'Error While Adding Organization',variant:'error',autoHideDuration:'3000'}));
        addOrganizationState.showAddOrganizatioErrornMsg=false;
    }

   }, [handleSubmit]);
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
    const classes = useStyles();
    React.useEffect(() => { setLabelWidth(inputLabel.current.offsetWidth);  }, []);
    return (
        <FusePageCarded
            classes={{
                toolbar: "p-0",
                header : "min-h-72 h-72 sm:h-136 sm:min-h-136"
            }}
            header={
                
                    <div className="flex flex-1 w-full items-center justify-between">

                        <div className="flex flex-col items-start max-w-full">

                            <FuseAnimate animation="transition.slideRightIn" delay={300}>
                                <Typography className="normal-case flex items-center sm:mb-12" component={Link} role="button" to="/apps/organizations/all" color="inherit">
                                    <Icon className="mr-4 text-20">arrow_back</Icon>
                                    Manage Organizations
                                </Typography>
                            </FuseAnimate>

                            <div className="flex items-center max-w-full">
                                
                                <div className="flex flex-col min-w-0">
                                    <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                        <Typography className="text-16 sm:text-20 truncate">
                                        {seacrhScreenState.selectedRowId!=0 ?  'Edit Organization' : 'Add Organization'}
                                        </Typography>
                                    </FuseAnimate>
                                   
                                </div>
                            </div>
                        </div>
                <div className="flex items-center esign_slab justify-end">

                   <TextField

                    id="outlined-password-input"
                    name="esign"
                    label="e-sign"
                    className={`${classes.textField}` }
                    type="password"
                    autoComplete="current-password"
                    margin="normal"
                    variant="outlined"
                    onChange={handleChangeEsign('esign')}
                    
                />
                <Button
                    className="normal-case mx-1 h-36"
                    variant="contained"
                    component="a"
                    target="_blank"
                    onClick={handleSubmit}
                    disabled={seacrhScreenState.submitBtnDisableFlag}
                >
                      <Icon>save</Icon>
                    Submit
                </Button>
                <Button
                    className="normal-case mx-1 h-36"
                    variant="contained"
                    component="a"
                    onClick={handleReset}
                >
                    <Icon>refresh</Icon>
                    Reset
                </Button>
                
                <Button
                    className="normal-case mx-1 h-36"
                    variant="contained"
                    component="a"  onClick={handleClose}
                    component={Link} to="/apps/organizations/" 
                >
                   <CancelIcon className="mr-4">link</CancelIcon>
                    Close
                </Button>
                </div>
                        {/* <FuseAnimate animation="transition.slideRightIn" delay={300}>
                       
                            <Button
                                className="whitespace-no-wrap"
                                variant="contained"
                             >
                                 <Icon>save</Icon>
                                Save
                            </Button>
                        </FuseAnimate> */}
                    </div>
                
            }
            contentToolbar={
                <Tabs
                    value={tabValue}
                    onChange={handleChangeTab}
                    indicatorColor="secondary"
                    textColor="secondary"
                    variant="scrollable"
                    scrollButtons="auto"
                    classes={{root: "w-full h-64"}}
                >
                    <Tab className="h-64 normal-case" label="Organization Information"/>
                    <Tab className="h-64 normal-case" label=" Organization Contact Details"/>
                   
                </Tabs>
            }
            content={
                
                    <div className="p-16 sm:p-24 max-w-2xl">
                        {tabValue === 0 &&
                        (
                            <div>

                                <TextField
                                    className="mt-8 mb-16"
                                    required
                                    label="Organization Name"
                                    autoFocus
                                    id="siteName"
                                    name="siteName"
                                    onChange={handleChange('siteName')}
                                    variant="outlined"
                                    value={values.siteName}
                                    fullWidth
                                />

                                <TextField
                                    className="mt-8 mb-16"
                                    id="siteCode"
                                    name="siteCode"
                                    label="Organization Code"
                                    onChange={handleChange('siteCode')}
                                    type="text"
                                    value={values.siteCode}
                                    variant="outlined"
                                    fullWidth
                                    required
                                />
<div className="flex">
                            <FormControl variant="outlined" required className= {`${classes.formControl} makeStyles-wrapper-6 ml-0 w-49-5p`}>
                                <InputLabel  ref={inputLabel} htmlFor="outlined-age-native-simple">
                                Organization Type
                                </InputLabel> 
                                <Select
                                native
                                value={values.siteType}
                                onChange={handleChange('siteType')}
                                input={
                                    <OutlinedInput labelWidth={labelWidth} name="age" id="outlined-age-native-simple" />
                                }
                                >
                                <option value={'OTHER'}>Other</option>
                                </Select>
                            </FormControl>
                            <FormControl variant="outlined"  required className= {`${classes.formControl} makeStyles-wrapper-6 w-49-5p  mr-0`}>
                                <InputLabel  ref={inputLabel} htmlFor="outlined-age-native-simple">
                                Organization Status
                                </InputLabel> 
                                <Select
                                native
                                value={values.siteStatus}
                                onChange={handleChange('siteStatus')}
                                input={
                                    <OutlinedInput labelWidth={labelWidth} name="age" id="outlined-age-native-simple" />
                                }
                                >
                                <option value={'ACTIVE'}>Active</option>
                                <option value={'INACTIVE'}>Inactive</option>
                                </Select>
                            </FormControl>
                                </div>
                            </div>
                        )}
                        {tabValue === 1 && (
                            <div>
                              <TextField
                                    className="mt-8 mb-16"
                                    label="Address 1"
                                    autoFocus
                                    id="address1"
                                    name="siteNaddress1ame"
                                    onChange={handleChange('address1')}
                                    variant="outlined"
                                    value={values.address1}
                                    fullWidth
                                />

                                <TextField
                                    className="mt-8 mb-16"
                                    id="address2"
                                    name="address2"
                                    label="Address 2"
                                    onChange={handleChange('address2')}
                                    type="text"
                                    value={values.address2}
                                    variant="outlined"
                                    fullWidth
                                />

                                <TextField
                                    className="mt-8 mb-16"
                                    id="city"
                                    name="city"
                                    label="City"
                                    onChange={handleChange('city')}
                                    type="text"
                                    value={values.city}
                                    variant="outlined"
                                    fullWidth
                                />
                                <div className="flex">
                                <NoSsr>
                                    <AutocompleteSelect
                                    name="state"
                                    width="10"
                                    id="state" 
                                  //  classes={autocompleteclasses}
                                    classes={autocompleteclasses}
                                    styles={selectStyles}
                                    options={suggestions}
                                    components={components}
                                    TextFieldProps={{
                                        label: 'State',
                                        InputLabelProps: {
                                        shrink: true,
                                        },
                                    }}
                                    value={values.state}
                                    onChange={handleAutocompChnage} 
                                    // placeholder="Search a country (start with a)"
                                    />
                                    
                                </NoSsr>
                                <TextField
                                    className="mt-8 mb-16 m-8 w-49-5p mr-0"
                                    id="otherState"
                                    name="otherState"
                                    label="Other State"
                                    onChange={handleChange('otherState')}
                                    type="text"
                                    value={values.otherState}
                                    variant="outlined"
                                    fullWidth
                                />
                                </div>
                                <div className="flex">
                                <TextField
                                    className="mt-8 mb-16 w-49-5p m-8 ml-0"
                                    id="zipCode"
                                    name="zipCode"
                                    label="Zip Code"
                                    onChange={handleChange('zipCode')}
                                    type="text"
                                    value={values.zipCode}
                                    variant="outlined"
                                    fullWidth
                                />
                                  <NoSsr>
                                    <AutocompleteSelect
                                    name="country"
                                    width="10"
                                    id="country"
                                    classes={autocompleteclasses}
                                    styles={selectStyles}
                                    options={countrySuggestions}
                                    components={components}
                                    TextFieldProps={{
                                        label: 'Country',
                                        InputLabelProps: {
                                        shrink: true,
                                        },
                                    }}
                                    value={values.country}
                                    onChange={handleAutocompChnage}
                                    // placeholder="Search a country (start with a)"
                                    />
                                    
                                </NoSsr>
                                </div>
                                <div className="flex">
                                <TextField
                                    className="mt-8 mb-16 w-49-5p m-8 ml-0"
                                    id="workPhone"
                                    name="workPhone"
                                    label="Work Phone"
                                    onChange={handleChange('workPhone')}
                                    type="text"
                                    value={values.workPhone}
                                    variant="outlined"
                                    fullWidth
                                />
                                  <TextField
                                    className="mt-8 mb-16 w-49-5p m-8 mr-0"
                                    id="faxPhone"
                                    name="faxPhone"
                                    label="Fax"
                                    onChange={handleChange('faxPhone')}
                                    type="text"
                                    value={values.faxPhone}
                                    variant="outlined"
                                    fullWidth
                                />
                                </div>
                                <TextField
                                    className="mt-8 mb-16"
                                    id="emailAddress"
                                    name="emailAddress"
                                    label="Email"
                                    onChange={handleChange('emailAddress')}
                                    type="email"
                                    value={values.emailAddress}
                                    variant="outlined"
                                    fullWidth
                                />
                            </div>
                        )}
                       
                        
                       
                    </div>
                
            }
            
        />

    )
}

export default withReducer('ManageOrganizationApp', reducer)(AddOrganization);