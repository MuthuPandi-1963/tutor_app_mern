import { useSelector } from 'react-redux';
import CreateTutorProfile from './CreateTutorProfile';

const EditProfile = () => {
  const data = useSelector(state=>state.auth)
  console.log(data);
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Edit Your Profile</h1>
      <CreateTutorProfile userId={data?.data?.id} />
    </div>
  );
};

export default EditProfile;
