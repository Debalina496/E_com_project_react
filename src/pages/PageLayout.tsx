import React from 'react';
import { Box } from '@mui/material';


const PageLayout = ({children}: {children: React.ReactElement}) => (
  <Box sx={{ p: 2 }}>
    {children}
  </Box>
);

export default PageLayout;
