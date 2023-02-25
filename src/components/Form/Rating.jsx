import * as React from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import Button from '@mui/material/Button';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const labels = {
  1: 'Useless+',
  2: 'Poor+',
  3: 'Ok+',
  4: 'Good+',
  5: 'Excellent+',
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

export default function HoverRating({ question, name, url }) {
  const [value, setValue] = React.useState(0);
  const [hover, setHover] = React.useState(-1);
  const dispatch = useDispatch();
  const history = useHistory();
  const goNext = () => {
    if (value === 0) {
      alert('Please select a value');
      return;
    }

    const feedBack = {
      name,
      value,
    };
    dispatch({ type: 'SET_FEEDBACK', payload: feedBack });
    history.push(url);
  };
  return (
    <>
      <h2>{question}</h2>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Box
          sx={{
            width: 200,
            display: 'flex',
            alignItems: 'center',
            mb: 3
          }}
        >
          <Rating
            name="hover-feedback"
            value={value}
            precision={1}
            getLabelText={getLabelText}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            onChangeActive={(event, newHover) => {
              setHover(newHover);
            }}
            emptyIcon={
              <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
            }
          />
          {value !== null && (
            <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
          )}
        </Box>
      </div>
      <Button onClick={goNext} variant="contained">
        NEXT
      </Button>
    </>
  );
}
