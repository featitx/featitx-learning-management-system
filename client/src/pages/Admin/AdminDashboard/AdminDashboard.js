import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import SidebarAdmin from "./SidebarAdmin/SidebarAdmin";
import Styles from "./AdminDashboard.module.css";
import {  Button, IconButton, Paper, Typography } from "@material-ui/core";
import MainSidebar from "./MainSidebar/MainSidebar";
//import Styles from "./../Course/AdminCourseInfo.module.css";
import AddCourse from "./../Course/AddCourse/AddCourse";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";
import TeacherTable from "../Teacher/TeacherTable/TeacherTable";
import StudentTable from "../Student/StudentTable/StudentTable";
import CourseInfoTable from "./../Course/AddCourse/CourseInfoTable/CourseInfoTable"


const AdminDashboard = () => {

  const [course, setCourse] = useState(false);

  const [teachers, setTeachers] = useState(false);

  const [students, setStudents] = useState(false);

  const showCourses = () => {
    setTeachers(false);
    setCourse(!course)
    setStudents(false);  };

  const showTeachers = () => {
    setTeachers(!teachers);
    setCourse(false)
    setStudents(false);
  };

  const showStudents = () => {
    setTeachers(false);
    setCourse(false)
    setStudents(!students);  };



  return (
    <Container fluid>
      <Row>
        <Col
          md={2}
          sm={12}
          className={`d-none d-md-block`}
        >
          <MainSidebar/>
          
        </Col>
        <Col md={10} className={Styles.main__body}>
          <Container>
            <Paper>
              <Typography
                className="text-center text-primary py-5"
                variant="h4"
              >
                Welcome to Admin Dashboard
                
              </Typography>
            </Paper>
            <div className={Styles.add__course}>
                <AddCourse course={course} setCourse={setCourse} />
              </div>
              {course ? (
              <Container>
                <Row>
                  <CourseInfoTable course={course} setCourse={setCourse} />
                </Row>
              </Container>
            ) : null}
              <div className={Styles.add__course}>
              
        <Paper className="p-3 px-5 rounded shadow my-3">
          <IconButton style={{ backgroundColor: "green", textAlign: "center" }}>
            <ImportContactsIcon className={Styles.icon__style} />
          </IconButton>

          <div className="text-center my-3">
            <Button
              onClick={showTeachers}
              variant="contained"
              color="primary"
              className="text-center"
            >
              View Teachers
            </Button>
            { teachers?(
              <Container>
                <Row>
                  <TeacherTable course={teachers} setTeachers={setTeachers} />
                </Row>
              </Container>
            ):null}
          </div>
        </Paper>
        <Paper className="p-3 px-5 rounded shadow my-3">
          <IconButton style={{ backgroundColor: "green", textAlign: "center" }}>
            <ImportContactsIcon className={Styles.icon__style} />
          </IconButton>

          <div className="text-center my-3">
            <Button
              onClick={showStudents}
              variant="contained"
              color="primary"
              className="text-center"
            >
              View Students
            </Button>
            {students?(
              <Container>
                <Row>
                  <StudentTable course={students} setStudents={setStudents} />
                </Row>
              </Container>
            ):null}
          </div>
        </Paper>
        </div>
        
          </Container>
         
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;
