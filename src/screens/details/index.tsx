import React from "react";
import { Text } from "react-native-paper";
import useTypedSelector from "../../hooks/useTypedSelector";
import { View, ScrollView, StyleSheet } from "react-native";

const Index = (): React.JSX.Element => {
    const { city, unit, record } = useTypedSelector(({ details }) => details);

    if (!city || !record) {
        return <></>;
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>
                {[city.name, city.state].filter((x) => x).join(", ")} -{" "}
                {city.country}
            </Text>
            <View style={styles.card}>
                <Text>Temperature</Text>
                <Text>
                    - Current: {record.main.temp}°{unit[0].toUpperCase()}
                </Text>
                <Text>
                    - Feels Like: {record.main.feels_like}°
                    {unit[0].toUpperCase()}
                </Text>
                <Text>
                    - Min: {record.main.temp_min}°{unit[0].toUpperCase()}
                </Text>
                <Text>
                    - Max: {record.main.temp_max}°{unit[0].toUpperCase()}
                </Text>
            </View>
            <View style={styles.card}>
                <Text>Humidity: {record.main.humidity}%</Text>
                <Text>Visibility: {record.visibility / 1000} km</Text>
                <Text>
                    Condition: {record.weather[0].description} (Cloud Coverage:{" "}
                    {record.clouds.all}%)
                </Text>
                <Text>
                    Coordinates: Latitude {record.coord.lat}, Longitude{" "}
                    {record.coord.lon}
                </Text>
                <Text>
                    Pressure: {record.main.pressure} hPa (Sea Level),{" "}
                    {record.main.grnd_level} hPa (Ground Level)
                </Text>
            </View>
            <View style={styles.card}>
                <Text>Wind</Text>
                <Text>- Gusts: {record.wind.gust} m/s</Text>
                <Text>- Speed: {record.wind.speed} m/s</Text>
                <Text>- Direction: {record.wind.deg}° (West)</Text>
            </View>
            <View style={styles.card}>
                <Text>
                    Sunrise: {new Date(record.sys.sunrise * 1000).toUTCString()}
                </Text>
                <Text>
                    Sunset: {new Date(record.sys.sunset * 1000).toUTCString()}`
                </Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 15,
        height: "100%",
        backgroundColor: "white"
    },
    title: {
        fontSize: 18,
        marginBottom: 20,
        fontWeight: "bold"
    },
    card: {
        marginBottom: 20
    }
});

export default Index;
