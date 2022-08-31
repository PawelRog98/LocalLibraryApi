import React, { useEffect, useState } from "react";
import TransactionService from "./TransactionService";
import AuthorizeService from "../Authorization/AuthorizeService";
import TransactionDetails from "./TransactionDetails";
import { Button, Form, FormGroup, Label, Input, Col, Row, Pagination, PaginationItem, PaginationLink, Collapse } from "reactstrap";

const MyTransactions = ()=>{
    const [transactions, setTransactions] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [statuses, setStatuses] = useState([]);
    const [paging, setPaging] = useState({PageIndex: 1,
        PageSize: 20,
        HasNext: false,
        HasPrevious: false,
        TotalPages:''
    });
    const [parameters, setParameters] = useState({
        statusId:''
    });

    useEffect(()=>{
        populateTransactionsData();
        populateStatusesData();

    },[])
    const populateTransactionsData = async(pageIndex, pageSize, email, statusId)=>{
        if(statusId === "Default"){
            statusId=null;
        }
        var user = AuthorizeService.GetAccessToken();
        var response = await TransactionService.GetMy(user.token, pageIndex, pageSize, email, statusId);
        var header = JSON.parse(response.headers["x-pagination"]);

        setTransactions(response.data);
        setPaging(header);
        console.log(response.data);
    }

    const populateStatusesData=async()=>{
        var user = AuthorizeService.GetAccessToken();
        var data = await TransactionService.GetStatuses(user.token);
        setStatuses(data);
    }


    const handleChange = async(event)=> {
        const {name, value} = event.target;
        setParameters(state=>{
            return{
                ...state, 
                [name]:value};
        });
    };

    const toPage=async(event, pageIndex, pageSize, email, statusId)=>{
        event.preventDefault();
        await populateTransactionsData(pageIndex, pageSize, email, statusId);
    }

    const toggle =()=>{
        setIsOpen(!isOpen);
    }
    return(
        <React.Fragment>
            <Form className='searchbox'>
                    <Row>
                    <Label>Search your transaction</Label>
                        <Col md={2}>
                            <FormGroup>
                                <Input type="select" name="categoryId" value={parameters.statusId} onChange={handleChange} required>
                                    <option value={"Default"}>Select book category</option>
                                    {statuses.map(status=>(
                                    <option key={status.id} value={status.id}>{status.statusName}</option>))}
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col md={2}>
                            <FormGroup>
                                <Button type='button' color='primary' onClick={()=>populateTransactionsData(1, paging.PageSize, parameters.email, parameters.statusId)}>Search</Button>
                            </FormGroup>
                        </Col>
                    </Row>
                </Form>
            {transactions.map((transaction,i)=>
                <Form key={i} className="transactionbox">
                <Row>
                <Col md={3}>
                    <FormGroup>
                        <Label htmlFor="dateOfBorrow">DateOfBorrow</Label>
                        <Input type="text" name="dateOfBorrow" value={transaction.dateOfBorrow} disabled></Input>
                    </FormGroup>
                </Col>
                <Col md={3}>
                    <FormGroup>
                        <Label htmlFor="deadline">Deadline</Label>
                        <Input type="text" name="deadline" value={transaction.deadLine} disabled></Input>
                    </FormGroup>
                </Col>
                <Col md={3}>
                    <FormGroup>
                        <Label htmlFor="statusName">Status</Label>
                        <Input type="text" name="statusName" value={transaction.statusName} disabled></Input>
                </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <Button color="primary" onClick={toggle}>Details</Button>
                    </FormGroup>
                </Col>
            </Row>
            <Collapse isOpen={isOpen}>
                <FormGroup>
                    <TransactionDetails books={transaction.books}></TransactionDetails>
                </FormGroup>
            </Collapse>
            </Form>
            )}
            
        <Pagination className="pagination">
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
export default MyTransactions;