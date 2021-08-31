import React, { useEffect } from "react";
import withReducer from "app/store/withReducer";
import reducer from "./store/reducers";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "./store/actions";
import { FusePageSimple } from "@fuse";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import { Link } from "react-router-dom";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Form from "../FormComponents/Form/Form";

function ManageQuestionnaireApp() {
  const dispatch = useDispatch();

  const events = useSelector(
    ({ ManageQuestionnaireApp }) => ManageQuestionnaireApp.questionnaire
  );

  useEffect(() => {
    dispatch(Actions.getFormData());
  }, [dispatch]);

  if (events.formFieldData === "") {
    return <p>Loading profile...</p>;
  }

  return (
    <FusePageSimple
      header={
        <div className="flex flex-1 items-center justify-between p-24">
          <div className="flex flex-col">
            <Typography variant="h6">Manage Questionnaires</Typography>
          </div>
          <div className="flex btn_all">
            <Button
              className="normal-case mx-1 btn_mrg"
              variant="contained"
              component="a"
              //  href="/apps/dashboards/analytics"
              component={Link}
              to="/apps/dashboards/analytics"
            >
              <CancelIcon className="mr-4">link</CancelIcon>
              Close
            </Button>
          </div>
        </div>
      }
      content={
        <React.Fragment>
          <ExpansionPanel defaultExpanded>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              color="blue"
            ></ExpansionPanelSummary>

            <ExpansionPanelDetails>
              <Form formFieldData={events.formFieldData}></Form>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </React.Fragment>
      }
    />
  );
}
export default withReducer(
  "ManageQuestionnaireApp",
  reducer
)(ManageQuestionnaireApp);
