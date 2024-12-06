import Search from "./search";
import React, { useState } from "react";
import CurrentLocation from "./current-location";
import { SegmentedButtons } from "react-native-paper";
import { StyleSheet, ScrollView, ImageBackground } from "react-native";

const TAB_OPTIONS = {
    checkedColor: "#755ea9",
    uncheckedColor: "black",
    style: { backgroundColor: "white" }
};

const TABS = [
    {
        ...TAB_OPTIONS,
        value: "search",
        label: "Search"
    },
    {
        ...TAB_OPTIONS,
        value: "current-location",
        label: "Current Location"
    }
];

const Index = (): React.JSX.Element => {
    const [tab, setTab] = useState<string>("search");

    const cover = () => {
        const hours = new Date().getHours();

        if (hours >= 6 && hours < 18) {
            return require("../../images/cover-light.jpg");
        }

        return require("../../images/cover-night.webp");
    };

    return (
        <ImageBackground
            source={cover()}
            resizeMode="cover"
            style={styles.cover}
        >
            <ScrollView style={styles.container}>
                <SegmentedButtons
                    value={tab}
                    buttons={TABS}
                    onValueChange={setTab}
                />
                {tab === "search" && <Search />}
                {tab === "current-location" && <CurrentLocation />}
            </ScrollView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    cover: {
        flex: 1
    },
    container: {
        margin: 15
    }
});

export default Index;
