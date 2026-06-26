
import { useEffect, useState } from 'react';
import './App.css'
import Header from './components/Header'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { addStudentAPI, deleteStudentAPI, editStudentAPI, getAllStudentsAPI } from './services/allAPI';

function App() {
  const [show, setShow] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [edit, setEdit] = useState(false)
  const [deleteId, setDeleteId] = useState("")

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDeleteModalClose = () => setShowDelete(false);
  const handleDeleteModalShow = () => setShowDelete(true);

  console.log(deleteId);

  const [studentData, setStudentData] = useState({
    name: "",
    email: "",
    course: "",
    year: ""
  })

  const [studentRecords, setStudentRecords] = useState([])

  const loadStudents = async () => {
    try {
      const result = await getAllStudentsAPI()
      console.log(result);
      setStudentRecords(result.data)


    } catch (error) {
      console.log(error);
    }

  }

  const handleAdd = async () => {
    const { name, email, course, year } = studentData

    if (name == "" || email == "" || !email.includes("@") || course == "" || !year) {
      alert("Error: Form not filled completely")
    } else {
      try {
        const result = await addStudentAPI(studentData)
        if (result.status == 201) {

          alert("student data entered successfully")
          loadStudents()
          setStudentData({
            name: "",
            email: "",
            course: "",
            year: ""
          })
          handleClose()
          console.log(result);
        }

      } catch (error) {
        console.log(error);
      }



    }
  }

  const handleEdit = (student) => {
    setStudentData(student)
    setEdit(true)
    handleShow()
  }

  const pushEdit = async () => {
    try {
      const result = await editStudentAPI(studentData, studentData?.id)
      console.log(result);
      if (result.status == 200) {
        alert("edit successful")
        loadStudents()
        handleClose()
        setEdit(false)
        setStudentData({
          name: "",
          email: "",
          course: "",
          year: ""
        })
      }

    } catch (error) {
      console.log(error);
    }

  }

  const handleDelete = async () => {
    try {
      const result = await deleteStudentAPI(deleteId)
      console.log(result);
      if (result.status == 200) {
        alert("Record deleted successfully")
      }
      loadStudents()


    } catch (error) {
      console.log(error);
    }


  }

  useEffect(() => {
    loadStudents()
  }, [])

  return (
    <>
      <Header handleShow={handleShow} handleClose={handleClose} />

      {/* Cards */}
      <section style={{
        width: "100%",
        backgroundColor: "#142e0f"
      }} className='min-vh-100'>
        <h1 className='text-center text-white py-5 fw-bold'>Available records:</h1>
        <div className="container d-flex justify-content-center align-items-center gap-5">
          {
            studentRecords.map((item, index) => (
              <div key={item.id} className="text-white border rounded-4 p-4 d-flex flex-column flex-wrap gap-2 h-100" style={{
                backgroundColor: "#21361c",
                height: "100%"
              }}>
                <h4 className='border border-white py-2 rounded-5 px-3' style={{
                  backgroundColor: "#183d18"
                }} >#{item.id}</h4>
                <h3 className='fw-bold'>{item.name}</h3>
                <h4>Course: {item.course}</h4>
                <h4>Year: {item.year}</h4>
                <div className="d-flex w-100 justify-content-between">
                  <button onClick={() => handleEdit(item)} className='btn btn-warning'>Edit</button>
                  <button onClick={() => {
                    handleDeleteModalShow()
                    setDeleteId(item.id)
                  }} className='btn btn-danger'>Delete</button>
                </div>
              </div>
            ))
          }
        </div>

      </section>

      {/* modal for data entry */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header style={{
          backgroundColor: "#034003",
          color: "white"
        }} closeButton>
          {
            edit ? <Modal.Title>Edit student record</Modal.Title>
              :
              <Modal.Title>Add student record</Modal.Title>
          }
        </Modal.Header>
        <Modal.Body style={{
          backgroundColor: "#034003"
        }} className='d-flex flex-column gap-3' s>
          <input style={{
            backgroundColor: "#142e0f",
            color: "white"
          }} value={studentData.name} onChange={(e) => setStudentData({ ...studentData, name: e.target.value })} className='rounded-4 py-3' type="text" placeholder='Enter Student name' />
          <input style={{
            backgroundColor: "#142e0f",
            color: "white"
          }} value={studentData.email} onChange={(e) => setStudentData({ ...studentData, email: e.target.value })} className='rounded-4 py-3' type="email" placeholder='Enter Student email' />
          <input style={{
            backgroundColor: "#142e0f",
            color: "white"
          }} value={studentData.course} onChange={(e) => setStudentData({ ...studentData, course: e.target.value })} className='rounded-4 py-3' type="text" placeholder='Enter student course' />
          <input style={{
            backgroundColor: "#142e0f",
            color: "white"
          }} value={studentData.year} onChange={(e) => setStudentData({ ...studentData, year: e.target.value })} className='rounded-4 py-3' type="text" placeholder='Enter student year' />
        </Modal.Body>
        {
          edit ? <Modal.Footer style={{
            backgroundColor: "#034003",
            color: "white"
          }}>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="" onClick={pushEdit} style={{
              backgroundColor: "#399926"
            }}>
              Edit record
            </Button>
          </Modal.Footer>
            :
            <Modal.Footer style={{
              backgroundColor: "#034003",
              color: "white"
            }}>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleAdd} style={{
                backgroundColor: "#399926"
              }}>
                Add record
              </Button>
            </Modal.Footer>
        }
      </Modal>

      <Modal show={showDelete} onHide={handleDeleteModalClose}>
        <Modal.Header style={{
          backgroundColor: "#034003",
          color: "white"
        }} closeButton>
          <Modal.Title className='text-white'>Confirm Action</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{
          backgroundColor: "#034003"
        }} className='text-white' >Are you sure you want to delete this record?</Modal.Body>
        <Modal.Footer style={{
          backgroundColor: "#034003"
        }}>
          <Button variant="secondary" onClick={handleDeleteModalClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => {
            handleDelete()
            handleDeleteModalClose()
          }}>
            Proceed
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default App
