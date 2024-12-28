// src/components/MyCard.js

import React, { Fragment, useState } from 'react';
import { Box, Card, Grid, Button, CardActions, Typography, CardContent, DialogActions, DialogContent, DialogTitle, Dialog } from '@mui/material';
import { getMatchDetails } from '../api/api';

const MyCard = ({ match }) => {
  const { name, dateTimeGMT, teams, id } = match;

  const [details, setDetails] = useState(null); // Store match details state
  const [openDialog, setOpenDialog] = useState(false); // State for dialog visibility

  // Function to handle "Show Details" button click
  const handleClick = (id) => {
    getMatchDetails(id)
      .then((data) => {
        console.log("MATCH DATA", data);
        setDetails(data);
        handleOpenDialog();  // Open the dialog after data is fetched
      })
      .catch((error) => {
        console.error('Error fetching match details:', error);
      });
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false); // Close the dialog
  };

  const getDialog = (
    <Dialog open={openDialog} onClose={handleCloseDialog}>
      <DialogTitle>Match Details</DialogTitle>
      <DialogContent>
        {details ? (
          <>
            <Typography variant="h6">Venue: <span>{details.venue}</span></Typography>
            <Typography variant="body1">Status: <span>{details.status}</span></Typography>
            <Typography variant="body1">
              Match started: <span>{details.status === 'Live' ? 'Yes' : 'No'}</span>
            </Typography>
            <Typography variant="body2">More details: <span>{details.moreInfo || 'Not available'}</span></Typography>
          </>
        ) : (
          <Typography variant="body1">Loading match details...</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <Fragment>
      <Card style={{ margin: 25 }}>
        <CardContent>
          <Grid container justifyContent="center" alignItems="center" spacing={2}>
            <Grid item>
              <Typography variant="h5">{teams[0]}</Typography> {/* Team 1 */}
            </Grid>
            <Grid item>
              <img style={{ width: 115 }} src={require('../img/vs.jpg')} alt="vs" />
            </Grid>
            <Grid item>
              <Typography variant="h5">{teams[1]}</Typography> {/* Team 2 */}
            </Grid>
          </Grid>
          <Grid container justifyContent="center" alignItems="center" spacing={2} mt={2}>
            <Button
              variant="contained"
              onClick={() => handleClick(id)}  // Pass the match id to the handler
            >
              Show Details
            </Button>
            <Button style={{ margin: 7 }} variant="contained">
              START TIME {new Date(dateTimeGMT).toLocaleString()}
            </Button>
          </Grid>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
      {getDialog} {/* Render the Dialog here */}
    </Fragment>
  );
};

export default MyCard;
