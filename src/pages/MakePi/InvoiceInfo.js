import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { setPiInfo } from "../../store/piSlice";
import { exporters, final_distination, notify_partys, party_of_discharge } from "./data";

function InvoiceInfo() {
  const dispatch = useDispatch();
  const [exporter, setExporter] = useState("");
  const [invoiceInfo, setInvoiceInfo] = useState({
    //   piProducts: [],
    invoiceNo: 0,
    date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "2-digit", day: "2-digit" }),
    exporter: "",
    buyerAdress: "",
    consignee: "",
    notifyParty: "",
    partyOfDischarge: "",
    finalDistination: "",
  });
  const handleChange = (event) => {
    setInvoiceInfo({ ...invoiceInfo, [event.target.name]: event.target.value });
    dispatch(setPiInfo({ ...invoiceInfo, [event.target.name]: event.target.value }));
  };
  console.log(exporters[0].value);
  return (
    <React.Fragment>
      <Grid container spacing={4}>
        <Grid style={{ paddingBottom: "30px" }} item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">EXPORTER</InputLabel>
            <Select name="exporter" value={invoiceInfo.exporter} onChange={handleChange} displayEmpty inputProps={{ "aria-label": "Without label" }}>
              <MenuItem value={exporters[0].value}>{exporters[0].name}</MenuItem>
              <MenuItem value={exporters[1].value}>{exporters[1].name}</MenuItem>
              <MenuItem value={exporters[2].value}>{exporters[2].name}</MenuItem>
            </Select>
          </FormControl>{" "}
        </Grid>{" "}
        <Grid item xs={12} sm={6}>
          <TextField name="buyerAdress" value={invoiceInfo.buyerAdress} onChange={handleChange} label="BUYER ADDRESS" fullWidth></TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField name="consignee" value={invoiceInfo.consignee} onChange={handleChange} label="CONSIGNEE" fullWidth></TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">NOTIFY PARTY</InputLabel>
            <Select name="notifyParty" value={invoiceInfo.notifyParty} onChange={handleChange} displayEmpty inputProps={{ "aria-label": "Without label" }}>
              <MenuItem value={notify_partys[0].value}>{notify_partys[0].name}</MenuItem>
              <MenuItem value={notify_partys[1].value}>{notify_partys[1].name}</MenuItem>
              <MenuItem value={notify_partys[2].value}>{notify_partys[2].name}</MenuItem>
              <MenuItem value={notify_partys[3].value}>{notify_partys[3].name}</MenuItem>
            </Select>
          </FormControl>{" "}
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">PARTY OF DISCHARGE</InputLabel>
            <Select name="partyOfDischarge" value={invoiceInfo.partyOfDischarge} onChange={handleChange} displayEmpty inputProps={{ "aria-label": "Without label" }}>
              <MenuItem value={party_of_discharge[0].value}>{party_of_discharge[0].name}</MenuItem>
              <MenuItem value={party_of_discharge[1].value}>{party_of_discharge[1].name}</MenuItem>
              <MenuItem value={party_of_discharge[2].value}>{party_of_discharge[2].name}</MenuItem>
            </Select>
          </FormControl>{" "}
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">FINAL DESTINATION</InputLabel>
            <Select name="finalDistination" value={invoiceInfo.finalDistination} onChange={handleChange} displayEmpty inputProps={{ "aria-label": "Without label" }}>
              <MenuItem value={final_distination[0].value}>{final_distination[0].name}</MenuItem>
              <MenuItem value={final_distination[1].value}>{final_distination[1].name}</MenuItem>
              <MenuItem value={final_distination[2].value}>{final_distination[2].name}</MenuItem>
            </Select>
          </FormControl>{" "}
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField name="invoiceNo" value={invoiceInfo.invoiceNo} onChange={handleChange} label="INVOICE NUMBER" fullWidth></TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField name="date" value={invoiceInfo.date} label="DATE MM/DD/YYYY" fullWidth></TextField>
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel control={<Checkbox color="secondary" name="saveAddress" value="yes" />} label="Use this address for payment details" />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default InvoiceInfo;
