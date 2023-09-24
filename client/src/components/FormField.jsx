import React from "react";

const FormField = ({
  labelName,
  name,
  type,
  value,
  handleChange,
  isSurpriseMe,
  handleSurpriseMe,
  placeholder,
}) => {
  return (
    <div>
      <div className="flex items-center mb-2 gap-2">
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-200"
        >
          {labelName}
        </label>
        {isSurpriseMe && (
          <button
            type="button"
            onClick={handleSurpriseMe}
            className="font-semibold text-xs bg-[#ECECF1] px-2 py-1 rounded-[5px] text-black"
          >
            Surprise Me
          </button>
        )}
      </div>
      <input
        type={type}
        id={name}
        value={value}
        name={name}
        onChange={handleChange}
        placeholder={placeholder}
        required
        className="bg-[#1E1E1E] border outline-none block border-gray-800 text-gray-900 text-sm rounded-lg w-full p-3 focus:ring-[#4649ff] focus:border-[#4649ff]"
      />
    </div>
  );
};

export default FormField;
