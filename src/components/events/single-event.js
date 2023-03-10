import React, { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';



const SingleEvent = ({ data }) => {
	const inputEmail = useRef();
	const router = useRouter();
	const [message, setMessage] = useState('');

	const onSubmit = async (e) => {
		e.preventDefault();
		const emailValue = inputEmail.current.value;
		const eventId = router?.query.id;

		const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    	if (!emailValue.match(validRegex)) {
      		setMessage('Please introduce a correct email address');
    	}


		try {
			const response = await fetch('/api/email-registration', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',	
				},
				body: JSON.stringify({ email: emailValue, eventId }),
			});

			if(!response.ok) throw new Error(`Error: ${response.status}`);
			  const data = await response.json();
			    setMessage(data.message);
      			inputEmail.current.value = '';

			  	console.log('POST', data);
	
		} catch (e) {
			console.log(e); 
		}
	};


	return (
	  <div class='event_single_page'>
	  	<h1> {data.title} </h1>
	  	<Image alt="image" src={data.image} width={500} height={350} />
	  	<p> {data.description} </p>

	  	<form onSubmit={onSubmit} class='email_registration'>
	  	  <label> Get Registered For This Event! </label>
	  	  <input ref={inputEmail} type="email" id="email" placeholder=' Please input your email address'/><button type="submit"> Submit </button>
	  	</form>
	  	<p>{message}</p>
	  </div>
	);
};

export default SingleEvent;