import { NavigationType } from "../types/navigation";
import { NavigationProp, useNavigation } from "@react-navigation/native";

export default useNavigation<NavigationProp<NavigationType>>;
