import React, {useState} from 'react'
import {Card, CardContent, Typography, Tabs, Tab} from '@material-ui/core';
import {darken} from '@material-ui/core/styles/colorManipulator';
import {FuseAnimate} from '@fuse';
import {Link} from 'react-router-dom';
import clsx from 'clsx';
import JWTLoginTab from './tabs/JWTLoginTab';
import FirebaseLoginTab from './tabs/FirebaseLoginTab';
import Auth0LoginTab from './tabs/Auth0LoginTab';
import {makeStyles} from '@material-ui/styles';
import './Login-css.css';  
const useStyles = makeStyles(theme => ({
    root: {
        background: 'linear-gradient(to right, ' + theme.palette.primary.dark + ' 0%, ' + darken(theme.palette.primary.dark, 0.5) + ' 100%)',
        color     : theme.palette.primary.contrastText
    }
}));

function Login()
{
    const classes = useStyles();
    const [selectedTab, setSelectedTab] = useState(0);

    function handleTabChange(event, value)
    {
        setSelectedTab(value);
    }

    return (
        <div className={clsx(classes.root, "flex flex-col flex-1 flex-shrink-0 p-24 md:flex-row md:p-0")}>

            <div className="flex flex-col flex-grow-0 items-center text-white p-16 text-center md:p-128 md:items-start md:flex-shrink-0 md:flex-1 md:text-left">

                <FuseAnimate animation="transition.expandIn">
                    <img className="w-128 mb-32" src="assets/images/logos/BayaTree_Logo_Blakc_bg.png" alt="logo"/>
                </FuseAnimate>

                <FuseAnimate animation="transition.slideUpIn" delay={300}>
                    <Typography variant="h3" color="inherit" className="font-light">
                        Welcome to the {process.env.REACT_APP_PROJECT_NAME}!
                    </Typography>
                </FuseAnimate>

                {/* <FuseAnimate delay={400}>
                    <Typography variant="subtitle1" color="inherit" className="max-w-512 mt-16">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ullamcorper nisl erat, vel convallis elit fermentum pellentesque. Sed mollis velit
                        facilisis facilisis.
                    </Typography>
                </FuseAnimate> */}
            </div>

            <FuseAnimate animation={{translateX: [0, '100%']}}>

                <Card className="w-full max-w-400 mx-auto m-16 md:m-0" square>

                    <CardContent className="flex flex-col items-center justify-center p-32 md:p-48 md:pt-128 ">

                        <Typography variant="h6" className="text-center md:w-full mb-48">LOGIN TO YOUR ACCOUNT</Typography>

                        <Tabs
                            value={selectedTab}
                            onChange={handleTabChange}
                            variant="fullWidth"
                            className="mb-32 borderAdjst"
                        >
                            <Tab
                                icon={<img className="h-40 p-4 rounded-12" src="assets/images/logos/bayatreeSmallLogo.png" alt="firebase"/>}
                                className="min-w-0"
                                label="EDM"
                            />
                            {/* <Tab
                                icon={<img className="h-40" src="assets/images/logos/samlSmallLogo.png" alt="firebase"/>}
                                className="min-w-0"
                                label="SAML"
                            /> */}
                            {/* <Tab
                                icon={<img className="h-40" src="assets/images/logos/auth0.svg" alt="auth0"/>}
                                className="min-w-0"
                                label="Auth0"
                            /> */}
                        </Tabs>

                        {selectedTab === 0 && <JWTLoginTab/>}
                        {selectedTab === 1 && <FirebaseLoginTab/>}
                        {selectedTab === 2 && <Auth0LoginTab/>}

                        <div className="flex flex-col items-center justify-center pt-32">
                            <span><Link className="font-medium" to="/register" value>{process.env.REACT_APP_FORGOT_USERNAME_LABEL}</Link>
                            <span className="px-2">/</span>
                            <Link className="font-medium mt-8" to="/apps/rmsForgetPasswordEsign">{process.env.REACT_APP_FORGOT_PASSWRD_ESIGN_LABEL}</Link></span>
                            <Link className="font-medium mt-8" to="/">{process.env.REACT_APP_CONTACT_US_LABEL}</Link>
                        </div>
                        <FuseAnimate delay={400}>
                    <Typography variant="subtitle1" color="inherit" className="justify-center text-center text-14 sm\:my-10">
                    Best viewed using the most current versions of the following browsers: Internet Explorer, Google Chrome, Mozilla Firefox.
                    </Typography>
                </FuseAnimate> 

                    </CardContent>
                </Card>
            </FuseAnimate>
           
        </div>
    )
}

export default Login;
