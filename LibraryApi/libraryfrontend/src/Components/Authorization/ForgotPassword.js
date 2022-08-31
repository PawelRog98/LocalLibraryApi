import { useEffect, useState } from "react"
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import AuthorizeService from "./AuthorizeService";

const ForgotPassword = ()=>{
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleChange = async(event)=>{
        setEmail(event.target.value);
    }

    const handleSubmit = async(event)=>{
        event.preventDefault();
        await AuthorizeService.SendVerificationEmail(email).then(
            ()=>{
                alert("Message with verification link has been sent! Check your mailbox.");
                navigate("../", { replace: true });
            },
            error => {
                console.log(error.response.data);
            }
        );
    }
    return(
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <Label htmlFor="email">Write here your email</Label>
                <Input type="text" name="email" value={email} onChange={handleChange} required></Input>
            </FormGroup>
            <FormGroup>
                <Button type="submit">Send</Button>
            </FormGroup>
        </Form>
    )
}
export default ForgotPassword;