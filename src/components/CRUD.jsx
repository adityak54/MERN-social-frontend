import { MdClose } from "react-icons/md";
import { useState } from "react";


const AddEdit = ({ state, setState, handleSubmit }) => {
  const [title, setTitle] = useState(null);
  const [content, setContent] = useState("");

  return (
    <div className="flex flex-col gap-4 bg-black z-50 text-white p-4 relative border border-black rounded mx-20 ">
      <button
        className="absolute top-3 right-3 border-[1px] rounded p-1"
        onClick={() => setState("")}
      >
        <MdClose />
      </button>
      <h2 className="text-2xl font-bold mb-4">{state.toUpperCase()}</h2>
      <form
        onSubmit={(e) => {
          handleSubmit(e, title, content);
        }}
        className="flex flex-col"
      >
        <label htmlFor="title" className="text-lg mb-2">
          IMAGE:
        </label>
        <input
          onChange={(e) => setTitle(e.target.files[0])}
          type="file"
          id="title"
          className="bg-gray-600 text-white p-2 mb-4"
        />

        <label htmlFor="content" className="text-lg mb-2">
          CAPTION:
        </label>
        <input
          onChange={(e) => setContent(e.target.value)}
          id="content"
          className="bg-gray-600 text-white p-2 mb-4"
          rows="4"
        ></input>
        <div className="flex flex-row justify-center">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEdit;
