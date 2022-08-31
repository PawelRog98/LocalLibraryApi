import React, { useEffect, useState } from "react";
import {Form, FormGroup, Label, Input, Col, Row, } from "reactstrap";
import TransactionService from "./TransactionService";

const TransactionDetails=(props)=>{
    const books = props.books;
    console.log(props, "to");
    return(
        <React.Fragment>
            {books.map((book,i)=>
            <div key={i}>
                <Row className="transactiondetailsbox">
                <Col md={3}>
                    <FormGroup>
                        <Label htmlFor="bookName">Book name</Label>
                        <Input type="text" name="bookName" value={book.bookName} disabled></Input>
                    </FormGroup>
                </Col>
                <Col md={3}>
                    <FormGroup>
                        <Label htmlFor="author">Author</Label>
                        <Input type="text" name="author" value={book.author} disabled></Input>
                    </FormGroup>
                </Col>
                <Col md={3}>
                    <FormGroup>
                        <Label htmlFor="isbn">ISBN</Label>
                        <Input type="text" name="isbn" value={book.isbn} disabled></Input>
                    </FormGroup>
                </Col>
            </Row>
            </div>
            )}
        </React.Fragment>
    )
}
export default TransactionDetails;