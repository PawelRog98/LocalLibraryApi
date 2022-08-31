import { Button, Input } from "reactstrap";
import React, { useEffect, useState } from "react";
import TransactionService from "../Transactions/TransactionService";
import AuthorizeService from "../Authorization/AuthorizeService";
import useLibraryContext from "../../UseLibraryContext";

const Cart = ()=>{
    const [books, setBooks] = useState([]);
    const [expireDays, setExpireDays] = useState("");
    const {setCartItems} = useLibraryContext();
    useEffect(()=>{
        populateCartData();
    },[]);

    const populateCartData =async()=>{
        var cart = JSON.parse(sessionStorage.getItem("cart"));
        console.log(cart);
        if(cart){
            setBooks(cart);
        }
    }

    const handleRemove = async(event, id)=>{
        event.preventDefault();
        const leftBooks= books.filter(i=>i.id !==id);
        setBooks(leftBooks);
        sessionStorage.setItem("cart",JSON.stringify(leftBooks));
        setCartItems((JSON.parse(sessionStorage.getItem("cart"))).length);
    }

    const handleSubmit = async(event, books, expireDays)=>{
        event.preventDefault();
        var user = AuthorizeService.GetAccessToken();
        console.log(books);
        await TransactionService.Create(user.token, books, expireDays).then(
            sessionStorage.removeItem("cart")
        );

    }

    const handleChange=async(event)=>{
        setExpireDays(event.target.value);
        console.log(event.target.value);
    }

    return (
        <React.Fragment>
        <table className='table table-striped' aria-labelledby="tabelLabel">
            <thead>
                <tr>
                    <th>Book name</th>
                    <th>Category</th>
                    <th>ISBN</th>
                    <th>Image</th>
                    <th>Remove</th>
                </tr>
            </thead>
            <tbody>
                {books.map(book =>
                    <tr key={book.id}>
                        <td>{book.bookName}</td>
                        <td>{book.categoryId}</td>
                        <td>{book.isbn}</td>
                        <td>{book.image}</td>
                        <td><Button type="button" color="danger" onClick={(event)=>handleRemove(event, book.id)}>Remove</Button></td>
                    </tr>)}
            </tbody>
        </table>
        <Input type="text" name="expireDays" value={expireDays} onChange={handleChange} placeholder="Write number of days"></Input>
        <Button type="button" name="createTransaction" onClick={(event)=>handleSubmit(event, books, expireDays)}>Borrow</Button>
        </React.Fragment>
    )
}
export default Cart;