import React from 'react';
import { CircularProgress, Box } from '@mui/material';

function Loading() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',  // 半透明の背景
        zIndex: 9999  // 最前面に表示
      }}
    >
      <CircularProgress 
        size={60}
        thickness={4}
        sx={{
          color: '#1976d2'  // Material-UIのデフォルトの青色
        }}
      />
    </Box>
  );
}

export default Loading;
