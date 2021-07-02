import React, {useEffect, useState}  from 'react';
import {Avatar, Checkbox, Icon, IconButton, Typography} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import CancelIcon from '@material-ui/icons/Cancel';
import { FusePageSimple,FuseAnimate,FuseUtils} from '@fuse';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
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
import SearchFieldWidget from './SearchFieldWidget';
//temp imports
import {showMessage} from 'app/store/actions/fuse';
////css import

import './CustomCSS.css';  
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
        margin: theme.spacing(1),
        minWidth: 120,
      },
  }));

  

function ManageOrganizationApp(props){
    const dispatch = useDispatch();
  
   
    const events = useSelector(({ManageOrganizationApp}) => ManageOrganizationApp.contacts);

    
const classes = useStyles();
const [values, setValues] = React.useState({
    organizationName:'',
    organizationCode:'',
    organizationType: 'OTHER',
    city:'',
    state:'',
    organizationStatus: 'OTHER',
    searchscreenDisabled:events.searchscreenDisabled
    
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  

useEffect(() => {    
    //dispatch(Actions.getContacts(props.match.params));
    if(values.searchscreenDisabled==false){
        dispatch(Actions.getOrganizations(props.match.params));
        dispatch(Actions.getUserData());
    }
   // dispatch(showMessage({message: 'Product Saved',variant:'success',autoHideDuration:'3000'}));
    if(events.showAddOrganizationSuccessMsg==true){
        dispatch(showMessage({message: 'Organization added successfully',variant:'success',autoHideDuration:'3000'}));
        events.showAddOrganizationSuccessMsg=false;
    }
    if(events.showAddOrganizatioErrornMsg==true){
        dispatch(showMessage({message: 'Error While Adding Organization',variant:'error',autoHideDuration:'3000'}));
        events.showAddOrganizatioErrornMsg=false;
    }
}, [dispatch, props.match.params]);


function handleReset()
{
    events.selectedRowId=0;
    events.editBtnFlagDisabled=true;
    props.history.push('/apps/organizations/');
  
}

function handleAdd()
{
    events.selectedRowId=0;
    events.editBtnFlagDisabled=true;
    
  
}




function handleSearch()
{
  console.log("value obj" +  JSON.stringify(events.searchWidgetValues));
  if(values.searchscreenDisabled==false){
    dispatch(Actions.getOrganizationsSearchBtnClick(events.searchWidgetValues));
    dispatch(Actions.getUserData());
}
  
}
function handleEditScreen (){
    
    props.history.push('/apps/organizations/addorganization/' + events.selectedRowId + '/edit');
}


    return (
        <FusePageSimple
             header={
            <div className="flex flex-1 items-center justify-between p-24">
                <div className="flex flex-col">
                
                    <Typography variant="h6">Manage Organization</Typography>
                    
                </div>
                <div className="flex btn_all">
                <Button
                    className="normal-case mx-1 btn_mrg"
                    variant="contained"
                    component="a"
                    onClick={handleSearch}
                    target="_blank"
                    
                >
                    <Icon>search</Icon>
                    Search
                </Button>
                <Button
                    className="normal-case mx-1 btn_mrg"
                    variant="contained"
                    component="a"
                    onClick={handleReset}
                    
                    
                >
                    <Icon>refresh</Icon>
                    Reset
                </Button>
                <Button
                    className="normal-case mx-1 btn_mrg"
                    variant="contained"
                    onClick={handleAdd}
                   component={Link} to="/apps/organizations/addorganization" 
                    disabled={events.addBtnFlagDisabled}
                >
                    <Icon>add</Icon>
                    Add
                </Button>
                <Button
                    className="normal-case mx-1 btn_mrg"
                    variant="contained"
                    component="a"
                    onClick={handleEditScreen}
                    disabled={events.editBtnFlagDisabled}
                >
                    <Icon>edit</Icon>
                    Edit
                </Button>
                <Button
                    className="normal-case mx-1 btn_mrg"
                    variant="contained"
                    component="a"
                    href="/apps/dashboards/analytics"
                    target="_blank"
                    disabled={events.viewBtnFlagDisabled}
                >
                    <Icon>pageview</Icon>
                    View
                </Button>
                <Button
                    className="normal-case mx-1 btn_mrg"
                    variant="contained"
                    component="a"
                    href="/apps/dashboards/analytics"
                    target="_blank"
                    disabled={events.deleteBtnFlagDisabled}
                >
                    <Icon>delete</Icon>
                    Delete
                </Button>
                    <Button
                    className="normal-case mx-1 btn_mrg"
                    variant="contained"
                    component="a"
                  //  href="/apps/dashboards/analytics"
                    component={Link} to="/apps/dashboards/analytics"
                     >
                    <CancelIcon className="mr-4">link</CancelIcon>
                    Close
                     </Button>   
                    </div>
               
            </div>
            
        }
        content={
            <React.Fragment>
                {/* <SearchFieldWidget/> */}
                <ExpansionPanel defaultExpanded>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header" 
        color="blue"
        
      >
        <Typography className={classes.expansionheading}>Search Result(s) </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>

      
                
                    <ContactsList/>
                    </ExpansionPanelDetails>
            </ExpansionPanel>
                </React.Fragment>
        
            
            }

        />

    )
}


export default withReducer('ManageOrganizationApp', reducer)(ManageOrganizationApp);