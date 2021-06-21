import React, {useEffect, useState} from 'react';
import {Avatar, Checkbox, Icon, IconButton, Typography} from '@material-ui/core';
import {FuseUtils, FuseAnimate} from '@fuse';
import {useDispatch, useSelector} from 'react-redux';
import ReactTable from "react-table";
import * as Actions from './store/actions';
import _ from '@lodash';

function ContactsList(props)
{
    const dispatch = useDispatch();
    const contacts = useSelector(({ManageOrganizationApp}) => ManageOrganizationApp.contacts.entities);
    const selectedContactIds = useSelector(({ManageOrganizationApp}) => ManageOrganizationApp.contacts.selectedContactIds);
    const searchText = useSelector(({ManageOrganizationApp}) => ManageOrganizationApp.contacts.searchText);
    const user = useSelector(({ManageOrganizationApp}) => ManageOrganizationApp.user);
    const searchOrganizationState = useSelector(({ManageOrganizationApp}) => ManageOrganizationApp.contacts);
    const [filteredData, setFilteredData] = useState(null);
    const [selectedRowInfo, setselectedRowInfo] = useState(null);
    const [selectedRowIndex, setselectedRowIndex] = useState(null);
    

    useEffect(() => {
        function getFilteredArray(entities, searchText)
        {
            console.log("grid data before" + JSON.stringify(entities));
            
            //console.log("reducer sortdata before" + JSON.stringify(_.orderBy(action.payload,['siteId'],['asc']) ));
            const arr = Object.keys(entities).map((id) => entities[id]);
            const descSortEntities =_.orderBy(arr,['siteId'],['desc']) ;
            console.log("grid data after" +JSON.stringify(arr));
            if ( searchText.length === 0 )
            {
                return descSortEntities;
            }
            return FuseUtils.filterArrayByString(descSortEntities, searchText);
        }

        if ( contacts )
        {
            setFilteredData(getFilteredArray(contacts, searchText));
        }
    }, [contacts, searchText]);

   
    if ( !filteredData )
    {
        return null;
    }

    if ( filteredData.length === 0 )
    {
       
        return (
            <div className="flex flex-1 items-center justify-center h-full">
                <Typography color="textSecondary" variant="h5">
                    There are no Organizations!
                </Typography>
            </div>
        );
    }
   
    return (
        <FuseAnimate animation="transition.slideUpIn" delay={300}>
            <ReactTable
                className="-striped -highlight h-full sm:rounded-16 overflow-hidden"
                getTrProps={(state, rowInfo, column) => {
                const index =    rowInfo ? rowInfo.index : -1;
                    return {
                        className: "cursor-pointer",
                       
                        onClick  : (e, handleOriginal) => {
                            if ( rowInfo )
                            {
                               dispatch(Actions.enableEditZone(rowInfo.original));
                               setselectedRowIndex(rowInfo.index);
                               setselectedRowInfo(rowInfo.original);
                               searchOrganizationState.editBtnFlagDisabled=false;
                               
                            }
                        },
                        style: {
                            background: selectedRowIndex== index? '#00afec' : 'white',
                            color: selectedRowIndex== index ? 'white' : 'black'
                        }
                        
                        
                    }
                }}
                data={filteredData}
                columns={[
                    {
                        Header   : () => (
                            <Checkbox
                                onClick={(event) => {
                                    event.stopPropagation();
                                }}
                                onChange={(event) => {
                                    event.target.checked ? dispatch(Actions.selectAllContacts()) : dispatch(Actions.deSelectAllContacts());
                                }}
                                checked={selectedContactIds.length === Object.keys(contacts).length && selectedContactIds.length > 0}
                                indeterminate={selectedContactIds.length !== Object.keys(contacts).length && selectedContactIds.length > 0}
                            />
                        ),
                        accessor : "",
                        Cell     : row => {
                            return (<Checkbox
                                    onClick={(event) => {
                                        event.stopPropagation();
                                    }}
                                    checked={selectedContactIds.includes(row.value.id)}
                                    onChange={() => dispatch(Actions.toggleInSelectedContacts(row.value.id))}
                                />
                            )
                        },
                        className: "justify-center",
                        sortable : false,
                        width    : 64
                    },
                    {
                        Header   : () => (
                            selectedContactIds.length > 0 && (
                                <Icon/>
                            )
                        ),
                        accessor : "avatar",
                        Cell     : row => (
                            <Avatar className="mr-8" alt={row.original.siteName} src={row.value}/>
                        ),
                        className: "justify-center",
                        width    : 80,
                        sortable : false
                    },
                    {
                        Header    : "Organization Name",
                        accessor  : "siteName",
                        className: "justify-center",
                        filterable: true,
                        className : "font-bold",
                        width : 150
                    },
                    {
                        Header    : "Organization Code",
                        accessor  : "siteCode",
                        className: "justify-center",
                        filterable: true,
                        className : "font-bold",
                        width : 150
                    },
                    {
                        Header    : "Organization Type",
                        accessor  : "siteType",
                        className: "justify-center",
                        filterable: true,
                        width : 150
                    },
                    {
                        Header    : "City",
                        accessor  : "city",
                        className: "justify-center",
                        filterable: true,
                        width : 150
                    },
                    {
                        Header    : "State",
                        accessor  : "state",
                        className: "justify-center",
                        filterable: true,
                        width : 150
                    },
                    {
                        Header    : "Organization Status",
                        accessor  : "siteStatus",
                        className: "justify-center",
                        filterable: true,
                        width : 150
                    },
                    {
                        Header: "Operations",
                        width : 170,
                        Cell  : row => (
                            <div className="flex items-center">
                                {/* <IconButton
                                    onClick={(ev) => {
                                        ev.stopPropagation();
                                        dispatch(Actions.toggleStarredContact(row.original.id))
                                    }}
                                >
                                    {user.starred && user.starred.includes(row.original.id) ? (
                                        <Icon>star</Icon>
                                    ) : (
                                        <Icon>star_border</Icon>
                                    )}
                                </IconButton> */}
                                <IconButton
                                    onClick={(ev) => {
                                        ev.stopPropagation();
                                        dispatch(Actions.removeContact(row.original.id));
                                    }}
                                >
                                    <Icon>edit</Icon>
                                </IconButton>
                                <IconButton
                                    onClick={(ev) => {
                                        ev.stopPropagation();
                                        dispatch(Actions.removeContact(row.original.id));
                                    }}
                                >
                                    <Icon>pageview</Icon>
                                </IconButton>
                                <IconButton
                                    onClick={(ev) => {
                                        ev.stopPropagation();
                                        dispatch(Actions.removeContact(row.original.id));
                                    }}
                                >
                                    <Icon>delete</Icon>
                                </IconButton>
                            </div>
                        )
                    }
                ]}
                defaultPageSize={10}
                noDataText="No contacts found"
            />
        </FuseAnimate>
    );
}

export default ContactsList;
