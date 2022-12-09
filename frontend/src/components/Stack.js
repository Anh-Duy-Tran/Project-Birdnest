import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

const Stack = () => {
  return (
    <Box sx={{ width: '100%' }}>
      <Stack spacing={2}>
        <p>1</p>
        <p>2</p>
        <p>3</p>
      </Stack>
    </Box>
  );
}

export default Stack