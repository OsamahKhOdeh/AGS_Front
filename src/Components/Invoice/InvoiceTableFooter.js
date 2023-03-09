import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const borderColor = "black";
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    borderBottomColor: "black",
    borderBottomWidth: 1,
    alignItems: "center",
    height: 24,
    fontSize: 12,
    fontStyle: "bold",
  },
  description: {
    fontSize: "10px",

    width: "85%",
    textAlign: "center",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    paddingRight: 8,
  },
  total: {
    fontSize: "10px",
    width: "15%",
    textAlign: "right",
    paddingRight: 8,
  },
});

const InvoiceTableFooter = ({ products, currency }) => {
  const total = products.map((item) => item.qty * item.price).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  return (
    <>
      <View style={styles.row}>
        <Text style={styles.description}>TOTAL</Text>
        <Text style={styles.total}>
          {Number.parseFloat(total).toFixed(2)}&nbsp;{currency}
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.description}>DISCOUNT</Text>
        <Text style={styles.total}>{0.0}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.description}>TOTAL PRICE IN NUMBER</Text>
        <Text style={styles.total}>
          {Number.parseFloat(total).toFixed(2)}&nbsp;{currency}
        </Text>
      </View>
    </>
  );
};

export default InvoiceTableFooter;
