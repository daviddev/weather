import { RootState } from "../store";
import { useSelector, TypedUseSelectorHook } from "react-redux";

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export default useTypedSelector;
