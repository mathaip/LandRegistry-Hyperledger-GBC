import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import axios from 'axios';





export default function Chart() {
  const theme = useTheme();
  const [id, setID] = React.useState('');
  const [owner, setOwner] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [docType, setDocType] = React.useState('');
  const [type, setType] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');



  const handleSubmit = (e)=>{
    e.preventDefault();

    const newHouse = {
      id,
      owner,
      address,
      docType,
      type,
      phoneNumber
    };

    axios
    .post('http://localhost:9000/createHouse',newHouse)
    .then(function(response){
       console.log(response);
      })
    .catch(err =>{
      console.log(err);
    })

  }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Register a New Property
      </Typography>
      <Grid >
      <Grid item xs={12}>
          <TextField
            required
            id="id"
            name="id"
            label="House ID"
            fullWidth
            autoComplete="fname"
            onChange={e => setID(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="Name"
            name="Name"
            label="Name of Owner"
            fullWidth
            autoComplete="fname"
            onChange={e => setOwner(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} >
          <TextField
            required
            id="Address"
            name="address"
            label="address"
            fullWidth
            autoComplete="lname"
            onChange={e => setAddress(e.target.value)}

          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="DocType"
            name="doctype"
            label="docType"
            fullWidth
            onChange={e => setDocType(e.target.value)}

            
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="type"
            name="type"
            label="Type of Property"
            fullWidth
            onChange={e => setType(e.target.value)}

          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="phone number "
            name="phone number"
            label="Phone Number"
            fullWidth
            onChange={e => setPhoneNumber(e.target.value)}

          />
        </Grid>
        
        
      </Grid>
      <Button
      color='primary'
      onClick={handleSubmit}
      > Register Your Property</Button>
    </React.Fragment>
    
  );
}