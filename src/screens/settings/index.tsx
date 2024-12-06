import React from "react";
import { View, StyleSheet } from "react-native";
import { RadioButton } from "react-native-paper";
import { setUnit } from "../../store/slices/details";
import useTypedDispatch from "../../hooks/useTypedDispatch";
import useTypedSelector from "../../hooks/useTypedSelector";

const Index = (): React.JSX.Element => {
    const dispatch = useTypedDispatch();

    const { unit } = useTypedSelector(({ details }) => details);

    return (
        <View style={styles.container}>
            <RadioButton.Group
                value={unit}
                onValueChange={(unit) => dispatch(setUnit(unit))}
            >
                <RadioButton.Item label="Celsius" value="celsius" />
                <RadioButton.Item label="Fahrenheit" value="fahrenheit" />
            </RadioButton.Group>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: "100%",
        backgroundColor: "white"
    }
});

export default Index;
