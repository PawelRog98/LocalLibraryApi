import axios from 'axios'

const Api = "https://localhost:7138/api/account/";
class AuthorizeService{
    async Register(Email, FirstName, LastName, Password, ConfirmPassword, DateOfBirth){
        return await axios.post(Api + 'register',{
            Email,
            FirstName,
            LastName,
            Password,
            ConfirmPassword,
            DateOfBirth
        })
    }
    async Login(Email, Password){
        return await axios.post(Api + 'login',{
            Email,
            Password
        })
        .then(resp=>{
            if(resp.data){
                console.log(resp.data);
                sessionStorage.setItem("user", JSON.stringify(resp.data));
            }
            return resp.data;
        });
    }
    Logout(){
        sessionStorage.removeItem('user');
    }
    async GetUserData(token){
        return await axios.get(Api + 'get',{
            headers:!token ? {} : {
                'Authorization': `Bearer ${token}`
            }
        }).then(
            resp=>{
                console.log(resp.data);
                return resp.data;
            }
        )
    }
    async UpdateUserData(token, FirstName, LastName, DateOfBirth){
        return await axios.put(Api + 'update',{
            FirstName,
            LastName,
            DateOfBirth,
        },
        {
            headers:!token ? {} : {
                'Authorization': `Bearer ${token}`
            }
        });
    }
    GetAccessToken(){
        return JSON.parse(sessionStorage.getItem('user'));
    }
    IsAuthorized(){
        var token = this.GetAccessToken();
        if(token){
            return true;
        }else{
            return false;
        }
    }

    ///Admin
    async GetUsers(token){
        return await axios.get(Api + "getall",{
            headers:!token ? {} : {
                'Authorization': `Bearer ${token}`
            }
    }).then(
        resp=>{
            //console.log(resp);
            return resp.data;
        }
    )
    }
    async SuspendUser(token, id){
        return await axios.put(Api+"suspend/"+id,{},
        {
            headers:!token ? {} : {
                'Authorization': `Bearer ${token}`
            }
        });
    }
    async GetRoles(token){
        return await axios.get(Api + "getroles",{
            headers:!token ? {} : {
                'Authorization': `Bearer ${token}`
            }
    }).then(
        resp=>{
            //console.log(resp);
            return resp.data;
        }
    )
    }
    async ChangeRole(token, idUser, idRole){
        return await axios.put(Api+"changerole",{
            idUser,
            idRole
        },
        {
            headers:!token ? {} : {
                'Authorization': `Bearer ${token}`
            }
        });
    }
    async SendVerificationEmail(email){
        return await axios.put(Api+"forgotpassword",{},{
            params:{
                email: email
            }
        }).then(
            resp=>{
                return resp.data;
            }
        );
    }
    async ResetPassword(userData){
        return await axios.put(Api+"resetpassword",userData).then(
            resp =>{
                return resp.data;
            }
        )
    }
}
export default new AuthorizeService();