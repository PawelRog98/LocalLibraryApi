import { useEffect } from "react"
import { useSearchParams } from "react-router-dom";

const VerifyAccount = ()=>{
    const [tokenParam, setTokenParam] = useSearchParams();
    useEffect(()=>{
        populateParamsData();
    },[]);
    const populateParamsData=async()=>{
        tokenParam.get("varificationToken");
    }
    const sendToken=()=>{
        
    }
    
}
export default VerifyAccount;