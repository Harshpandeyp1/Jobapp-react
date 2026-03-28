import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
    Card,
    Grid,
    Typography,
  } from "@mui/material";
  import axios from "axios";
  import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

const AllPosts = () => {
    const [post, setPost] = useState(null);
    const navigate = useNavigate();

    const handleEdit = (id) => {
      navigate("/edit",{state:{id}});
    }

    useEffect(() => {
        const fetchInitialPosts = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/jobPosts`);
                setPost(response.data);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        }
         fetchInitialPosts();
      }, []);

      const handleDelete = async (id) => {
        try {
          await axios.delete(`http://localhost:8080/jobPost/${id}`);
          setPost(post.filter(p => p.postId !== id));
        } catch (error) {
          console.error("Error deleting post:", error);
        }
      }

  return (
    <>
      <Grid container spacing={2} sx={{ margin: "2%" }}>
      <Grid item xs={12} sx={12} md={12} lg={12}>
      </Grid>
      {post &&
        post.map((p) => {
          return (
            <Grid key={p.postId} item xs={12} md={6} lg={4}>
              <Card sx={{ padding: "3%", overflow: "hidden", width: "84%", backgroundColor:"#ADD8E6" }}>
                <Typography        
                  variant="h5"
                  sx={{ fontSize: "2rem", fontWeight: "600", fontFamily:"sans-serif" }}
                >
             {p.postProfile}
                </Typography>
                <Typography  sx={{ color: "#585858", marginTop:"2%", fontFamily:"cursive" }} variant="body" >
                  Description: {p.postDesc}
                </Typography>
                <br />
                <br />
                <Typography variant="h6" sx={{ fontFamily:"unset", fontSize:"400"}}>
                  Experience: {p.reqExperience} years
                </Typography>
                <Typography sx={{fontFamily:"serif",fontSize:"400"}} gutterBottom  variant="body">Skills : </Typography>
                {p.postTechStack.map((s, i) => {
                  return (
                    <Typography variant="body" gutterBottom key={i}>
                      {s} .
                      {` `}
                    </Typography>
                  );
                })}
               <DeleteIcon onClick={() => handleDelete(p.postId)} style={{ cursor: 'pointer', marginRight: '10px' }} />
                <EditIcon onClick={() => handleEdit(p.postId)} style={{ cursor: 'pointer' }} />
              </Card>
            </Grid>
          );
        })}
    </Grid>
    </>
 
  )
}

export default AllPosts
