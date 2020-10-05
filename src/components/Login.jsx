import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { Formik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
    email: yup
        .string()
        .required()
        .email()
        .label('Email'),
    password: yup
        .string()
        .label('Password')
        .required()
        .min(2, 'Password is not of required length')
        .max(20, 'Password has exceeded the maximum length'),
});
class StatesList extends React.Component {
    constructor(props) {
        super(props);
    }
    handleLogin = async (values) => {
        const BASE_URL = 'https://reqres.in/api';
        const credential = {
            email: values.email,
            password: values.password,
        }
        // const credential = {
        //     "email": "eve.holt@reqres.in",
        //     "password": "cityslicka"
        // }
        let url = '';
        if (window.location.pathname.includes('login')) {
            url = 'login';
        }
        else {
            url = 'register';
        }
        const res = await axios.get(`${BASE_URL}/${url}`, credential);
        if (res.status !== 200) {
            this.props.history.push('/home')
        }
    }
    handleRegister = () => {
        this.props.history.push('/register')
    }
    render() {

        return (
            <React.Fragment>
                {/* <CssBaseline />
                <Container maxWidth="sm">
                    <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '60vh' }} > */}
                <div className='heading'>{window.location.pathname.includes('login') ? 'Welcome Back!' : 'Register'}</div>
                <div className='main_container'>
                    <Formik
                        enableReinitialize
                        initialValues={{
                            email: '',
                            password: ''
                        }}
                        onSubmit={(values) => {
                            this.handleLogin(values)
                        }}
                        validationSchema={validationSchema}
                    >
                        {formikProps => (
                            <form onSubmit={formikProps.handleLogin}>
                                <div className='input_container'>
                                    <TextField
                                        required
                                        id="filled-required"
                                        label="Required"
                                        defaultValue="User name"
                                        variant="filled"
                                        value={formikProps.values.email}
                                        error={formikProps.errors.email && formikProps.touched.email}
                                        helperText={(formikProps.errors.email && formikProps.touched.email) && formikProps.errors.email}
                                        onChange={formikProps.handleChange('email')}
                                        onBlur={formikProps.handleBlur('email')}
                                    />
                                </div>
                                <div className='input_container'>
                                    <TextField
                                        id="filled-password-input"
                                        label="Password"
                                        type="password"
                                        autoComplete="current-password"
                                        variant="filled"
                                        value={formikProps.values.password}
                                        error={formikProps.errors.password && formikProps.touched.password}
                                        helperText={(formikProps.errors.password && formikProps.touched.password) && formikProps.errors.password}
                                        onChange={formikProps.handleChange('password')}
                                        onBlur={formikProps.handleBlur('password')}
                                    />
                                </div>
                                <Button variant="contained" color="primary" type='submit'
                                // onClick={this.handleLogin}
                                >Login</Button>
                            </form>
                        )}
                    </Formik>
                    {/* </Typography>
                </Container> */}
                    {window.location.pathname.includes('login') && <div className='register_link' onClick={this.handleRegister}>New? Register here!</div>}
                </div>
            </React.Fragment>
        );
    }
}

export default StatesList;
