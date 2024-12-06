import React from "react";
import { StyleSheet } from "react-native";
import { Appbar } from "react-native-paper";
import { RouterEnum } from "../enums/router";
import useTypedNavigation from "../hooks/useTypedNavigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

interface Props extends NativeStackScreenProps<any> {}

const Header = (props: Props): React.JSX.Element => {
    const active = props.route.name;

    const navigation = useTypedNavigation();

    const title = () => {
        return active.charAt(0).toUpperCase() + active.slice(1);
    };

    return (
        <>
            <Appbar.Header style={styles.container}>
                {active !== RouterEnum.HOME && (
                    <Appbar.BackAction
                        onPress={() => navigation.navigate(RouterEnum.HOME)}
                    />
                )}
                <Appbar.Content title={title()} />
                {active === RouterEnum.HOME && (
                    <Appbar.Action
                        icon="cog-outline"
                        onPress={() => navigation.navigate(RouterEnum.SETTINGS)}
                    />
                )}
            </Appbar.Header>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white"
    }
});

export default Header;
