import { Api } from "../../api";
import { City } from "../../interface";
import { RouterEnum } from "../../enums/router";
import React, { useState, useEffect } from "react";
import { useToast } from "react-native-toast-notifications";
import useTypedSelector from "../../hooks/useTypedSelector";
import useTypedDispatch from "../../hooks/useTypedDispatch";
import useTypedNavigation from "../../hooks/useTypedNavigation";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { Card, List, Text, Button, TextInput } from "react-native-paper";
import {
    setCity,
    setQuery,
    setCities,
    setRecord
} from "../../store/slices/details";

let timer;

const Search = (): React.JSX.Element => {
    const toast = useToast();
    const dispatch = useTypedDispatch();
    const navigation = useTypedNavigation();

    const [expanded, setExpanded] = useState<boolean>(false);
    const [searching, setSearching] = useState<boolean>(false);
    const [submitting, setSubmitting] = useState<boolean>(false);

    const { city, unit, query, cities, record } = useTypedSelector(
        ({ details }) => details
    );

    useEffect(() => {
        if (city) {
            submit(city);
        }
    }, [unit]);

    const search = async (query: string) => {
        await dispatch(setQuery(query));
        await dispatch(setCity(null));
        await dispatch(setCities([]));
        await dispatch(setRecord(null));

        if (timer) {
            clearTimeout(timer);
        }

        return (timer = setTimeout(async () => {
            if (!query) {
                return;
            }

            setSearching(true);

            const params = {
                q: query,
                limit: 10
            };

            await Api.fetchCities(params)
                .then(({ data: cities, success, message }) => {
                    if (success) {
                        dispatch(setCities(cities));
                        if (cities.length) {
                            setExpanded(true);
                        } else {
                            toast.show("No data", { type: "warning" });
                        }
                    } else {
                        dispatch(setCities([]));
                        toast.show(message, { type: "danger" });
                    }
                })
                .finally(() => {
                    setSearching(false);
                });
        }, 750));
    };

    const submit = async (city: City) => {
        dispatch(setCity(city));
        setExpanded(false);
        setSubmitting(true);

        const params = {
            limit: 10,
            lat: city.lat,
            lon: city.lon,
            units: unit === "celsius" ? "metric" : "imperial"
        };

        await Api.fetchDetails(params)
            .then(({ data: record, success, message }) => {
                if (success) {
                    dispatch(setRecord(record));
                } else {
                    dispatch(setRecord(null));
                    toast.show(message, { type: "danger" });
                }
            })
            .finally(() => {
                setSubmitting(false);
            });
    };

    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <TextInput
                    label="City"
                    value={query}
                    style={styles.input}
                    onChangeText={search}
                />
                {searching && (
                    <ActivityIndicator
                        size="small"
                        color="#755ea9"
                        style={styles.loader}
                    />
                )}
            </View>
            {Boolean((cities || []).length) && (
                <List.Section>
                    <List.Accordion
                        title="Suggestions"
                        expanded={expanded}
                        onPress={() => setExpanded(!expanded)}
                    >
                        {cities.map((city, key) => (
                            <List.Item
                                key={`city-${key}`}
                                style={styles.listItem}
                                onPress={() => submit(city)}
                                title={`${[city.name, city.state]
                                    .filter((x) => x)
                                    .join(", ")} - ${city.country}`}
                            />
                        ))}
                    </List.Accordion>
                </List.Section>
            )}
            {city && (
                <Card>
                    <Card.Title
                        title={`${[city.name, city.state]
                            .filter((x) => x)
                            .join(", ")} - ${city.country}`}
                    />
                    <Card.Content>
                        {submitting && (
                            <ActivityIndicator size="small" color="#755ea9" />
                        )}
                        {!submitting && (
                            <>
                                {!record && <Text>No details</Text>}
                                {record && (
                                    <>
                                        <Text>Temperature</Text>
                                        <Text>
                                            - Current: {record.main.temp}°
                                            {unit[0].toUpperCase()}
                                        </Text>
                                        <Text>
                                            - Feels Like:{" "}
                                            {record.main.feels_like}°
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
                                    </>
                                )}
                            </>
                        )}
                    </Card.Content>
                    {record && (
                        <Card.Actions>
                            <Button
                                onPress={() =>
                                    navigation.navigate(
                                        RouterEnum.DETAILS,
                                        record
                                    )
                                }
                            >
                                Details
                            </Button>
                        </Card.Actions>
                    )}
                </Card>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 10
    },
    top: {
        width: "100%",
        position: "relative"
    },
    input: {
        fontSize: 14,
        width: "100%",
        backgroundColor: "white"
    },
    loader: {
        right: 10,
        top: "50%",
        position: "absolute",
        transform: [{ translateY: -10 }]
    },
    listItem: {
        backgroundColor: "white"
    }
});

export default Search;
