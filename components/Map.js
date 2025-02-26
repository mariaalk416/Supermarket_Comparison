import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { View, Text, ActivityIndicator } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";
import * as Location from "expo-location";

const supermarkets = [
  { name: "AlphaMega", lat: 35.1658, lng: 33.3669 },
  { name: "Lidl", lat: 35.1856, lng: 33.3823 },
  { name: "Sklavenitis", lat: 34.7071, lng: 33.0226 },
  { name: "Papantoniou", lat: 34.7755, lng: 32.4233 }
];

const SupermarketMap = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError("Permission to access location was denied");
        setLoading(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setUserLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
      setLoading(false);
    })();
  }, []);

  return (
    <SafeAreaContainer>
      <ScrollContainer>
        <HeroGradient colors={["#8ae1e6", "#34c2b3"]}>
          <HeroContent>
            <Title>Find Your Nearest Supermarkets!</Title>
          </HeroContent>
        </HeroGradient>
        <MapContainerStyled>
          {loading ? (
            <ActivityIndicator size="large" color="#34c2b3" />
          ) : (
            <MapView
              style={{ height: "100%", width: "100%" }}
              initialRegion={{
                latitude: userLocation ? userLocation.lat : 35,
                longitude: userLocation ? userLocation.lng : 33,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1,
              }}
            >
              {userLocation && (
                <Marker
                  coordinate={{ latitude: userLocation.lat, longitude: userLocation.lng }}
                  title="Your Location"
                  pinColor ="rgb(39, 83, 228)"
                />
              )}
              {supermarkets.map((market, index) => (
                <Marker
                  key={index}
                  coordinate={{ latitude: market.lat, longitude: market.lng }}
                  title={market.name}
                />
              ))}
            </MapView>
          )}
        </MapContainerStyled>
      </ScrollContainer>
    </SafeAreaContainer>
  );
};

const SafeAreaContainer = styled.View`
  flex: 1;
  background-color: #e0f7f9;
`;

const ScrollContainer = styled.ScrollView`
  flex: 1;
  padding: 20px;
`;

const HeroGradient = styled(LinearGradient)`
  border-radius: 20px;
  margin-bottom: 20px;
  padding: 20px;
  align-items: center;
`;

const HeroContent = styled(View)`
  align-items: center;
`;

const Title = styled(Text)`
  font-size: 24px;
  font-weight: bold;
  color: #333333;
  text-align: center;
  margin-bottom: 10px;
`;

const MapContainerStyled = styled(Animatable.View)`
  height: 400px;
  border-radius: 20px;
  overflow: hidden;
  elevation: 5;
  background-color: #fff;
`;

export default SupermarketMap;
