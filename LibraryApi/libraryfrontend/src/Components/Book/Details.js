import { useEffect, useState } from "react";
import { Form, FormGroup, Label, Input, Button, Col, Row } from 'reactstrap';
import { useNavigate, useParams } from 'react-router-dom';
import AuthorizeService from "../Authorization/AuthorizeService";
import BookService from "./BookService";
import { ApiStaticFiles } from "../../config";
import { Link } from "react-router-dom";

const Details=()=>{
    const [book, setBook] = useState({bookName: '', 
    author: '',
    publicationYear: '',
    publisher: '',
    isbn: '',
    numberOfPages: '',
    description: '',
    numberOfCopies: '',
    categoryName: '',
    image:''});
    const [role, setRole] = useState('');
    const {id} = useParams();
    let navigate = useNavigate();
    const Api = "https://localhost:7138/Resources/BooksImages/0b2f11bc-c457-42c0-822e-0aa935d7cf42.png";

    
    useEffect(()=>{
        const getBookData =async ()=>{
            const data = await BookService.Get(id);
            if(!data || !id){
                navigate("../", { replace: true });
            }
            console.log(data);
            setBook(data);
        }
        getBookData();
        if(AuthorizeService.GetAccessToken()){
            var user = AuthorizeService.GetAccessToken();
            setRole(user.roleName);
        }
        console.log(role);
    },[role]);


    return(
        <Form className="editbookbox">
                    <FormGroup>
                        <img src={ApiStaticFiles+ book.image} width={300} height={300} alt="Book"/>
                    </FormGroup>
            <Row md={1}>
                <Col md={6}>
                    <FormGroup>
                        <Label htmlFor="bookName">Book name</Label>
                        <Input type="text" name="bookName" value={book.bookName} disabled></Input>
                    </FormGroup>
                </Col>
                <Col md={6}>
                    <FormGroup>
                        <Label htmlFor="author">Author</Label>
                        <Input type="text" name="author" value={book.author} disabled></Input>
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col md={3}>
                    <FormGroup>
                        <Label htmlFor="numberOfPages">Number of pages</Label>
                        <Input type="number" name="numberOfPages" value={book.numberOfPages} disabled></Input>
                    </FormGroup>
                </Col>
                <Col md={3}>
                    <FormGroup>
                        <Label htmlFor="publicationYear">Publication year</Label>
                        <Input type="number" name="publicationYear" value={book.publicationYear} disabled></Input>
                    </FormGroup>
                </Col>
                <Col md={3}>
                    <FormGroup>
                        <Label htmlFor="categoryName">Category</Label>
                        <Input type="text" name="category" value={book.categoryName} disabled></Input>
                </FormGroup>
                </Col>
                <Col md={3}>
                    <FormGroup>
                        <Label htmlFor="publisher">Publisher</Label>
                        <Input type="text" name="publisher" value={book.publisher} disabled></Input>
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col md={4}>
                    <FormGroup>
                        <Label htmlFor="isbn">ISBN</Label>
                        <Input type="text" name="isbn" value={book.isbn} disabled></Input>
                    </FormGroup>
                </Col>
                <Col md={4}>
                    <FormGroup>
                        <Label htmlFor="numberOfCopies">Number of copies</Label>
                        <Input type="number" name="numberOfCopies" value={book.numberOfCopies} disabled></Input>
                    </FormGroup>
                </Col>
            </Row>
            <FormGroup>
                <Label htmlFor="description">Desctription</Label>
                <Input type="textarea" name="description" value={book.description} disabled></Input>
            </FormGroup>
            {(role==="Administrator" || role==="Employee") &&
                <FormGroup>
                    <Button type="button" color='primary' tag={Link} to={"/Book/EditBook/"+book.id}>Edit</Button>
                </FormGroup>
            }
        </Form>
    )
}
export default Details;