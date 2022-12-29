import Image from 'next/image';
import SingleEvent from '/src/components/events/single-event'

const EventPage = ({ data }) => {
	return (
		<div>
			<SingleEvent data={data}/>
		</div>
	)
}

export default EventPage;

export async function getStaticPaths() {
	const { allEvents } = await import ('/data/data.json');
	const allPaths = allEvents.map(ev => {
		return {
	   	  params:{
	   	  	cat: ev.city,
	   	    id: ev.id,
	   	  },
		};
	});

	return {
		paths: allPaths,
		fallback: false,
	}
}

export async function getStaticProps(context) {
  
  const id = context.params.id;
  const { allEvents} = await import ('/data/data.json');
  const eventData = allEvents.find((ev) => id === ev.id);

  return {
  	props: { data: eventData },
  };
}