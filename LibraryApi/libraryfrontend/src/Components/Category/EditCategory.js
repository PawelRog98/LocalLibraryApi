import { useEffect, useState } from "react";
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useParams } from 'react-router-dom'
import CategoryService from "./CategoryService";
import AuthorizeService from "../Authorization/AuthorizeService";

const EditCategory = ()=>{
    const [category, setCategory] = useState({id: '', categoryName: ''});
    const {id} = useParams();

    
    useEffect(()=>{
        const getCategoryData =async ()=>{
            if(id){
                var user = AuthorizeService.GetAccessToken();
                const data = await CategoryService.Get(user.token, id);
                setCategory(data);
            }
        }
        getCategoryData();
    },[id]);
    
    const handleChange = async(event)=> {
        const {name, value} = event.target;
        setCategory(state=>{
            return{
                ...state, 
                [name]:value};
        });
    };
    const handleSave = async(event)=>{
        event.preventDefault();
        var user = AuthorizeService.GetAccessToken();

        if(id){
            CategoryService.UpdateCategory(user.token,
                category.id,
                category.categoryName
                ).then(
                    console.log("ok")
                );
        }
        else{
            CategoryService.Create(user.token, category.categoryName
                ).then(
                    console.log("added")
                );
        }
        
    };
    return(
        <Form onSubmit={handleSave}>
            <FormGroup>
                <Label htmlFor="categoryName">Category Name</Label>
                <Input type="text" name="categoryName" value={category.categoryName} onChange={handleChange} required></Input>
            </FormGroup>
            <FormGroup>
                <Button type='submit'>Save</Button>
            </FormGroup>
        </Form>
    )
}
export default EditCategory;