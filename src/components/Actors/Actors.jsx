import React, { useState } from 'react';
import { Typography, Button, Grid, Box, CircularProgress } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useParams, useHistory } from 'react-router-dom';

import useStyles from './styles';
import { useGetActorQuery, useGetMoviesByActorIDQuery } from '../../services/TMDB';
import { MovieList, Pagination } from '..';

const Actors = () => {
  const [page, setPage] = useState(1);

  const classes = useStyles();
  const { id } = useParams();
  const history = useHistory();
  const { data, isFetching, error } = useGetActorQuery({ person_id: id });
  const { data: movies } = useGetMoviesByActorIDQuery({ person_id: id, page });

  if (isFetching) {
    <Box display="flex" justifyContent="center">
      <CircularProgress size="8rem" />
    </Box>;
  }

  if (error) {
    <Box display="flex" justifyContent="center" align="center">
      <Button startIcon={<ArrowBack />} onClick={() => history.goBack()} color="primary"> Go back </Button>
    </Box>;
  }

  return (
    <>
      <Grid container spacing={3}>
        <Grid item lg={5} xl={4}>
          <img
            className={classes.image}
            src={`https://image.tmdb.org/t/p/w500/${data?.profile_path}`}
            alt={data?.name}
          />
        </Grid>

        <Grid item lg={7} xl={8} style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
          <Typography variant="h2" gutterBottom>{data?.name}</Typography>
          <Typography variant="h5" gutterBottom>Born: {new Date(data?.birthday).toDateString()}</Typography>
          <Typography variant="body1" align="justfy" paragraph>{data?.biography || 'Sorry, no biography yet.'}</Typography>

          <Box marginTop="2rem" display="flex" justifyContent="space-around">
            <Button variant="contained" color="primary" target="_blank" rel="noopener noreferrer" href={`https://www.imdb.com/name/${data?.imdb_id}`}>IMDB</Button>
            <Button startIcon={<ArrowBack />} onClick={() => history.goBack()}>Back</Button>

          </Box>
        </Grid>

        <Box margin="2rem 0">
          <Typography variant="h2" gutterBottom align="center">
            Movies
          </Typography>
          {movies
            ? <MovieList movies={movies} numberOfMovies={12} />
            : <Box>Sorry, not thing found</Box>}
          <Pagination currentPage={page} setPage={setPage} totalPages={movies?.total_pages} />
        </Box>
      </Grid>
    </>
  );
};

export default Actors;
