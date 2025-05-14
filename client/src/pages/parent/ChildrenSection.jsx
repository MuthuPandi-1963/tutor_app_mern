// ChildrenSection.jsx
import { Link } from 'react-router-dom';
import { HiPlus } from 'react-icons/hi';
import { useSelector } from 'react-redux';

const ChildrenSection = () => {
    const {children} = useSelector(state=>state.parent)
    
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-blue-900">My Children</h2>
        <Link
          to="/parent/link/children"
          className="bg-yellow-400 text-blue-900 px-4 py-2 rounded-lg hover:bg-yellow-500 flex items-center gap-2"
        >
          <HiPlus /> Add Child
        </Link>
      </div>

      <div className="grid  gap-4">
        {children.map(child => (
          <div key={child._id} className="border border-blue-100 rounded-lg p-4">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-900 font-bold">{child.name[0]}</span>
              </div>
              <div>
                <h3 className="font-bold text-blue-900">{child.name}</h3>
                <p className="text-blue-600 text-sm">{child.email}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="text-sm bg-blue-50 text-blue-900 px-3 py-1 rounded-full">
                View Progress
              </button>
              <button className="text-sm bg-blue-50 text-blue-900 px-3 py-1 rounded-full">
                Schedule Session
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChildrenSection;