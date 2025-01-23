import React, { useContext, useState } from "react";
import { MdCancel } from "react-icons/md";
import { GlobalController } from "../Global";

const MoviesForm = () => {
  const { addMovie, setAddMovie } = useContext(GlobalController);

  const [formData, setFormData] = useState({
    title: '',
    trailer: '',
    thumbnail: '',
    banner: '',
    duration: '',
    genre: [''],
    language: ['English'],
    parentalGuidance: '',
    date_release: '',
    description: '',
    tags: [''],
    cast: [{ name: '', image: '', stage_name: '' }],
    crew: [{ name: '', image: '', stage_name: '' }],
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
  
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'file' ? files[0] : value,
    }));
  
    // console.log(`${name}: ${type === 'file' ? files[0]?.name : value}`);
  };

  const handleArrayChange = (e, field, index) => {
    const { value } = e.target;
    const updatedArray = [...formData[field]];
    updatedArray[index] = value;
    setFormData({ ...formData, [field]: updatedArray });

    // console.log(`Updated ${field}[${index}]:`, value);
  };

  const addField = (field) => {
    setFormData({ ...formData, [field]: [...formData[field], ''] });
  };

  const handleNestedChange = (e, field, index) => {
    const { name, value } = e.target;
    const updatedField = [...formData[field]];
    updatedField[index] = { ...updatedField[index], [name]: value };
    setFormData({ ...formData, [field]: updatedField });
  };

  const addNestedField = (field) => {
    setFormData({
      ...formData,
      [field]: [...formData[field], { name: '', image: '', stage_name: '' }],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Add your submission logic here (e.g., API call)
  };

  return (
    <div className="bg-black/40 top-0 left-0 right-0 fixed flex justify-center items-center min-h-screen z-50">
      <div className="relative bg-white rounded-lg shadow-lg w-[50%] p-6">
        {/* Close Button */}
        <button
          aria-label="Close"
          onClick={() => setAddMovie("")}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
        >
          <MdCancel size={24} />
        </button>

        {/* Form */}
        <h2 className="text-xl font-bold text-center mb-4">Add New Movie</h2>
        <div className="h-[500px] overflow-y-auto">
          <form onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-2 gap-3 mb-4">
              {/* Title */}
              <div className="flex flex-col">
                <label htmlFor="" className="text-xs mb-1">Title <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="title"
                  placeholder="Title"
                  className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>
              {/* Trailer url */}
              <div className="flex flex-col">
                <label htmlFor="" className="text-xs mb-1">Trailer url <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="trailer"
                  placeholder="Trailer url"
                  className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.trailer}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="grid lg:grid-cols-2 gap-3 mb-4">
              {/* Thumbnail */}
              <div className="">
                <label htmlFor="" className="text-xs mb-1">Thumbnail <span className="text-red-500">*</span></label>
                <input
                  className="file-input file-input-bordered w-full" 
                  type="file"
                  name="thumbnail"
                  onChange={handleChange}
                />
              </div>
              {/* banner */}
              <div className="">
                <label htmlFor="" className="text-xs mb-1">Banner <span className="text-red-500">*</span></label>
                <input
                  className="file-input file-input-bordered w-full" 
                  type="file"
                  name="banner"
                  onChange={handleChange}
                />
              </div>
            </div>
            {/* duration */}
            <div className="flex flex-col mb-4">
              <label htmlFor="" className="text-xs mb-1">Duration (minutes) <span className="text-red-500">*</span></label>
              <input
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                placeholder="Duration"
                className="input input-bordered w-full"
              />
            </div>
            <div className="grid lg:grid-cols-2 gap-3 mb-4">
              {/* Parental Guidance */}
              <div className="form-control">
                <label htmlFor="" className="text-xs mb-1">Parental Guidance <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="parentalGuidance"
                  value={formData.parentalGuidance}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>
              {/* Release Date */}
              <div className="form-control">
                <label htmlFor="" className="text-xs mb-1">Released date <span className="text-red-500">*</span></label>
                <input
                  type="date"
                  name="date_release"
                  value={formData.date_release}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>
            </div>
            {/* Description */}
            <div className="form-control mb-4">
              <label htmlFor="" className="text-xs mb-1">Description <span className="text-red-500">*</span></label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="textarea textarea-bordered w-full"
                rows="4"
                required
              ></textarea>
            </div>
            {/* Genre */}
            <div className="form-control">
              <label htmlFor="" className="text-xs mb-1">Genre <span className="text-red-500">*</span></label>
              {formData.genre.map((genre, index) => (
                <input
                  key={index}
                  type="text"
                  value={genre}
                  onChange={(e) => handleArrayChange(e, 'genre', index)}
                  className="input input-bordered w-full mb-1"
                  placeholder="Genre"
                />
              ))}
              <div className="flex justify-end">
                <button type="button" onClick={() => addField('genre')} className="text-xs rounded text-purple-800 hover:bg-gray-100 p-1">
                  Add Genre
                </button>
              </div>
            </div>
            {/* Language */}
            <div className="form-control">
              <label htmlFor="" className="text-xs mb-1">Language <span className="text-red-500">*</span></label>
              {formData.language.map((language, index) => (
                <input
                  key={index}
                  type="text"
                  value={language}
                  onChange={(e) => handleArrayChange(e, 'language', index)}
                  className="input input-bordered w-full mb-1"
                />
              ))}
              <div className="flex justify-end">
                <button type="button" onClick={() => addField('language')} className="text-xs rounded text-purple-800 hover:bg-gray-100 p-1">
                  Add Language
                </button>
              </div>
            </div>
            {/* Tags */}
            <div className="form-control">
              <label htmlFor="" className="text-xs mb-1">Tags <span className="text-red-500">*</span></label>
              {formData.tags.map((tag, index) => (
                <input
                  key={index}
                  type="text"
                  value={tag}
                  placeholder="Tag"
                  onChange={(e) => handleArrayChange(e, 'tags', index)}
                  className="input input-bordered w-full mb-2"
                />
              ))}
              <div className="flex justify-end">
                <button type="button" onClick={() => addField('tags')} className="text-xs rounded text-purple-800 hover:bg-gray-100 p-1">
                  Add Tags
                </button>
              </div>
            </div>
            {/* Cast */}
            <div className="form-control mb-4">
              <label htmlFor="" className="text-xs mb-1">Cast <span className="text-red-500">*</span></label>
              {formData.cast.map((cast, index) => (
                <div key={index} className="grid lg:grid-cols-3 gap-3 mb-2">
                  <input
                    type="text"
                    name="name"
                    value={cast.name}
                    onChange={(e) => handleNestedChange(e, 'cast', index)}
                    placeholder="Name"
                    className="input input-bordered flex-1"
                  />
                  <input
                    type="url"
                    name="image"
                    value={cast.image}
                    onChange={(e) => handleNestedChange(e, 'cast', index)}
                    placeholder="Image URL"
                    className="input input-bordered flex-1"
                  />
                  <input
                    type="text"
                    name="stage_name"
                    value={cast.stage_name}
                    onChange={(e) => handleNestedChange(e, 'cast', index)}
                    placeholder="Stage Name"
                    className="input input-bordered flex-1"
                  />
                </div>
              ))}
              <div className="flex justify-end">
                <button type="button" onClick={() => addNestedField('cast')} className="text-xs rounded text-purple-800 hover:bg-gray-100 p-1">
                  Add Cast Member
                </button>
              </div>
            </div>

            {/* Crew */}
            <div className="form-control mb-4">
              <label htmlFor="" className="text-xs mb-1">Crew <span className="text-red-500">*</span></label>
              {formData.crew.map((crew, index) => (
                <div key={index} className="grid lg:grid-cols-3 gap-3">
                  <input
                    type="text"
                    name="name"
                    value={crew.name}
                    onChange={(e) => handleNestedChange(e, 'crew', index)}
                    placeholder="Name"
                    className="input input-bordered flex-1"
                  />
                  <input
                    type="url"
                    name="image"
                    value={crew.image}
                    onChange={(e) => handleNestedChange(e, 'crew', index)}
                    placeholder="Image URL"
                    className="input input-bordered flex-1"
                  />
                  <input
                    type="text"
                    name="stage_name"
                    value={crew.stage_name}
                    onChange={(e) => handleNestedChange(e, 'crew', index)}
                    placeholder="Stage Name"
                    className="input input-bordered flex-1"
                  />
                </div>
              ))}
              <div className="flex justify-end">
                <button type="button" onClick={() => addNestedField('crew')} className="text-xs rounded text-purple-800 hover:bg-gray-100 p-1">
                  Add Crew Member
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full"
            >
              Add Movie
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MoviesForm;
