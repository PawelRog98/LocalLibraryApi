import axios from 'axios';
import { Api } from '../../config';

class TransactionService{
    async Create(token, booksToTransaction, expireDays){
        return await axios.post(Api + "transaction/create",{ booksToTransaction,
            expireDays
        },
        {
            headers:!token ? {} : {
                'Authorization': `Bearer ${token}`
            }
        }).then(
            resp=>{
                return resp.data;
            }
        )
            
    }
    async Get(id){
        return await axios.get(Api + "get/"+id,
        ).then(
        resp=>{
            return resp.data;
        }
    )
    }
    async GetAll(token, pageIndex, pageSize, email, statusId){
        return await axios.get(Api + "transaction/getall",{
            headers:!token ? {} : {
                'Authorization': `Bearer ${token}`
            },
            params:{
                pageIndex: pageIndex,
                pageSize: pageSize,
                email: email,
                statusId: statusId
            }
            }
        ).then(
        resp=>{
            console.log(resp);
            return resp;
        }
    )
    }
    async GetMy(token, pageIndex, pageSize, email, statusId){
        return await axios.get(Api + "transaction/getmy",{
            params:{
                pageIndex: pageIndex,
                pageSize: pageSize,
                email: email,
                statusId: statusId
            },
            headers:!token ? {} : {
                'Authorization': `Bearer ${token}`
        }}
        ).then(
        resp=>{
            return resp;
        }
    )
    }
    async GetStatuses(token){
        return await axios.get(Api+"transaction/getstatuses",{
            headers:!token ? {} : {
                'Authorization': `Bearer ${token}`
            }
        }).then(
            resp=>{
                return resp.data;
            }
        )
    }
    async ChangeStatus(token, id, statusId){
        return await axios.put(Api+"transaction/changestatus",{
            id,
            statusId
        },{
            headers:!token ? {} : {
                'Authorization': `Bearer ${token}`
            }
        }).then(
            resp=>{
                return resp.data;
            }
        )
    }
}
export default new TransactionService();