import React, { useState, useEffect } from 'react';
import { Box, TextField, List, ListItem, ListItemText, Paper } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

  useEffect(() => {
    const debounceSearch = setTimeout(() => {
      if (query) {
        axios.get(`${API_URL}/search?q=${query}`)
          .then(response => setResults(response.data))
          .catch(err => console.error(err));
      } else {
        setResults([]);
      }
    }, 2000);

    return () => clearTimeout(debounceSearch);
  }, [query]);

  const handleItemClick = (id) => {
    navigate(`/product/${id}`);
    setShowResults(false);
    setQuery('');
  };

  return (
    <Box sx={{
      position: 'relative',
      width: '100%',
      maxWidth: '600px',
      mx: 'auto',
      flexGrow: 1
    }}>
      <TextField
        fullWidth
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setShowResults(true)}
        placeholder="Search medicines..."
        size="small"
        sx={{
          backgroundColor: '#f5f5f5',
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'transparent',
            },
            '&:hover fieldset': {
              borderColor: 'transparent',
            },
          }
        }}
      />
      {showResults && results.length > 0 && (
        <Paper
          sx={{
            position: 'fixed', // Change to fixed for mobile
            top: { xs: '64px', sm: 'auto' }, // Adjust based on header height
            left: { xs: 0, sm: 'auto' },
            right: { xs: 0, sm: 'auto' },
            width: { xs: 'auto', sm: 'auto' ,md: '100%'}, // Full width on mobile
            zIndex: 1000,
            mt: { xs: 0, sm: 0.5 },
            maxHeight: { xs: 'calc(100vh - 64px)', sm: '300px' },
            overflow: 'auto',
            position: { xs: 'fixed', sm: 'absolute' }
          }}
        >
          <List>
            {results.map((item) => (
              <ListItem
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                sx={{
                  cursor: 'pointer',
                  '&:hover': { backgroundColor: '#f5f5f5' }
                }}
              >
                <ListItemText
                  primary={item.productName}
                  secondary={item.company}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
};

export default SearchBar;
