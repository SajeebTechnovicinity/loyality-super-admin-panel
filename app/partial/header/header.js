import Profile from './profile';
import './style.css';

export default function Header() {
    return (
        <header className='header flex-ctr-spb'>
            <div className='flex-ctr'>
               
                <a href='#' className=''>
                    <img src='https://res.cloudinary.com/daqxhckof/image/upload/v1720603791/Loyality/LoyaltyPayPoints_utpc3d.png' width={30} alt='logo-light' />
                </a>

            </div>
            <Profile/>
        </header>
    );
}
