import { useEffect, useState } from "react"
import { Button } from "reactstrap";
import AuthorizeService from "../Authorization/AuthorizeService"

const AdminDashboard = ()=>{
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [isDisabled, setEnable] = useState([false]);

    useEffect(()=>{
        populateRolesData();
        populateUserData();
    },[]);

    const populateUserData = async ()=>{
        var user = AuthorizeService.GetAccessToken();
        if(user){
            const data =await AuthorizeService.GetUsers(user.token);
            setUsers(data);
            
        }
    }

    const populateRolesData = async ()=>{
        var user = AuthorizeService.GetAccessToken();
        if(user){
            const data = await AuthorizeService.GetRoles(user.token);
            setRoles(data);
        }
    }

    const handleChange = async(event, i)=> {
        const data = [...users];
        const enableButton = [...isDisabled];

        enableButton[i]=true;
        data[i][event.target.name] = event.target.value;
        console.log(data);
        setUsers(data);
        console.log(data);
        setEnable(enableButton);
    }

    const handleChangeRole = async(idUser, idRole)=>{
        var user = AuthorizeService.GetAccessToken();
        const conf = window.confirm("Are you sure?");

        console.log(idRole);
        console.log(idUser);
        if(conf){
            await AuthorizeService.ChangeRole(user, idUser, idRole).then(
                resp=>{
                    console.log(resp.data);
                }
                ).catch(
                error=>{
                    console.log(error.data);
                });
        }
    }

    const handleSuspend = async (event, id) =>{
        event.preventDefault();
        const conf = window.confirm("Are you sure?");
        if(conf)
        {
            var user = AuthorizeService.GetAccessToken();
            await AuthorizeService.SuspendUser(user.token, id).then(
                resp=>{
                    console.log(resp);
                    window.location.reload();
                }
            ).catch(
            error=>{
                console.log(error.data);
            }
        )
        }
    }
    return(
        <table className='table table-striped' aria-labelledby="tabelLabel">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>User Email</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Role Name</th>
                    <th>Save role button</th>
                    <th>Ban button</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user,i) =>
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.email}</td>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td>
                            <select name="roleId" value={user.roleId} onChange={(event)=>handleChange(event, i)}>
                                {roles.map(role=>(
                                    <option key={role.id} value={role.id}>{role.roleName}</option>))}
                            </select>
                        </td>
                        <td><Button type="button" color="primary" id={i} disabled={!isDisabled[i]} onClick={()=>handleChangeRole(user.id, user.roleId)}>Save role</Button></td>
                        <td><Button type="button" color="danger" id={i} onClick={(event)=>handleSuspend(event, user.id)}>
                            {user.isSuspended===false ? "Suspend":"Un-suspend"}</Button></td>
                    </tr>)}
            </tbody>
        </table>
    );
}
export default AdminDashboard;