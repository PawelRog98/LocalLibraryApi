import React, { Component, useState } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import AuthorizeService from './AuthorizeService';  
import {withRouter}  from '../withRouter';
import { Link, useNavigate } from "react-router-dom";


const Login=()=>{
    const [user, setUser] = useState({Email:"",
    Password:""});
    const [message, setMessage] = useState('');
    let navigate = useNavigate();

    const handleChange = async(event)=> {
        const {name, value} = event.target;
        setUser(state=>{
            return{
                ...state, 
                [name]:value};
        });
    };

    const handleSubmit=async(event)=>{
        event.preventDefault();
        setMessage(null);
        await AuthorizeService.Login(user.Email, user.Password).then(
            ()=>{
                console.log("ok");
                navigate("../");
                window.location.reload();
            },
            error => {
                console.log(error.response.data);
                const errorResp = (error.response.data);
                setMessage(errorResp);
            }
        );

    }
    return(
        <div>
            <Form className='loginbox' onSubmit={handleSubmit}>
                {message &&(
                    <FormGroup>
                        <Label>{message}</Label>
                    </FormGroup>
                )}
                    <FormGroup>
                        <Label htmlFor='Email'>Email</Label>
                        <Input type='email' name='Email' id='Email' value={user.Email} onChange={handleChange} placeholder="Email" required></Input>
                    </FormGroup>
                    <FormGroup >
                        <Label htmlFor='Password'>Password</Label>
                        <Input type='password' name='Password' id='Password' value={user.Password} onChange={handleChange} placeholder="Password" required></Input>
                    </FormGroup>
                    <FormGroup>
                        <Link to={"../Authorization/ForgotPassword"}>Forgot my password</Link>{" "}
                        <Button type='submit'>Login</Button>
                    </FormGroup>
                </Form>
            </div>
    )
}
export default Login;
// class Login extends Component{
//     constructor(props){
//         super(props);

//         this.state={
//             Email:"",
//             Password:"",
//             Message:""
//         };

//         this.handleChange = this.handleChange.bind(this);
//         this.handleSubmit = this.handleSubmit.bind(this);
//     }

//     async handleChange(event) {
//         const value = event.target.value;
//         this.setState({ ...this.state, [event.target.name]:value });
//     }
//     handleSubmit(event){
//         event.preventDefault();
//         this.setState({
//             Message:""
//         });
//         AuthorizeService.Login(this.state.Email, this.state.Password).then(
//             ()=>{
//                 console.log("ok");
//                 this.props.navigate("../");
//                 window.location.reload();
//             },
//             error => {
//                 console.log(error.response.data);
//                 const errorResp = (error.response.data);
//                 this.setState({
//                     Message:errorResp
//                 });
//             }
//         );

//     }
//     render(){
//         return(
//             <div>
//                 <Form className='loginbox' onSubmit={this.handleSubmit}>
//                 {this.state.Message &&(
//                     <FormGroup>
//                         <Label>{this.state.Message}</Label>
//                     </FormGroup>
//                 )}
//                     <FormGroup>
//                         <Label htmlFor='Email'>Email</Label>
//                         <Input type='email' name='Email' id='Email' value={this.state.Email} onChange={this.handleChange} placeholder="Email" required></Input>
//                     </FormGroup>
//                     <FormGroup >
//                         <Label htmlFor='Password'>Password</Label>
//                         <Input type='password' name='Password' id='Password' value={this.state.Password} onChange={this.handleChange} placeholder="Password" required></Input>
//                     </FormGroup>
//                     <FormGroup>
//                         <Link to={"../Authorization/ForgotPassword"}>Forgot my password</Link>{" "}
//                         <Button type='submit'>Login</Button>
//                     </FormGroup>
//                 </Form>
//             </div>
//         );
//     }
// }
// export default withRouter(Login);