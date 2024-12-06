import { AppDispatch } from "../store";
import { useDispatch } from "react-redux";

const useTypedDispatch: () => AppDispatch = useDispatch;

export default useTypedDispatch;
