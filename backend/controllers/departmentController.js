import Department from "../models/Department.js";

const getDepartments = async (req, res) => {
  const departments = await Department.find();

  res.json(departments);
};

const createDepartment = async (req, res) => {
  const { name, description } = req.body;

  if (!name) {
    return res.status(400).json({
      message: "Department name is required",
    });
  }

  const department = await Department.create({
    name,
    description,
  });

  res.status(201).json(department);
};

const updateDepartment = async (req, res) => {
  const { name, description } = req.body;

  const department = await Department.findById(req.params.id);

  if (!department) {
    return res.status(404).json({
      message: "Department not found",
    });
  }

  department.name = name || department.name;
  department.description = description || department.description;

  await department.save();

  res.json(department);
};

const deleteDepartment = async (req, res) => {
  const department = await Department.findById(req.params.id);

  if (!department) {
    return res.status(404).json({
      message: "Department not found",
    });
  }

  await department.deleteOne();

  res.json({
    message: "Department Deleted",
  });
};

export {
  getDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
};