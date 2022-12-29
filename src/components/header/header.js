import Link from 'next/link'
import Image from 'next/image'

export const Header = () => {
	return (
		<header>
      <div>
        <div className='topNav'>
        <Image alt="image" src={'/images/rotw-logo.png'} width={75} height={75} />
          <nav> 
            <ul>
              <li>
                <Link href="/"> Home</Link>
              </li>
              <li>
                <Link href="/events"> Events</Link>
              </li>
              <li>
                <Link href="/about-us"> About Us</Link>
              </li>
            </ul>
          </nav>
        </div> 
        <h1> Event App in Next.js </h1>
      </div>
    </header>
	)
}