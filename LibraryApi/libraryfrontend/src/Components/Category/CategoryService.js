import axios from 'axios'

const Api = "https://localhost:7138/api/category/";
class CategoryService{
    async Create(token, CategoryName){
        return await axios.post(Api + "create",{
            CategoryName
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
    async Get(token, id){
        return await axios.get(Api+"get/"+id,{
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
    async GetCategories(pageIndex, pageSize, categoryName){
        return await axios.get(Api + "getall",{
            params:{
                pageIndex: pageIndex,
                pageSize: pageSize,
                categoryName: categoryName
            }}
            ).then(
            resp=>{
                return resp;
            }
        )
    }
    async UpdateCategory(token, id, categoryName){
        return await axios.put(Api+"update",{
            id,
            categoryName
        },
        {
            headers:!token ? {} : {
                'Authorization': `Bearer ${token}`
            }
        }).then(
            resp=>{
                return resp.status;
            }
        )
    }
    async RemoveCategory(token, id){
        return await axios.delete(Api+"remove/"+id,{
            headers:!token ? {} : {
                'Authorization': `Bearer ${token}`
            }
        }).then(
            resp=>{
                return resp.status;
            }
        )
    }
}
export default new CategoryService();