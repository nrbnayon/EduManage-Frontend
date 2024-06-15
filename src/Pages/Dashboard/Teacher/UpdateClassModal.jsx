import { useForm } from "react-hook-form";
import { FaEdit, FaTimes } from "react-icons/fa";
import { useEffect } from "react";
import PropTypes from "prop-types";

const UpdateClassModal = ({ isOpen, onClose, onSubmit, initialData }) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: initialData,
  });

  useEffect(() => {
    reset(initialData);
  }, [initialData, reset]);

  const onSubmitForm = (data) => {
    // eslint-disable-next-line no-unused-vars
    const { _id, ...formData } = data;
    onSubmit({ ...formData, price: parseInt(data.price) });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Update Class</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            <FaTimes />
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Title</label>
            <input
              {...register("title")}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Image URL</label>
            <input
              {...register("image")}
              className="w-full p-3 border border-gray-300 text-white rounded "
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Price</label>
            <input
              {...register("price")}
              type="number"
              min={0}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">
              Description
            </label>
            <textarea
              {...register("shortDescription")}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 flex items-center bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
            >
              <FaEdit className="mr-2" /> Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

UpdateClassModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  initialData: PropTypes.shape({
    title: PropTypes.string,
    price: PropTypes.number,
    shortDescription: PropTypes.string,
    image: PropTypes.string,
  }),
};

export default UpdateClassModal;
