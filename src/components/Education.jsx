import { useState } from "react";
import ErrorModal from "./ErrorModal";
import React from 'react'


const Education = (props) => {
    const [error, setError] = useState();
    const [educationInfo, setEducationInfo] = useState({
        school: '',
        degree: '',
        dateStart: '',
        dateEnd: ''
    })

    const handleSchool = (e) => {
        setEducationInfo({
            ...educationInfo,
            school: e.target.value
        });
    };
    const handleDegree = (e) => {
        setEducationInfo((prevState => {
            return {
                ...prevState, degree: e.target.value
            }
        }))
    }
    const handleDateStarted = (e) => {
        setEducationInfo((prevState => {
            return {
                ...prevState, dateStart: e.target.value
            }
        }))
    }

    const handleDateEnded = (e) => {
        setEducationInfo((prevState => {
            return {
                ...prevState, dateEnd: e.target.value
            }
        }))
    }

    const handleEducationInfo = (e) => {
        e.preventDefault();
        const eduInfo = {
            school: educationInfo.school,
            degree: educationInfo.degree,
            dateStarted: new Date(educationInfo.dateStart),
            dateEnded: new Date(educationInfo.dateEnd)
        }
        setEducationInfo({
            school: '',
            degree: '',
            dateStart: '',
            dateEnd: ''
        });
        if (eduInfo.school.trim().length === 0 ||
            eduInfo.degree.trim().length === 0)
            setError({
                title: 'Invalid Input',
                message: 'Please enter  valid Information (non-empty values).'
            });
        return;

    }
    const errorHandler = () => {
        setError(null);
    }

    return (
        <div onConfirm={errorHandler}>
            {error && <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler} />} 
            <form className='forms' onSubmit={handleEducationInfo}>
            <legend className='header'>Education</legend>
             <label htmlFor="school">School Name:</label>
                <input
                    className='input-lg input-info'
                    type='text'
                    id="school"
                    value={educationInfo.school}
                    name='schoolName'
                    placeholder='Enter your University'
                    onChange={handleSchool}
                />
                <label htmlFor="degree">Degree:</label>
                <input
                    className='input-lg input-info'
                    type='text'
                    value={educationInfo.degree}
                    id="degree"
                    name='titleOfStudy'
                    placeholder='Enter Degree'
                    onChange={handleDegree}
                />
                <label htmlFor="date">Start Date:</label>
                <input
                    className='input-lg input-info'
                    type='date'
                    value={educationInfo.dateStart}
                    id="date"
                    name='dateOfStudy'
                    placeholder='Enter Start Date'
                    onChange={handleDateStarted}
                />
                <label htmlFor="date2">End Date:</label>
                <input
                    className='input-lg input-info'
                    type='date'
                    id="date2"
                    value={educationInfo.dateEnd}
                    onChange={handleDateEnded}
                    name='endDate'
                    placeholder='Enter End Date'

                />
                <button type="submit" className="btn btn-primary btn1">Save</button>

            </form>
        </div>
    )
};

export default Education;