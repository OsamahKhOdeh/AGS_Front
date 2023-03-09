import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const borderColor = "black";
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderLeft: 1,
    borderRight: 1,
    borderColor: "black",
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderTopWidth: 1,
    alignItems: "center",
    height: 75,
    textAlign: "center",
    fontStyle: "bold",
    flexGrow: 1,
  },
  container2: {
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
  col_container: {
    width: "270px",
    flexDirection: "column",
  },
  exporter_val: {
    width: "51%",
    paddingLeft: "3px",
    paddingRight: "3px",
    fontSize: "10px",
    borderRightColor: borderColor,
  },

  invoice_no: {
    width: "159px",
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
  date: {
    alignItems: "center",
    textAlign: "center",
    borderRightColor: borderColor,
  },
  invoice_no_val: {
    width: "60%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
  date_val: {
    width: "40%",
    borderRightColor: borderColor,
  },
});

const Row_2_1 = () => {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.invoice_no}>INVOICE NO</Text>
        <Text style={styles.date}>DATE</Text>
      </View>
    </>
  );
};

const Row_2 = ({ piInfo }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.exporter_val}>{piInfo.exporter} </Text>
      <View style={styles.col_container}>
        <View style={styles.container2}>
          <Text style={styles.invoice_no}>{piInfo.invoiceNo}</Text>
          <Text style={styles.date}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{piInfo.date}</Text>
        </View>
        <Text style={{ width: "264px", border: 1, paddingTop: "3px" }}>BUYER ADDRESS</Text>
        <Text style={{ paddingTop: "3px", height: "35px", width: "264px", border: 1, fontSize: "10" }}>{piInfo.buyerAdress}</Text>
      </View>
    </View>
  );
};

export default Row_2;
