import { Button, Divider } from '@material-ui/core';
import  {React,useParams} from 'react';
import { Link } from 'react-router-dom';
import Styles from './CourseCard.module.css'
import LazyLoad from 'react-lazyload';
import LockOpenIcon from '@material-ui/icons/LockOpen';


const CourseCard = ({title,name,id,img,buttonName,handlePublishClick,viewAll=0}) => {

            
    const handleButtonClick = () => {
        console.log("OnClick Event")
        handlePublishClick(id);
      };

    return (
        <LazyLoad height={200} offset={100} once={true} >
        <div className={Styles.course__Card}>
            <Link to={`/course/${id}/${viewAll}`} className={Styles.container}>
            <img className={Styles.image} src={img}alt=""/>
            <div className={Styles.overlay}>
            <p className={Styles.text}>View</p>
            </div>
            </Link>
            
            
            <div className={Styles.course__content}>    
                <span>Jan-Jun 2021</span>
                <h5>{name}</h5>
                <h5>{title}</h5>
                {buttonName === "Enroll" || buttonName === "Publish" ?(<Button color='primary' variant="contained" onClick={handleButtonClick} >{buttonName}</Button>):(<LockOpenIcon />)}<br/>
                <span>This is a course template which is to be used as the course kit for the teachers.</span>
            </div>
            
        </div>
        <Divider/>
        </LazyLoad>
    );
};

export default CourseCard;