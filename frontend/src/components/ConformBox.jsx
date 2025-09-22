const ConfirmBox = ({ title, message, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-lg w-96 text-center">
        <h2 className="text-lg font-semibold mb-4 text-black">{title}</h2>
        <p className="mb-6 text-black">{message}</p>

        <div className="flex justify-center gap-4">
          <button
            onClick={onConfirm}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Yes
          </button>
          <button
            onClick={onCancel}
            className=" text-white px-4 py-2 rounded bg-green-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmBox;
