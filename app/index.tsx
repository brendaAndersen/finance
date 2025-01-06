import React from "react";
import { theme } from "@/constants/Colors";
import { StatusBar, StyleSheet, View } from "react-native";
import { Header } from "./components/header";
import { Balance } from "./components/balance";
import { Actions } from "./components/actions";

export interface Boleto {
  id: number;
  label: string;
  value: string;
  date: string;
  type: number;
}

export default function Page() {

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.colors.rocketseat.dark}
        translucent /><View style={styles.container}>
          <Header name={"User"} />
          <Balance balance="3.500" expense="415" />
          <Actions />
        </View>
      <StatusBar/>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.colorBackground,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    color: theme.colors.white,
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 14,
    marginRight: 14,
    marginTop: 34,
    margin: 14
  },
  subtitle: {
    fontSize: 36,
    color: theme.colors.grey[400],
  },
  textList: {
    color: "#fff",
  },
});
