import React from 'react'
import { useState } from 'react'
import ErrorModal from './ErrorModal';



const GeneralInfo = (props) => {

    const [error, setError] = useState();

    //Saves user-input
    const [getInfo, setGetInfo] = useState({
        name: '',
        email: '',
        phone: '',

    })

    //Saves username
    const handleName = (event) => {
        setGetInfo({
            ...getInfo,
            name: event.target.value
        })
    }
    //saves user-email
    const handleEmail = (event) => {
        setGetInfo((prevState => {
            return {
                ...prevState, email: event.target.value
            }
        }))
    }
    //saves user-number
    const handleNumber = (event) => {
        setGetInfo((prevState => {
            return {
                ...prevState, phone: event.target.value
            }
        }))
    }
    //saves user-input-details
    const submitHandler = (e) => {
        e.preventDefault();
        //retrieves user-input-details
        const generalInfo = {
            name: getInfo.name,
            email: getInfo.email,
            phone: getInfo.phone

        };
        setGetInfo({
            name: '',
            email: '',
            phone: ''
        })

        if (generalInfo.name.trim().length === 0 || generalInfo.email.trim().length === 0 || generalInfo.phone.trim().length === 0) {
            setError({
                title: 'Invalid Input',
                message: 'Please enter  valid Information (non-empty values).'
            });
            return;
        }

    }
    const errorHandler = () => {
        setError(null);
    }



    return (
        <div onConfirm={errorHandler}>
            {error && <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler} />}           <legend className='header'>General Information</legend>
            <form className='form' onSubmit={submitHandler}>
                <label htmlFor='name' >Name:</label>
                <input
                    className='input-lg input-info'
                    type='text'
                    id='name'
                    value={getInfo.name}
                    onChange={handleName}
                    placeholder='Enter your name'
                />
                <label htmlFor='email'>Email:</label>
                <input
                    className='input-lg input-info'
                    type='email'
                    id='email'
                    value={getInfo.email}
                    onChange={handleEmail}
                    placeholder='youremail@gmail.com'
                />
                <label htmlFor='number'>Phone Number:</label>
                <input
                    className='input-lg input-info'
                    type='tel'
                    id='number'
                    value={getInfo.phone}
                    onChange={handleNumber}
                    placeholder='+123456789'
                />

                <button className='btn btn1 btn-primary' type='submit'>Save</button>

            </form>
        </div>
    );
}

export default GeneralInfo;


