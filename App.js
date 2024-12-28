// src/App.js

import React, { useEffect, useState } from 'react';
import Navbar from './components/navbar';
import MyCard from './components/MyCard';
import { Grid, Button } from '@mui/material';
import { getMatches } from './api/api'; // Import the API function
import './App.css';


function App() {
  const [matches, setMatches] = useState([]);
  const [todayMatches, setTodayMatches] = useState([]);
  const [futureMatches, setFutureMatches] = useState([]);

  useEffect(() => {
    getMatches()
      .then((data) => {
        const now = new Date();
        const todayStart = new Date(now.setHours(0, 0, 0, 0)); // Start of today
        const todayEnd = new Date(now.setHours(23, 59, 59, 999)); // End of today

        const allMatches = data;

        // Separate today and future matches
        const todaysMatches = allMatches.filter((match) => {
          const matchDate = new Date(match.dateTimeGMT);
          return matchDate >= todayStart && matchDate <= todayEnd;
        });

        const upcomingMatches = allMatches.filter((match) => {
          const matchDate = new Date(match.dateTimeGMT);
          return matchDate > todayEnd; // Only include future matches
        });

        // Sort future matches by date
        upcomingMatches.sort((a, b) => new Date(a.dateTimeGMT) - new Date(b.dateTimeGMT));

        // Set the state for today and future matches
        setTodayMatches(todaysMatches);
        setFutureMatches(upcomingMatches);
        setMatches(allMatches); // Optionally keep all matches in a separate array
      })
      .catch(() => alert('Could not load data'));
  }, []);

  return (
    <div className="App">
      <Navbar />
      <h1>Welcome to Live Score App</h1>
      <Grid container>
        <Grid sm={2}></Grid>
        <Grid sm={8}>
          {matches.length > 0 ? (
            matches.map((match) => (
              <MyCard
                key={match.id}
                match={{
                  name: match.name,
                  dateTimeGMT: match.dateTimeGMT,
                  teams: match.teams,
                  id: match.id
                }}
              />
            ))
          ) : (
            <p>No matches available</p>
          )}
          <Button variant="contained" color="primary">
            Click Here
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
