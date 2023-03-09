import React, { Fragment } from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";
import { useSelector } from "react-redux";

const borderColor = "black";
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    borderBottomColor: "black",
    borderBottomWidth: 1,
    alignItems: "center",
    height: 24,
    fontStyle: "bold",
    fontSize: "10px",
  },
  no: {
    width: "5%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    textAlign: "right",
    paddingRight: 8,
  },
  description: {
    width: "45%",
    textAlign: "left",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    paddingLeft: 8,
  },
  qty: {
    width: "15%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    textAlign: "right",
    paddingRight: 8,
  },
  price: {
    width: "20%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    textAlign: "right",
    paddingRight: 8,
  },
  amount: {
    width: "15%",
    textAlign: "right",
    paddingRight: 8,
  },
});

const InvoiceTableRow = ({ products, currency }) => {
  let no = 0;
  const rows = products.map((item) => (
    <View style={styles.row} key={item._id}>
      <Text style={styles.no}>{no + 1}</Text>
      <Text style={styles.description}>{item.code}</Text>
      <Text style={styles.qty}>{item.qty}</Text>
      <Text style={styles.price}>
        {item.price}&nbsp;&nbsp;
        {currency}
      </Text>
      <Text style={styles.amount}>
        {(item.qty * item.price).toFixed(2)}&nbsp;&nbsp;
        {currency}
      </Text>
    </View>
  ));
  return <Fragment>{rows}</Fragment>;
};

export default InvoiceTableRow;
