import { useEffect, useState } from "react"
import AuthorizeService from "./AuthorizeService";
import { useSearchParams } from "react-router-dom";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";

const ResetPassword =()=>{
    const [param, setParam] = useSearchParams();
    const navigate = useNavigate();
    const [userData, setUserData] = useState({email:'',
    password: '',
    confirmPassword: '',
    resetPasswordToken:''});

    useEffect(()=>{
        populateUserParams();
    },[]);

    const handleChange = async(event)=> {
        const {name, value} = event.target;
        setUserData(state=>{
            return{
                ...state, 
                [name]:value};
        });
    };

    const populateUserParams=()=>{
        let resetPasswordTokenParam =param.get("resetPasswordToken");
        let emailParam =param.get("email");

        console.log(emailParam);
        setUserData(state=>({
            ...state,
            resetPasswordToken: resetPasswordTokenParam,
            email: emailParam
        }));
    }

    const handleSave = async(event)=>{
        event.preventDefault();

        await AuthorizeService.ResetPassword(userData).then(
            ()=>{
                alert("Your password has been changed");
                navigate("../", { replace: true });
            },
            error => {
                console.log(error.response.data);
            }
        );
        
    };

    return(
        <Form onSubmit={handleSave}>
            <FormGroup>
                <Label htmlFor="password">Password</Label>
                <Input type="password" name="password" value={userData.password} onChange={handleChange} required></Input>
            </FormGroup>
            <FormGroup>
                <Label htmlFor="confirmPassword">ConfirmPassword</Label>
                <Input type="password" name="confirmPassword" value={userData.confirmPassword} onChange={handleChange} required></Input>
            </FormGroup>
            <FormGroup>
                <Button type="submit">Send</Button>
            </FormGroup>
        </Form>
    )

}
export default ResetPassword;