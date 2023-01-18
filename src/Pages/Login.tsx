import React, {FC} from "react"
import {
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    Grid,
    TextField,
    Typography
} from "@mui/material";
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {loginTC} from "../Store/Reducers/LoginReducer";
import {RootState} from "../Store/Store";
import {Navigate} from "react-router-dom";

export const Login: FC = () => {
    const isLoggedIn = useSelector<RootState, boolean>(state => state.auth.isLoggedIn)

    const dispatch = useDispatch()
    const formik = useFormik({
        validate: (values) => {
            if (!values.email) {
                return {
                    email: "Email is required"
                }
            }
            if (!values.password) {
                return {
                    password: "Password is required"
                }
            }

        },
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        onSubmit: values => {
            // @ts-ignore
            dispatch(loginTC(values))
        },
    });
    if (isLoggedIn) return <Navigate to={"/todo-lists"}/>
    return (
        <Grid container justifyContent={"center"}>
            <Grid item xs={4}>
                <form onSubmit={formik.handleSubmit}>
                    <FormControl>
                        <FormLabel>
                            <Typography>To log in register {<a href={"https://social-network.samuraijs.com"}
                                                               target={"_blank"}
                                                               rel={"noreferrer"}>here</a>}</Typography>
                            <Typography>or use common test account credentials:</Typography>
                            <Typography>Email: free@samuraijs.com</Typography>
                            <Typography>Password:free</Typography>
                        </FormLabel>
                        <FormGroup>
                            <TextField
                                label={"Email"}
                                margin={"normal"}
                                {...formik.getFieldProps("email")}
                            />
                            {formik.errors.email && <div>{formik.errors.email}</div>}
                            <TextField
                                label={"Password"}
                                margin={"normal"}
                                type={"password"}
                                {...formik.getFieldProps("password")}
                            />
                            {formik.errors.password && <div>{formik.errors.password}</div>}
                            <FormControlLabel control={<Checkbox
                                {...formik.getFieldProps("rememberMe")} checked={formik.values.rememberMe}/>}
                                              label={"Remember me"}/>
                            <Button type={"submit"} variant={"contained"} color={"primary"}>Login</Button>
                        </FormGroup>
                    </FormControl>
                </form>
            </Grid>
        </Grid>
    )
}