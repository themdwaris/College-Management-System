import { useEffect, useState } from "react";

import {
  createDepartment,
  deleteDepartment,
  getDepartments,
  updateDepartment,
} from "../../services/departmentService";

import DepartmentModal from "../../components/DepartmentModal";

import { Pencil, Trash2, Plus } from "lucide-react";

const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
 const [loading, setLoading] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  const handleSave = async (department) => {
    try {
      if (selectedDepartment) {
        setLoading(true)
        await updateDepartment(selectedDepartment._id, department);
      } else {
        setLoading(true)
        await createDepartment(department);
      }

      fetchDepartments();

      setIsOpen(false);

      setSelectedDepartment(null);
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false)
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this department?");

    if (!confirmDelete) return;

    await deleteDepartment(id);

    fetchDepartments();
  };
  

  const fetchDepartments = async () => {
    try {
      const data = await getDepartments();

      setDepartments(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);
  
  return (
    <div className="text-white">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Departments</h1>

        <button
          onClick={() => {
            setSelectedDepartment(null);
            setIsOpen(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-xl flex items-center gap-2"
        >
          <Plus size={18} />
          Add Department
        </button>
      </div>
      <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-800">
            <tr>
              <th className="text-left p-4">Department Name</th>

              <th className="text-left p-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {departments.map((department) => (
              <tr key={department._id} className="border-t border-slate-800">
                <td className="p-4">{department.name}</td>

                <td className="p-4">
                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        setSelectedDepartment(department);
                        setIsOpen(true);
                      }}
                    >
                      <Pencil className="text-yellow-400" size={18} />
                    </button>

                    <button onClick={() => handleDelete(department._id)}>
                      <Trash2 className="text-red-500" size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <DepartmentModal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          setSelectedDepartment(null);
        }}
        logding={loading}
        onSave={handleSave}
        department={selectedDepartment}
      />
      
    </div>
  );
};

export default Departments;
