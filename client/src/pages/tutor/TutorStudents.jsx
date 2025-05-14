import { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import GetStudentsByTutor from '../../store/Thunks/Tutor/Profile/GetStudentsByTutor';
const MyStudents = () =>{
  const [students,setStudents] = useState([])
  const dispatch = useDispatch()
  const {data} = useSelector(state=>state.auth)

  useEffect(()=>{
    const fetchStudents = async ()=>{
      const res = await dispatch(GetStudentsByTutor(data.id))
      setStudents(res.payload.data)
    }
    fetchStudents()
    console.log(students);
    
  },[])

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-yellow-500 mb-4">My Students</h2>
      <div className="bg-white shadow rounded overflow-x-auto">
        <table className="min-w-full text-left">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Subject</th>
              <th className="px-4 py-2">Progress</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, idx) => (
              <tr key={idx} className="border-b">
                <td className="px-4 py-2">{student.name}</td>
                <td className="px-4 py-2">{student.email}</td>
                <td className="px-4 py-2"><img src={student.profileUrl} alt="" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

  export default MyStudents;
  
  