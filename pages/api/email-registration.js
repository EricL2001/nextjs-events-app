import path from 'path';
import fs from 'fs';

function buildPath () {
	return path.join(process.cwd(), 'data', 'data.json')
}

function extractData (filePath) {
	const jsonData = fs.readFileSync(filePath);
	const data = JSON.parse(jsonData);
	return data;
}


export default function handler ( req, res) {
  const {method} = req;

  // Access our data
  // extract our data (AllEvents)
  // res 404 if there are no AllEvents
  // AllEvents - loop through them and indentify the EventId
  // and the email into emails_registered - write on our data
  //only if email doesn't exist
  // check the format of the email is OK


  const filePath = buildPath();
  const { events_categories, allEvents } = extractData(filePath);

  if(!allEvents) {
  		return res.status(404).json({
  			status: 404,
  			message: 'Events data not found'
  		});
  	}
 
  if(method === "POST") {
  	const { email, eventId } = req.body;

  	const newAllEvents = allEvents.map((ev) => {
  		if(ev.id === eventId) {
  			if(ev.emails_registered.includes(email)) {
  				res.status(409).json({message: 'This email has already been registered'});
  				return ev;
  			}
  			return {
  				...ev, emails_registered:[...ev.emails_registered, email],
  			};
  		}
  		return ev;
  	});


  	fs.writeFileSync(filePath, JSON.stringify({ events_categories, allEvents: newAllEvents }));


  	res.status(200).json({message: `You have been successfully registered for the event with the email: ${email}`,
  	});
  }

}
