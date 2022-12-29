import Image from 'next/image';
import Link from 'next/link';

const EventsCatPage = ({ data, pageName }) => {
	return (
		<div class='cat_events'>
			<h1 class='page_title'> Events in {pageName} </h1>

			<div class='content'>
				{data.map((ev) => (
			  	<Link class='card' key={ev.id} href={`/events/${ev.city}/${ev.id}`}>
			  
			  	<Image width={400}  height={250} alt={ev.title} src={ev.image} /> <h2 class='title'> {ev.title} </h2>
			      	<p class='description'> {ev.description} </p>
			 
			  	</Link>
				))}
			</div>

		</div>
	);
};

export default EventsCatPage;

// generate different page paths dynamically by id
export async function getStaticPaths() {
	const { events_categories } = await import ('/data/data.json');
	const allPaths = events_categories.map(ev => {
		return {
	   	  params:{
	   	    cat: ev.id.toString(),
	   	  },
		};
	});

	return {
	  paths: allPaths,
	  fallback: false,
	};
}

//once it has the pages we need to fetch the json data for each page by the city
export async function getStaticProps(context) {
	const id = context?.params.cat;
	const { allEvents } = await import ('/data/data.json');

	const data = allEvents.filter(ev => ev.city === id);

    return { props: { data, pageName: id } };
}