export default function TaskCard({ task, onUpdate, onDelete }) {
  return (
    <div className="flex justify-between items-center p-2 border rounded-md mb-2">
      <span>{task.title}</span>
      <div className="flex gap-2">
        <button
          onClick={() => onUpdate(task._id)}
          className="bg-yellow-400 px-2 rounded hover:bg-yellow-500"
        >
          Update
        </button>
        <button
          onClick={() => onDelete(task._id)}
          className="bg-red-500 px-2 rounded hover:bg-red-600 text-white"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
