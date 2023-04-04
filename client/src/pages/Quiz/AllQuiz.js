
import { Typography } from '@material-ui/core';
import React,{lazy, Suspense} from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import QuizCard from './QuizCard';


const AllQuiz = () => {
    return (
        <div>
            <Container>
               <Typography className='text-center my-3 border-bottom' variant='h3' color="primary" >
                   All Quiz
               </Typography>
               <Suspense  fallback={<div>Loading...</div>}>
               <QuizCard/>
               </Suspense>
            
            </Container>
        </div>
    );
};

export default AllQuiz;