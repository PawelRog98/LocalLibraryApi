import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Col, Form, FormGroup, Input, Label, Pagination, PaginationItem, PaginationLink, Row } from "reactstrap";
import AuthorizeService from "../Authorization/AuthorizeService";
import CategoryService from "./CategoryService";

const Categories=()=>{
    const [categories, setCategories] = useState([]);
    const [paging, setPaging] = useState({PageIndex: 1,
        PageSize: 2,
        HasNext: false,
        HasPrevious: false,
        TotalPages:''
    });
    const [parameters, setParameters] = useState({
        categoryName:''
    });

    useEffect(()=>{
        populateCategoryData();
    },[]);

    const populateCategoryData= async(pageIndex, pageSize, categoryName) =>{
        var user=AuthorizeService.GetAccessToken();
        if(user){
            const response = await CategoryService.GetCategories(pageIndex, pageSize, categoryName);
            var header = JSON.parse(response.headers["x-pagination"]);
            console.log(response);
            setCategories(response.data);
            setPaging(header);
        }
    }
    const handleRemove = async (event, id) =>{
        event.preventDefault();
        const conf = window.confirm("Are you sure?");
        if(conf)
        {
            var user = AuthorizeService.GetAccessToken();
            await CategoryService.RemoveCategory(user.token, id).then(
                resp=>{
                    console.log(resp);
                    setCategories(categories.filter(i=>i.id !==id));
                    
                }
            ).catch(
            error=>{
                console.log(error.data);
            }
        )
        }
    }
    const handleChange = async(event)=> {
        const {name, value} = event.target;
        setParameters(state=>{
            return{
                ...state, 
                [name]:value};
        });
    };
    const toPage=async(event, pageIndex, pageSize, categoryName)=>{
        event.preventDefault();
        await populateCategoryData(pageIndex, pageSize, categoryName);
    }
    return(
        <React.Fragment>
            <Form className='searchbox'>
                    <Row>
                    <Label>Search your category!</Label>
                        <Col>
                            <FormGroup>
                                <Input type='text' name="categoryName" value={parameters.categoryName} onChange={handleChange} placeholder="Write category name" required></Input>
                            </FormGroup>
                        </Col>
                        <Col md={2}>
                            <FormGroup>
                                <Button type='button' color='primary' onClick={()=>populateCategoryData(1, paging.PageSize, parameters.categoryName)}>Search</Button>
                            </FormGroup>
                        </Col>
                    </Row>
                </Form>
        <Button type="button" color="primary" tag={Link} to={"/Category/EditCategory/"}>Create new</Button>
        <table className='table table-striped' aria-labelledby="tabelLabel">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Category Name</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {categories.length>0 &&
                categories.map(category=>
                    <tr key={category.id}>
                        <td>{category.id}</td>
                        <td>{category.categoryName}</td>
                        <td><Button type="button" color="success" tag={Link} to={"/Category/EditCategory/"+category.id}>Edit</Button></td>
                        <td><Button type="button" color="danger" onClick={(event)=>handleRemove(event, category.id)}>Delete</Button></td>
                    </tr>
                )}
            </tbody>
        </table>
        <Pagination className='pagination'>
                <PaginationItem disabled={!paging.HasPrevious}>
                    <PaginationLink onClick={(event)=>toPage(event, paging.PageIndex-1, paging.PageSize)} previous/>
                </PaginationItem>
                {paging.PageIndex-1>0 &&
                <PaginationItem>
                    <PaginationLink onClick={(event)=>toPage(event, paging.PageIndex-1, paging.PageSize)}>{paging.PageIndex-1}</PaginationLink>
                </PaginationItem>}
                <PaginationItem active>
                    <PaginationLink>{paging.PageIndex}</PaginationLink>
                </PaginationItem>
                {paging.PageIndex < paging.TotalPages &&
                <PaginationItem>
                    <PaginationLink onClick={(event)=>toPage(event, paging.PageIndex+1, paging.PageSize)}>{paging.PageIndex+1}</PaginationLink>
                </PaginationItem>}
                <PaginationItem disabled={!paging.HasNext}>
                    <PaginationLink onClick={(event)=>toPage(event, paging.PageIndex+1, paging.PageSize)} next/>
                </PaginationItem>
            </Pagination>
        </React.Fragment>
    )
}
export default Categories;