import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourseInfo } from "../../Redux/course/courseAction";
import { Col, Container, Row } from "react-bootstrap";
import Spinner_comp from "../../components/Spinner/Spinner_comp";
import Axios from "axios";
import {useHistory } from "react-router-dom";


const useStyles = makeStyles({
    media: {
      height: 140,
    },
  });
  
  const QuizCard = () => {
    const classes = useStyles();
    const [quizs, setQuizs] = useState([]);
    const { user } = useSelector((state) => state.auth);
    const history = useHistory();
  
    useEffect(() => {
      if (user.teacherType) {
        fetch(`/quiz/quiz/${user.teacherType}`, {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + localStorage.getItem("auth_token"),
          },
        })
          .then((res) => res.json())
          .then((data) => {
            setQuizs(data.quiz);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }, [user.teacherType]);
  
    useEffect(() => {}, [quizs]);
  
    const enrollHandler = (id) => {
      history.push(`/main-quiz/${id}`);
    };
  

  return (
    <Container>
      <Row className="g-4">
        {quizs.length > 0 ? (
          quizs.map((val) => {
            return (
              <Col key={val._id} className="g-4" md={4}>
                <Card className="m-3">
                  <CardActionArea>
                    <CardMedia
                      className={classes.media}
                      //image={}
                      title="Contemplative Reptile"
                    />
               
                  </CardActionArea>
                  <CardActionArea className='p-2'>
                  <Button onClick={()=>enrollHandler(val._id)} variant='contained' color="primary" >Start Quiz</Button>
                    
                  <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {user.teacherType}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {val.quizDesc}
                      </Typography>
                    </CardContent>

                  </CardActionArea>
                </Card>
              </Col>
            );
          })
        ) : (
          <div className="d-flex justify-content-center align-items-center w-100 h-100">
            <Spinner_comp />
          </div>
        )}
      </Row>
    </Container>
  );
};

export default QuizCard;
