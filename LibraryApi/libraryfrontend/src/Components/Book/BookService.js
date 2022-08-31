import axios from 'axios'

const Api = "https://localhost:7138/api/book/";
class BookService{
    async Create(token, formData){
        return await axios.post(Api + "create",
        formData,
        {
            headers:!token ? {} : {
                'Authorization': `Bearer ${token}`,
                'content-type': 'multipart/form-data'
            }
        }).then(
            resp=>{
                return resp.data;
            }
        )
            
    }
    async Update(token, formData){
        return await axios.put(Api + "update",
        formData,
        {
            headers:!token ? {} : {
                'Authorization': `Bearer ${token}`,
                'content-type': 'multipart/form-data'
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
    async GetAll(pageIndex, pageSize, bookName, categoryId){
        return await axios.get(Api + "getall",{
            params:{
                pageIndex: pageIndex,
                pageSize: pageSize,
                bookName: bookName,
                categoryId: categoryId
            }}
        ).then(
        resp=>{
            return resp;
        }
    )
    }
}
export default new BookService();