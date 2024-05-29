import Profile from './profile';
import './style.css';

export default function Header() {
    return (
        <header className='header flex-ctr-spb'>
            <div className='flex-ctr'>
               
                <a href='#' className=''>
                    <img src='https://res.cloudinary.com/daqxhckof/image/upload/v1711965390/Loyality/lpp-logo_xywtvd.jpg' width={150} alt='logo-light' />
                </a>

            </div>
            <Profile/>
        </header>
    );
}
