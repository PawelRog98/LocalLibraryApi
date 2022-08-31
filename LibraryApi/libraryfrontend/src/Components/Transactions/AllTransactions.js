import React, { useEffect, useState } from "react";
import TransactionService from "./TransactionService";
import AuthorizeService from "../Authorization/AuthorizeService";
import TransactionDetails from "./TransactionDetails";
import { Button, Form, FormGroup, Label, Input, Col, Row, Pagination, PaginationItem, PaginationLink, Collapse } from "reactstrap";

const AllTransactions = ()=>{
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
        email:'',
        statusId:''
    });
    const [isDisabled, setEnable] = useState([false]);

    useEffect(()=>{
        populateTransactionsData();
        populateStatusesData();

    },[])
    const populateTransactionsData = async(pageIndex, pageSize, email, statusId)=>{

        if(statusId === "Default"){
            statusId=null;
        }
        var user = AuthorizeService.GetAccessToken();
        var response = await TransactionService.GetAll(user.token, pageIndex, pageSize, email, statusId);
        var header = JSON.parse(response.headers["x-pagination"]);

        setTransactions(response.data);
        setPaging(header);
        console.log(header);
    }

    const populateStatusesData = async()=>{
        var user = AuthorizeService.GetAccessToken();
        const data = await TransactionService.GetStatuses(user.token);
        setStatuses(data);
    }

    const handleChange = async(event, i)=> {
        const data = [...transactions];
        isDisabled[i]=true;
        data[i][event.target.name] = event.target.value;
        console.log(data);
        setTransactions(data);
        setEnable(isDisabled);
    }

    const handleChangeParameters = async(event)=> {
        const {name, value} = event.target;
        setParameters(state=>{
            return{
                ...state, 
                [name]:value};
        });
    };

    const handleChangeStatus = async(id, statusId)=>{
        var user = AuthorizeService.GetAccessToken();
        const conf = window.confirm("Are you sure?");

        console.log(statusId);
        console.log(id);
        if(conf){
            await TransactionService.ChangeStatus(user.token, id, statusId).then(
                resp=>{
                    console.log(resp.data);
                }
                ).catch(
                error=>{
                    console.log(error.data);
                });
        }
    }

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
                        <Col>
                            <FormGroup>
                                <Input type='text' name="email" value={parameters.email} onChange={handleChangeParameters} placeholder="Write book name" required></Input>
                            </FormGroup>
                        </Col>
                        <Col md={2}>
                            <FormGroup>
                                <Input type="select" name="statusId" value={parameters.statusId} onChange={handleChangeParameters} required>
                                    <option value={"Default"}>Select status</option>
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
                <Col md={2}>
                    <FormGroup>
                        <Label htmlFor="email">User</Label>
                        <Input type="text" name="email" value={transaction.email} disabled></Input>
                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <Label htmlFor="dateOfBorrow">DateOfBorrow</Label>
                        <Input type="text" name="dateOfBorrow" value={transaction.dateOfBorrow} disabled></Input>
                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <Label htmlFor="deadline">Deadline</Label>
                        <Input type="text" name="deadline" value={transaction.deadLine} disabled></Input>
                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <Label htmlFor="statusName">Status</Label>
                        <Input type="text" name="statusName" value={transaction.statusName} disabled></Input>
                </FormGroup>
                </Col>
                <Col md={2}>
                    <select name="statusId" value={transaction.statusId} onChange={(event)=>handleChange(event, i)}>
                                 {statuses.map(status=>(
                                     <option key={status.id} value={status.id}>{status.statusName}</option>))}
                             </select>
                </Col>
                <Col md={1}>
                    <FormGroup>
                        <Button color="primary" onClick={toggle}>Details</Button>
                        <Button type="button" name="id" color="primary" id={i} disabled={!isDisabled[i]} onClick={()=>handleChangeStatus(transaction.id, transaction.statusId)}>Save status</Button>
                    </FormGroup>
                </Col>
                </Row>
                <Collapse isOpen={isOpen}>
                <FormGroup>
                    <TransactionDetails books={transaction.books}></TransactionDetails>
                </FormGroup>
            </Collapse>
            </Form>)}
        
        <Pagination>
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
export default AllTransactions;