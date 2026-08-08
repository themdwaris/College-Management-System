import { useEffect, useState } from "react";

const DepartmentModal = ({
  isOpen,
  onClose,
  onSave,
  department,
  loading
}) => {
  const [name, setName] = useState("");

  useEffect(() => {
    if (department) {
      setName(department.name);
    } else {
      setName("");
    }
  }, [department]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    onSave({
      name,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-md p-6">

        <h2 className="text-2xl font-bold text-white mb-6">
          {department ? "Edit Department" : "Add Department"}
        </h2>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="Department Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500"
            required
          />

          <div className="flex justify-end gap-3 mt-6">

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-lg bg-slate-700 hover:bg-slate-600"
            >
              Cancel
            </button>

            <button
             disabled={loading}
              type="submit"
              className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) :department?.name?(
                "Update"
              ) : (
                "Add"
              )}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default DepartmentModal;