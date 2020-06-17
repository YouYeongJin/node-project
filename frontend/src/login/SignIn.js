import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import ReactDOM from "react-dom";
import { getAxios } from "../common/commonUtills";

import SignUp from "./SignUp";
import DashBoard from "../main/DashBoard";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright © "}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignIn() {
    const classes = useStyles();

    const [userId, setUserId] = useState("");
    const [userPassword, setUserPassword] = useState("");

    const checkLogin = () => {
        getAxios(
            "post",
            "http://localhost:5000/login/checkLogin",
            { USER_ID: userId, USER_PW: userPassword },
            (res) => {
                if (res.data.result) {
                    alert("성공");
                    ReactDOM.render(<DashBoard />, document.getElementById("root"));
                } else {
                    alert("실패");
                }
            },
            (err) => {
                console.log(err);
                alert(err);
            }
        );
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Email Address"
                        autoComplete="email"
                        autoFocus
                        onChange={(e) => {
                            setUserId(e.target.value);
                        }}
                        value={userId}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        onChange={(e) => {
                            setUserPassword(e.target.value);
                        }}
                        value={userPassword}
                        onKeyPress={async (e) => {
                            if (e.charCode === 13) {
                                await checkLogin();
                            }
                        }}
                    />
                    <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
                    <Button fullWidth variant="contained" color="primary" className={classes.submit} onClick={checkLogin}>
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link
                                component="button"
                                variant="body2"
                                onClick={(e) => {
                                    ReactDOM.render(<SignUp />, document.getElementById("root"));
                                }}
                            >
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}
