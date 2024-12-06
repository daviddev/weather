import { Api } from "../../api";
import { Record } from "../../interface";
import React, { useState, useEffect } from "react";
import Geolocation from "react-native-geolocation-service";
import { useToast } from "react-native-toast-notifications";
import useTypedSelector from "../../hooks/useTypedSelector";
import { request, PERMISSIONS, RESULTS } from "react-native-permissions";
import {
    View,
    Text,
    Alert,
    Linking,
    Platform,
    StyleSheet,
    ScrollView,
    ActivityIndicator
} from "react-native";

const CurrentLocation = (): React.JSX.Element => {
    const toast = useToast();

    const [loading, setLoading] = useState<boolean>(false);

    const [record, setRecord] = useState<Record | null>(null);

    const { unit } = useTypedSelector(({ details }) => details);

    useEffect(() => {
        check();
    }, []);

    const check = async () => {
        let status;

        if (Platform.OS === "ios") {
            status = await Geolocation.requestAuthorization("whenInUse");
        } else {
            status = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        }

        if (status === RESULTS.GRANTED) {
            detect();
        } else if (status === RESULTS.DENIED) {
            Alert.alert(
                "Location Permission Denied",
                "Please grant location permission to get the weather information.",
                [
                    { text: "Go to Settings", onPress: Linking.openSettings },
                    { text: "Cancel" }
                ]
            );
        } else if (status === RESULTS.BLOCKED) {
            Alert.alert(
                "Location Permission Blocked",
                "Please enable location permission in the settings.",
                [
                    { text: "Go to Settings", onPress: Linking.openSettings },
                    { text: "Cancel" }
                ]
            );
        }
    };

    const detect = () => {
        setLoading(true);

        Geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;

                submit(latitude, longitude);
            },
            (error) => {
                if (error.code === 1) {
                    Alert.alert(
                        "Location Access Denied",
                        "Please enable location services to get the weather information.",
                        [
                            {
                                text: "Go to Settings",
                                onPress: Linking.openSettings
                            },
                            { text: "Cancel" }
                        ]
                    );
                } else {
                    Alert.alert("Error", "Failed to fetch location.", [
                        { text: "OK" }
                    ]);
                }
            },
            { enableHighAccuracy: true }
        );
    };

    const submit = async (lat: number, lon: number) => {
        const params = {
            lat,
            lon,
            limit: 10,
            units: unit === "celsius" ? "metric" : "imperial"
        };

        await Api.fetchDetails(params)
            .then(({ data: record, success, message }) => {
                if (success) {
                    setRecord(record);
                } else {
                    setRecord(null);
                    toast.show(message, { type: "danger" });
                }
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <ScrollView style={styles.container}>
            {loading && <ActivityIndicator size="small" color="#755ea9" />}
            {!loading && record && (
                <>
                    <View style={styles.card}>
                        <Text>Temperature</Text>
                        <Text>
                            - Current: {record.main.temp}°
                            {unit[0].toUpperCase()}
                        </Text>
                        <Text>
                            - Feels Like: {record.main.feels_like}°
                            {unit[0].toUpperCase()}
                        </Text>
                        <Text>
                            - Min: {record.main.temp_min}°
                            {unit[0].toUpperCase()}
                        </Text>
                        <Text>
                            - Max: {record.main.temp_max}°
                            {unit[0].toUpperCase()}
                        </Text>
                    </View>
                    <View style={styles.card}>
                        <Text>Humidity: {record.main.humidity}%</Text>
                        <Text>Visibility: {record.visibility / 1000} km</Text>
                        <Text>
                            Condition: {record.weather[0].description} (Cloud
                            Coverage: {record.clouds.all}%)
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
                            Sunrise:{" "}
                            {new Date(record.sys.sunrise * 1000).toUTCString()}
                        </Text>
                        <Text>
                            Sunset:{" "}
                            {new Date(record.sys.sunset * 1000).toUTCString()}`
                        </Text>
                    </View>
                </>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        marginTop: 10,
        borderRadius: 10,
        backgroundColor: "white"
    },
    card: {
        marginBottom: 20
    }
});

export default CurrentLocation;
