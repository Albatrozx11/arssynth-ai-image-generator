import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRandomPrompt } from "../utils";

import { preview } from "../assets";

import { FormField, Loader } from "../components";
const CreatePost = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
  });
  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.prompt && form.photo) {
      setLoading(true);
      try {
        const response = await fetch("http://localhost/:8080/api/v1/post", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(form),
        });

        await response.json();
        navigate("/");
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    } else {
      alert("please enter a prompt");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch("http://localhost:8080/api/v1/sd", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt: form.prompt }),
        });
        const data = await response.json();
        let imageUrl = data.photo;
        const imageUrlData = JSON.parse(imageUrl);
        imageUrl = imageUrlData.output[0];
        console.log(imageUrl);
        setForm({ ...form, photo: imageUrl });
      } catch (error) {
        alert(error);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert("Please enter a prompt!");
    }
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-gray-200 text-[32px]">Create</h1>
        <p className="mt-2 text-[#666e75] text-[16px] max-w-[500px]">
          Create imaginative and visually stunning images through DALL-E AI and
          share them with the community
        </p>
      </div>

      <form className="max-w-3xl mt-16" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <FormField
            labelName="Your name"
            name="name"
            handleChange={handleChange}
            placeholder="Alberto"
            value={form.name}
            type="text"
          />
          <FormField
            labelName="Prompt"
            name="prompt"
            handleChange={handleChange}
            placeholder="an oil painting portrait of a capybara wearing medieval royal robes and an ornate crown on a dark background"
            value={form.prompt}
            type="text"
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />

          <div className="relative bg-[#1E1E1E] border border-gray-800 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
            {form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className="w-full h-full object-contain"
              />
            ) : (
              <img
                src={preview}
                alt={preview}
                className="w-9/12 h-9/12 opacity-40 object-contain"
              />
            )}

            {generatingImg && (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                <Loader />
              </div>
            )}
          </div>
        </div>
        <div className="mt-5 flex gap-5 ">
          <button
            type="button"
            onClick={generateImage}
            className="text-white bg-green-700 w-full font-medium rounded-md text-sm sm:w-auto px-5 py-2.5 text-center"
          >
            {generatingImg ? "Genrating..." : "Generate"}
          </button>
        </div>
        <div className="mt-10">
          <p className="text-[#666e75] text-[14px] mt-2 ">
            Once you have created the image you want, you can share it with the
            community
          </p>
          <button
            className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            type="submit"
          >
            {loading ? "Sharing..." : "Share with the community"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreatePost;
