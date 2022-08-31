import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import DatePicker from 'react-datepicker';
import AuthorizeService from './AuthorizeService';  
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

const Register=()=>{
    const [user, setUser] = useState({Email:"",
    FirstName:"",
    LastName:"",
    Password:"",
    ConfirmPassword:"",
    DateOfBirth: new Date()});
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
        await AuthorizeService.Register(user.Email, 
            user.FirstName,
            user.LastName,
            user.ConfirmPassword,
            user.Password,
            user.DateOfBirth).then(
            ()=>{
                console.log("ok");
                navigate("../");
                alert("Check your email box to verify your account");
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
                <Input type='email' name='Email' id='Email' value={user.Email} onChange={handleChange} required></Input>
            </FormGroup>
            <FormGroup>
                <Label htmlFor='FirstName'>First name</Label>
                <Input type='text' name='FirstName' id='FirstName' value={user.FirstName} onChange={handleChange} required></Input>
            </FormGroup>
            <FormGroup>
                <Label htmlFor='LastName'>Last name</Label>
                <Input type='text' name='LastName' id='LastName' value={user.LastName} onChange={handleChange} required></Input>
            </FormGroup>
            <FormGroup>
                <Label htmlFor='Password'>Password</Label>
                <Input type='password' name='Password' id='Password' value={user.Password} onChange={handleChange} required></Input>
            </FormGroup>
            <FormGroup>
                <Label htmlFor='ConfirmPassword'>ConfirmPassword</Label>
                <Input type='password' name='ConfirmPassword' id='ConfirmPassword' value={user.ConfirmPassword} onChange={handleChange} required></Input>
            </FormGroup>
            <FormGroup>
                <Label htmlFor='DateofBirth'>Date of birth</Label>
                <DatePicker selected={user.DateOfBirth} onChange={user.handleChange} name='DateOfBirth'></DatePicker>
            </FormGroup>
            <FormGroup>
                <Button type='submit'>Register</Button>
            </FormGroup>
        </Form>
    </div>
    )
}
export default Register;
// export class Register extends Component{
//     constructor(props){
//         super(props);
//         this.state={
//             Email: "",
//             Password:"",
//             ConfirmPassword:"",
//             DateOfBirth:new Date(),
//             Message:""
//         }
//         this.handleSubmit = this.handleSubmit.bind(this);
//         this.handleChange = this.handleChange.bind(this);
//         this.handleChangeDate = this.handleChangeDate.bind(this);
//     }
//     async handleChange(event) {
//         const value = event.target.value;
//         this.setState({ ...this.state, [event.target.name]:value });
//     }
//     async handleChangeDate(date){
//         this.setState({
//             DateOfBirth:date
//         })
//     }
//     async handleSubmit(event){
//         const navigate = this.props;
//         event.preventDefault();
//         this.setState({
//             Message:""
//         });
//         AuthorizeService.Register(this.state.Email, 
//             this.state.Password,
//             this.state.ConfirmPassword,
//             this.state.DateOfBirth).then(
//             resp=>{
//                 this.setState({
//                     Message: resp.data.Message
//                 });
//                 console.log(resp.data.Message);
//                 navigate("../");
//             },
//             error => {
//                 const errorResp = (error.response.data.Message);
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
//                         <Input type='text' name='Email' id='Email' value={this.state.Email} onChange={this.handleChange} required></Input>
//                     </FormGroup>
//                     <FormGroup>
//                         <Label htmlFor='Password'>Password</Label>
//                         <Input type='password' name='Password' id='Password' value={this.state.Password} onChange={this.handleChange} required></Input>
//                     </FormGroup>
//                     <FormGroup>
//                         <Label htmlFor='ConfirmPassword'>ConfirmPassword</Label>
//                         <Input type='password' name='ConfirmPassword' id='ConfirmPassword' value={this.state.ConfirmPassword} onChange={this.handleChange} required></Input>
//                     </FormGroup>
//                     <FormGroup>
//                         <Label htmlFor='DateofBirth'>Date of birth</Label>
//                         <DatePicker selected={this.state.DateOfBirth} onChange={this.handleChangeDate} name='DateOfBirth'></DatePicker>
//                     </FormGroup>
//                     <FormGroup>
//                         <Button type='submit'>Register</Button>
//                     </FormGroup>
//                 </Form>
//             </div>
//         );
//     }
// }