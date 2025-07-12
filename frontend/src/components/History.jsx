import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  CircularProgress,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const username = localStorage.getItem("username");


  const fetchHistory = async () => {
  if (!username) {
    console.warn("⚠ No username found in localStorage.");
    setLoading(false);
    return;
  }

  try {
    const res = await axios.get(`http://localhost:8080/api/v1/users/get_history?username=${username}`);
    setHistory(res.data.history || []);
  } catch (err) {
    console.error('Error fetching history:', err);
  } finally {
    setLoading(false);
  }
};


  const deleteItem = async (itemId) => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/users/delete_history_item`, {
        data: { username, itemId }
      });
      setHistory(prev => prev.filter(item => item._id !== itemId));
    } catch (err) {
      console.error('Error deleting item:', err);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <>
    <div className="p-6 space-y-8">
      
       <h2 className="text-3xl font-bold text-center text-blue-400">
          File Upload History
        </h2>
      

      {loading ? (
        <div className="flex justify-center mt-10">
          <CircularProgress />
        </div>
      ) : history.length === 0 ? (
        <Typography variant="body1" className="text-center text-gray-500 mt-10">
          No history found.
        </Typography>
      ) : (
        <div className="space-y-4 mt-6">
          {history.map(item => (
            <Card key={item._id} className="shadow-md">
              <CardContent className="flex justify-between items-center">
                <div>
                  <Typography variant="subtitle1" className="text-lg font-medium">
                    {item.fileName}
                  </Typography>
                  <Typography variant="body2" className="text-gray-500">
                    Uploaded at: {new Date(item.timestamp).toLocaleString()}
                  </Typography>
                </div>
                <IconButton color="error" onClick={() => deleteItem(item._id)}>
                  <DeleteIcon />
                </IconButton>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
    </>
  );
}
