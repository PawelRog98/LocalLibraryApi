import { useContext } from "react";
import AppContext from "./LibraryContext";

const useLibraryContext = () => {
    return useContext(AppContext);
}
export default useLibraryContext;