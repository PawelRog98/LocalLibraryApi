import { Component, useEffect, useState } from "react";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";
import DatePicker from 'react-datepicker';
import AuthorizeService from './AuthorizeService';  
import {withRouter}  from '../withRouter';

const EditAccount =()=>{
    const [userData, setUserData] = useState({Email:"",
    FirstName: "",
    LastName: "",
    DateOfBirth: new Date(),
    Message:""});
    const [message, setMessage] = useState('');

    useEffect(()=>{
        populateUserData();
    },[]);

    const populateUserData = async()=>{
        var user = AuthorizeService.GetAccessToken();
        if(user){
            var userData = await AuthorizeService.GetUserData(user.token);

            setUserData(userData);
        }
    }

    const handleChange = async(event)=> {
        const {name, value} = event.target;
        setUserData(state=>{
            return{
                ...state, 
                [name]:value};
        });
    };

    const handleSubmit = async(event)=>{
        var user = AuthorizeService.GetAccessToken();

        event.preventDefault();
        await AuthorizeService.UpdateUserData(user.token,
            userData.FirstName,
            userData.LastName,
            userData.DateOfBirth).then(
                resp=>{
                    setMessage(resp.data);
                    console.log(resp.data);
                },
                error => {
                    const errorResp = (error.response.data);
                    setMessage(errorResp);
                }
            );
    }
    return(
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <Label htmlFor="FirstName">FirstName</Label>
                <Input type="text" name="FirstName" value={userData.FirstName} onChange={handleChange} required></Input>
            </FormGroup>
            <FormGroup>
                <Label htmlFor="LastName">LastName</Label>
                <Input type="text" name="LastName" value={userData.LastName} onChange={handleChange} required></Input>
            </FormGroup>
            <FormGroup>
                <Label htmlFor='DateofBirth'>Date of birth</Label>
                <DatePicker selected={userData.DateOfBirth} onChange={handleChange} name='DateOfBirth' dateFormat="dd/MM/yyyy"></DatePicker>
            </FormGroup>
            <FormGroup>
                <Button type='submit'>Save</Button>
            </FormGroup>
        </Form>
    )

}
export default EditAccount;
// class EditAccount extends Component{
//     constructor(props){
//         super(props);
//         this.state={
//             Email:"",
//             FirstName: "",
//             LastName: "",
//             DateOfBirth: new Date(),
//             Message:""
//         }
//         this.handleSubmit=this.handleSubmit.bind(this);
//         this.handleChange = this.handleChange.bind(this);
//         this.handleChangeDate = this.handleChangeDate.bind(this);
//     }
//     async componentDidMount(){
//         var token = AuthorizeService.GetAccessToken();
//         const userData = await AuthorizeService.GetUserData(token);
//         this.setState({
//             FirstName: userData.firstName,
//             LastName: userData.lastName,
//             DateOfBirth: new Date(userData.dateOfBirth)
//         });
//         console.log(new Date(userData.dateOfBirth));
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
//         var token = AuthorizeService.GetAccessToken();

//         event.preventDefault();
//         AuthorizeService.UpdateUserData(token,
//             this.state.FirstName,
//             this.state.LastName,
//             this.state.DateOfBirth).then(
//                 resp=>{
//                     this.setState({
//                         Message: resp.data.Message
//                     });
//                     console.log(resp.data.Message);
//                     this.props.navigate("../");
//                 },
//                 error => {
//                     const errorResp = (error.response.data.Message);
//                     this.setState({
//                         Message:errorResp
//                     });
//                 }
//             );
//     }
    
//     render(){
//         return(
//             <Form onSubmit={this.handleSubmit}>
//                 <FormGroup>
//                     <Label htmlFor="FirstName">FirstName</Label>
//                     <Input type="text" name="FirstName" value={this.state.FirstName} onChange={this.handleChange} required></Input>
//                 </FormGroup>
//                 <FormGroup>
//                     <Label htmlFor="LastName">LastName</Label>
//                     <Input type="text" name="LastName" value={this.state.LastName} onChange={this.handleChange} required></Input>
//                 </FormGroup>
//                 <FormGroup>
//                     <Label htmlFor='DateofBirth'>Date of birth</Label>
//                     <DatePicker selected={this.state.DateOfBirth} onChange={this.handleChangeDate} name='DateOfBirth' dateFormat="dd/MM/yyyy"></DatePicker>
//                 </FormGroup>
//                 <FormGroup>
//                     <Button type='submit'>Save</Button>
//                 </FormGroup>
//             </Form>
//         )
//     }
// }
// export default withRouter(EditAccount);