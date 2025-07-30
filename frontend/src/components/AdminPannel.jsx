import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "./AuthContext.jsx";
import axios from "axios";
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, IconButton, Typography,
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, FormControlLabel, CircularProgress,
  Pagination, Box
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SunnyIcon from '@mui/icons-material/Sunny';
import server from "../environment.jsx"

export const BASE_URL = server;

export default function AdminPanel() {
  const { userData } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  const totalUser = users.length

   // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
 const [usersPerPage, setUsersPerPage] = useState(10); // default page size



  useEffect(() => {
    // Don't fetch if no user ID
    if (!userData?._id) return;

    // Fetch all users (only admin can)
     setLoading(true);
     axios.post(`${BASE_URL}/api/v1/admin/users`, {}, {
     headers: { "x-user-id": userData._id }
})
    .then((res) => {
      setUsers(res.data);
    })
    .catch((err) => {
      alert("Access denied or error");
    })
    .finally(() => setLoading(false));
  }, [userData]);

  // Delete user


  const handleDeleteClick = (id) => {
    setSelectedUserId(id);
    setOpenConfirm(true);
  };

  const confirmDelete = () => {
    axios.delete(`${BASE_URL}/api/v1/admin/user/${selectedUserId}`, {
      headers: { "x-user-id": userData._id }
    })
    .then(() => {
      const updatedUsers = users.filter(u => u._id !== selectedUserId);
      setUsers(updatedUsers);
      setOpenConfirm(false);
      // Reset pagination if needed
      const totalPages = Math.ceil(updatedUsers.length / usersPerPage);
      if (currentPage > totalPages) setCurrentPage(totalPages);
    })
    .catch(() => alert("Failed to delete user"));
  };

  const cancelDelete = () => {
    setSelectedUserId(null);
    setOpenConfirm(false);
  };
      const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

   const handlePageSizeChange = (event) => {
    setUsersPerPage(event.target.value);
    setCurrentPage(1); // reset to first page
  };

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);



  // Find the selected user for dialog message
  const selectedUser = users.find(u => u._id === selectedUserId);

  return (
    <div>
      <div className="flex justify-between items-center mb-6 ml-6 mr-6">
        <Typography variant="h4" className="font-bold dark:text-blue-500 pt-6">
          <p><b>👑Admin Panel</b></p>         
        </Typography>
        <Typography variant="h6" className={` font-bold pt-6`}>
          <p><b>Total Users- {totalUser}</b></p>         
        </Typography>

        
      </div>
      {loading ? (
        <Box className="flex justify-center items-center h-64">
         <CircularProgress color="primary" size="lg" />
        </Box>
      ) : (
<>
      <TableContainer component={Paper} className={`${darkMode ? "bg-gray-800" : "bg-white"} shadow-lg`}>
        <Table className="flex justify-evenly items-center ">
          <TableHead className="bg-gradient-to-r dark:from-blue-100 dark:to-pink-100" >
            <TableRow >
              <TableCell  style={{color:"black"}} className="text-white font-semibold w-1"><b>S.No</b></TableCell>
              <TableCell style={{color:"black"}} className="text-white font-bold"><b>Username</b></TableCell>
              <TableCell style={{color:"black"}} className="text-white font-bold"><b>Email</b></TableCell>
              <TableCell style={{color:"black"}} className="text-white font-bold"><b>Join Date</b></TableCell>
              <TableCell style={{color:"black"}} className="text-white font-bold"><b>Is Admin</b></TableCell>
              <TableCell style={{color:"black"}} className="text-white font-bold"><b>Action</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentUsers.map((user, index) => (
              <TableRow key={user._id} className="hover:bg-gray-500 dark:hover:bg-gray-500 transition duration-200">
                 <TableCell><b>{(currentPage - 1) * usersPerPage + index + 1}</b></TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.signupDate}</TableCell>                
                <TableCell>{user.isAdmin ? "✅ Yes" : "❌ No"}</TableCell>
                <TableCell>
                  <IconButton color="error" onClick={() => handleDeleteClick(user._id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

           <div className="flex-grow"></div>
           {/* Pagination controls */}
          <Box className="flex justify-center mt-6 mb-3" style={{bottom:0}}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              size="large"
              variant="outlined"
              shape="rounded"
            />
          </Box>
        </>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={openConfirm} onClose={cancelDelete}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          {selectedUser
            ? (selectedUser.isAdmin
                ? "Are you sure you want to delete this Admin?"
                : "Are you sure you want to delete this User?")
            : "Are you sure you want to delete this User?"}
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete} variant="outlined">Cancel</Button>
          <Button onClick={confirmDelete} variant="contained" color="error">Delete</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
