import Image from 'next/image';
import Link from 'next/link';


const EventsPage = ({data}) => {
	return (
		<div class='events_page'>
				{data.map(ev => (
				<Link class='card' key={ev.id} href={`/events/${ev.id}`}>
				
				  <Image src={ev.image} width={400} height={250} alt={ev.title}/><h2 class='title'>{ev.title}</h2> 

				</Link>   
				))}
		</div>
	);
};

export default EventsPage;


export async function getStaticProps() {
  const { events_categories } = await import ('/data/data.json')
  return {
  	props:{
  		data: events_categories,
  	},
  }
}