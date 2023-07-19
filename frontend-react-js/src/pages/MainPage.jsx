import LeftSideNav from '../components/LeftSideNav';
import Homepage from './Homepage';
import RightSideNav from '../components/RightSideNav';
import WelcomePage from './WelcomePage';
import SignUpPage from './SignUpPage';
import LoginPage from './LoginPage';
import ProfilePage from './ProfilePage';
import Chat from '../components/Chat';
import NotificationsPage from './NotificationsPage';
import FriendsPage from './FriendsPage';
import PostCreationPage from './PostCreationPage';
import EditProfilePage from './EditProfilePage';
import HomePage from './Homepage';
import './MainPage.css';
import { useSelector } from 'react-redux';
import Search from '../components/Search';

function MainPage() {
  const { ui } = useSelector((state) => state.ui);
  
  return (
    <>
      <div id='landing-page'>
        <div id='NavLeft'>
          <LeftSideNav />
        </div>
        <div id='pages'>
          <Search />
          {ui === 'profile' && (
            <div id='mainpage_wrapper'>
              <ProfilePage />
            </div>
          )}
          {ui === 'home' && (
            <div id='mainpage_wrapper'>
              <HomePage />
            </div>
          )}
          {ui === 'notifications' && (
            <div id='mainpage_wrapper'>
              <NotificationsPage />
            </div>
          )}
          {ui === 'chats' && (
            <div id='mainpage_wrapper'>
              <Chat />
            </div>
          )}
          {ui === 'friends' && (
            <div id='mainpage_wrapper'>
              <FriendsPage />
            </div>
          )}
          {ui === 'editprofile' && (
            <div id='mainpage_wrapper'>
              <EditProfilePage />
            </div>
          )}
          {ui === 'createpost' && (
            <div id='mainpage_wrapper'>
              <PostCreationPage />
            </div>
          )}
          {ui === 'search' && (
            <div id='mainpage_wrapper'>
              <Search />
            </div>
          )}
        </div>
        <div id='NavRight'>
          <RightSideNav />
        </div>
      </div>
    </>
  );
}

export default MainPage;
