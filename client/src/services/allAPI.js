import axiosConfig from "./axiosConfig"

const serverURL="https://studentdb-3ep3.onrender.com"


//add student
export const addStudentAPI = async (reqBody) => {
    return await axiosConfig("POST",`${serverURL}/students`,reqBody)
}

//get all students
export const getAllStudentsAPI = async () => {
    return await axiosConfig("GET",`${serverURL}/students`, {})
}

//edit student
export const editStudentAPI = async (studentData, studentId) => {
    return await axiosConfig("PUT",`${serverURL}/students/${studentId}`,studentData)
}

//delete student
export const deleteStudentAPI = async (studentId) => {
    return await axiosConfig("DELETE",`${serverURL}/students/${studentId}`, {})
}
