import { useEffect, useState } from "react";
import { Form, FormGroup, Label, Input, Button, Col, Row } from 'reactstrap';
import { useParams } from 'react-router-dom';
import AuthorizeService from "../Authorization/AuthorizeService";
import BookService from "./BookService";
import CategoryService from "../Category/CategoryService";

const EditBook=()=>{
    const [book, setBook] = useState({bookName: '', 
    author: '',
    publicationYear: '',
    publisher: '',
    isbn: '',
    numberOfPages: '',
    description: '',
    numberOfCopies: '',
    categoryId: '',
    image:''});

    const [bookImage, setBookImage] = useState();
    const [imagePreview, setImagePreview] = useState();
    const [categories, setCategories] =useState([]);
    const {id} = useParams();
    const {Api} = "https://localhost:7138/Resources/BooksImages/0b2f11bc-c457-42c0-822e-0aa935d7cf42.png";

    useEffect(()=>{
        populateCategoriesData();
        const getBookData =async ()=>{
            if(id){
                const data = await BookService.Get(id);
                console.log(data);
                setBook(data);
            }
        }
        getBookData();
    },[id]);

    const populateCategoriesData = async ()=>{
        var user = AuthorizeService.GetAccessToken();
        if(user){
            const response = await CategoryService.GetCategories(user.token);
            setCategories(response.data);
        }
    }
    const handleChange = async(event)=> {
        const {name, value} = event.target;
        setBook(state=>{
            return{
                ...state, 
                [name]:value};
        });
    };


    const saveFile= (event) => {
        setBookImage(event.target.files[0]);

        var reader = new FileReader();
        setImagePreview(reader.readAsDataURL(event.target.files[0]));
    };

    const handleSave = async(event)=>{
        event.preventDefault();

        var formData = new FormData();
        if(id){
            formData.append("id",id);
        }
        formData.append("bookName", book.bookName);
        formData.append("author", book.author);
        formData.append("publicationYear", book.publicationYear);
        formData.append("publisher", book.publisher);
        formData.append("isbn", book.isbn);
        formData.append("numberOfPages", book.numberOfPages);
        formData.append("description", book.description);
        formData.append("numberOfCopies", book.numberOfCopies);
        formData.append("categoryId", book.categoryId);
        formData.append("file",bookImage);

        var user = AuthorizeService.GetAccessToken();
        for (const value of formData.values()) {
            console.log(value);
          }
        if(id){
            await BookService.Update(user.token, formData).then(
                alert("Book has beenupdated"),
                console.log("updated")
            )
        }
        else{
            await BookService.Create(user.token, formData
                ).then(
                    alert("Book has been added"),
                    console.log("added")
                );
        }
        
    };
    return(
        <Form className="editbookbox" onSubmit={handleSave}>
            <Row md={1}>
                <Col md={6}>
                    <FormGroup>
                        <Label htmlFor="bookName">Book name</Label>
                        <Input type="text" name="bookName" value={book.bookName} onChange={handleChange} required></Input>
                    </FormGroup>
                </Col>
                <Col md={6}>
                    <FormGroup>
                        <Label htmlFor="author">Author</Label>
                        <Input type="text" name="author" value={book.author} onChange={handleChange} required></Input>
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col md={3}>
                    <FormGroup>
                        <Label htmlFor="numberOfPages">Number of pages</Label>
                        <Input type="number" name="numberOfPages" value={book.numberOfPages} onChange={handleChange} required></Input>
                    </FormGroup>
                </Col>
                <Col md={3}>
                    <FormGroup>
                        <Label htmlFor="publicationYear">Publication year</Label>
                        <Input type="number" name="publicationYear" value={book.publicationYear} onChange={handleChange} required></Input>
                    </FormGroup>
                </Col>
                <Col md={3}>
                    <FormGroup>
                        <Label htmlFor="categoryId">Category</Label>
                        <Input type="select" name="categoryId" value={book.categoryId} onChange={handleChange} required>
                            <option value={"Default"} disabled>Select book category</option>
                            {categories.map(category=>(
                                <option key={category.id} value={category.id}>{category.categoryName}</option>))}
                        </Input>
                </FormGroup>
                </Col>
                <Col md={3}>
                    <FormGroup>
                        <Label htmlFor="publisher">Publisher</Label>
                        <Input type="text" name="publisher" value={book.publisher} onChange={handleChange} required></Input>
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col md={4}>
                    <FormGroup>
                        <Label htmlFor="isbn">ISBN</Label>
                        <Input type="text" name="isbn" value={book.isbn} onChange={handleChange} required></Input>
                    </FormGroup>
                </Col>
                <Col md={4}>
                    <FormGroup>
                        <Label htmlFor="numberOfCopies">Number of copies</Label>
                        <Input type="number" name="numberOfCopies" value={book.numberOfCopies} onChange={handleChange} required></Input>
                    </FormGroup>
                </Col>
                <Col md={4}>
                    <FormGroup>
                        <Label htmlFor="file">Image</Label>
                        <Input type="file" name="file" accept="image/*" onChange={saveFile} required></Input>
                {/* <img src={Api} width={300} height={300} alt="Book"/> */}
                    </FormGroup>
                </Col>
            </Row>
            <FormGroup>
                <Label htmlFor="description">Desctription</Label>
                <Input type="textarea" name="description" value={book.description} onChange={handleChange} required></Input>
            </FormGroup>

            <FormGroup>
                <Button type='submit'>Save</Button>
            </FormGroup>
        </Form>
    )
}
export default EditBook;