import React from "react";
import { useState } from "react";
import ErrorModal from "./ErrorModal";

const Experience = () => {
  const [error, setError] = useState("");
  const [experienceInfo, setExperienceInfo] = useState({
    company: "",
    position: "",
    mainTask: "",
    dateFrom: "",
    dateTo: "",
  });

  const handleCompany = (e) => {
    setExperienceInfo((prevState) => {
      return { ...prevState, company: e.target.value };
    });

    console.log("company:", e.target.value);
  };
  const handlePosition = (e) => {
    setExperienceInfo((prevState) => {
      return {
        ...prevState,
        position: e.target.value,
      };
    });
  };

  const handleMainTask = (e) => {
    setExperienceInfo({
      ...experienceInfo,
      mainTask: e.target.value,
    });
    console.log("maintask:", e.target.value);
  };
  const handledateFrom = (e) => {
    setExperienceInfo({
      ...experienceInfo,
      dateFrom: e.target.value,
    });
  };
  const handledateTO = (e) => {
    setExperienceInfo({
      ...experienceInfo,
      dateTo: e.target.value,
    });
  };

  const handleExperienceInfo = (e) => {
    e.preventDefault();
    setExperienceInfo({
      company: "",
      position: "",
      mainTask: "",
      dateFrom: "",
      dateTo: "",
    });

    if (
      experienceInfo.company.trim().length === 0 ||
      experienceInfo.position.trim().length === 0 ||
      experienceInfo.mainTask.trim().length === 0 ||
      !experienceInfo.dateFrom ||
      !experienceInfo.dateTo
    )
      setError({
        title: "Invalid Input",
        message: "Please enter  valid Information (non-empty values).",
      });
    return;
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <div onConfirm={errorHandler}>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <form className="forms" onSubmit={handleExperienceInfo}>
        <legend className="header">Experience</legend>
        <label htmlFor="company">Company Name:</label>
        <input
          className="input-lg input-info"
          type="text"
          id="company"
          value={experienceInfo.company}
          name="companyName"
          placeholder="Enter your company name"
          onChange={handleCompany}
        />
        <label htmlFor="position">Position Title:</label>
        <input
          className="input-lg input-info"
          type="text"
          id="position"
          value={experienceInfo.position}
          name="positionTitle"
          placeholder="Enter your position title"
          onChange={handlePosition}
        />
        <label htmlFor="task">Main Tasks:</label>
        <input
          className="input-lg input-info textarea-info"
          type="text"
          id="task"
          value={experienceInfo.mainTask}
          name="mainTasks"
          placeholder="Enter your main tasks"
          onChange={handleMainTask}
        />
        <label htmlFor="date">Date From:</label>
        <input
          className="input-lg input-info"
          type="date"
          id="date"
          value={experienceInfo.dateFrom}
          name="date"
          placeholder="Enter date from"
          onChange={handledateFrom}
        />
        <label htmlFor="date2">Date To:</label>
        <input
          className="input-lg input-info"
          type="date"
          id="date2"
          value={experienceInfo.dateTo}
          name="dateTo"
          placeholder="Enter date to"
          onChange={handledateTO}
        />
        <button type="submit" className="btn btn-primary btn1">
          Save
        </button>
      </form>
    </div>
  );
};
export default Experience;
