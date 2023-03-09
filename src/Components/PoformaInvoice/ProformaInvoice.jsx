import React from 'react';
import ReactPDF, { Page, Text, View, Document, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
import Invoice from '../Invoice/Invoice'
import { PDFViewer } from '@react-pdf/renderer';
import invoice from '../../data/invoice-data'
import { useDispatch, useSelector } from 'react-redux';
import { setPiProudcts } from '../../store/piSlice';

const ProformaInvoice = () => {
  const dispatch = useDispatch();
  dispatch(setPiProudcts(useSelector((state)=>state.cart.cart)))
   const pi = useSelector((state)=>state.pi);
   const currency = useSelector((state)=>state.filters.currency);
   console.log(currency);


  return (
    <>
   <PDFViewer width="100%" height="1200" className="app" >
                <Invoice pi={pi} currency={currency}/>
   </PDFViewer>
 
    </>
  )
}

export default ProformaInvoice

/*
   
<PDFDownloadLink document={<MyDocument />} fileName="fee_acceptance.pdf">
  {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
</PDFDownloadLink>

*/