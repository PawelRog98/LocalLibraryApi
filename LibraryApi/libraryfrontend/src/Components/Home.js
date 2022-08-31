import { Button, Col, Form, FormGroup, Input, Label, Pagination, PaginationItem, PaginationLink, Row } from 'reactstrap';
import {  useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { Card,  CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import BookService from './Book/BookService';
import CategoryService from './Category/CategoryService';
import { ApiStaticFiles } from '../config';
import useLibraryContext from '../UseLibraryContext';

const Home =()=>{

    const {setCartItems} = useLibraryContext();
    const [Books, setBooks] = useState([]);
    const [categories, setCategories] = useState([]);
    const [paging, setPaging] = useState({PageIndex: 1,
        PageSize: 20,
        HasNext: false,
        HasPrevious: false,
        TotalPages:''
    });

    const [booksInCart, setBooksInCart] = useState([]);

    const [parameters, setParameters] = useState({
        BookName:'',
        categoryId:''
    })
    useEffect(()=>{
        populateBooksData();
        populateCategoriesData();
        const populateCartData = async()=>{
            var cart = JSON.parse(sessionStorage.getItem("cart"));
            if(cart){
                setBooksInCart(cart);
            }
        }
        populateCartData();
        
    },[]);

    const populateBooksData = async(pageIndex, pageSize, bookName, categoryId)=>{
        if(categoryId==="Default"){
            categoryId=null;
        }
        var response = await BookService.GetAll(pageIndex, pageSize, bookName, categoryId);
        var header = JSON.parse(response.headers["x-pagination"]);

        setBooks(response.data);
        setPaging(header);
        console.log(header);
    }

    const populateCategoriesData = async()=>{
        const response = await CategoryService.GetCategories();
        setCategories(response.data);
    }

    const addItemToSession =(book)=>{
        const newBook ={
            id: book.id,
            bookName: book.bookName, 
            author: book.author,
            publicationYear: book.publicationYear,
            publisher: book.publisher,
            isbn: book.isbn,
            pageNumber: book.pageNumber,
            description: book.description,
            numberOfCopies: book.numberOfCopies,
            categoryId: book.categoryId,
            image: book.image
        }

        const filteredBooks = booksInCart.filter(b=>b.id!==newBook.id);
        setBooksInCart([...filteredBooks,newBook]);
        sessionStorage.setItem("cart",JSON.stringify([...filteredBooks,newBook]));
        setCartItems((JSON.parse(sessionStorage.getItem("cart"))).length);
        //alert("Book has been added!");
    }


    const toPage=async(event, pageIndex, pageSize, bookName, categoryId)=>{
        event.preventDefault();
        await populateBooksData(pageIndex, pageSize, bookName, categoryId);
    }

    const handleChange = async(event)=> {
        const {name, value} = event.target;
        setParameters(state=>{
            return{
                ...state, 
                [name]:value};
        });
    };

        return(
            <div>
                <Form className='searchbox'>
                    <Row>
                    <Label>Search your book!</Label>
                        <Col>
                            <FormGroup>
                                <Input type='text' name="BookName" value={parameters.BookName} onChange={handleChange} placeholder="Write book name" required></Input>
                            </FormGroup>
                        </Col>
                        <Col md={2}>
                            <FormGroup>
                                <Input type="select" name="categoryId" value={parameters.categoryId} onChange={handleChange} required>
                                    <option value={"Default"}>Select book category</option>
                                    {categories.map(category=>(
                                    <option key={category.id} value={category.id}>{category.categoryName}</option>))}
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col md={2}>
                            <FormGroup>
                                <Button type='button' color='primary' onClick={()=>populateBooksData(1, paging.PageSize, parameters.BookName, parameters.categoryId)}>Search</Button>
                            </FormGroup>
                        </Col>
                    </Row>
                </Form>
                <Row>
                {Books.map((book,i)=>
                
                    <Col key={i} sm={3}>
                    <Card key={book.id} className="container-card">
                    <CardBody>
                        <CardTitle>{book.bookName}</CardTitle>
                        <CardSubtitle>{book.categoryId}</CardSubtitle>
                    </CardBody>
                    <img src={ApiStaticFiles+ book.image} width={200} height={200} alt="Book"/>
                    <CardBody>
                        <CardText>{book.description}</CardText>
                    </CardBody>
                    <Col>
                        <Button color='primary' tag={Link} to={"/Book/Details/"+book.id}>Details</Button>
                        <Button color='secondary' onClick={()=>addItemToSession(book)}>Add to cart</Button>
                    </Col>
                    </Card>
                    </Col>
                )}
                </Row>

                    
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
            </div>
        )
}
export default Home;