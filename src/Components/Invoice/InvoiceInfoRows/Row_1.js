import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const borderColor = "black";
const styles = StyleSheet.create({
  tableContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 24,
    borderWidth: 1,
    borderColor: "black",
  },
  container: {
    flexDirection: "row",
    borderLeft: 1,
    borderRight: 1,
    borderColor: "black",
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderTopWidth: 1,
    alignItems: "center",
    height: 21,
    textAlign: "center",
    fontStyle: "bold",
    flexGrow: 1,
  },
  exporter: {
    width: "50%",
    borderRightColor: borderColor,
    borderRight: 1,
  },

  invoice_no: {
    width: "30%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
  date: {
    width: "20%",
    borderRightColor: borderColor,
  },
});

const Row_1 = ({ items }) => {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.exporter}>EXPORTER</Text>
        <Text style={styles.invoice_no}>INVOICE NO</Text>
        <Text style={styles.date}>DATE</Text>
      </View>
    </>
  );
};

export default Row_1;
