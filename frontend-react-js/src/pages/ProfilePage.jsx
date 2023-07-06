
import './ProfilePage.css';
import Welcome from '../assets/Welcome.jpg';
import Avatar from '../assets/Avatar.jpg'; 

export default function ProfilePage() {
  


  
  return (
    <>
      <div id='profilepage-main'>
      <h6>@delphino</h6>
        <div className="card">
          <div className="card__img">
            <img src={Welcome} alt="avatar background" />
          </div>
            <div className="card__avatar">
                <img  src={Avatar} alt="Avatar" />
            </div>
          <div className="email-editprofile">
            <h6>Email: delphino@gmail.com</h6>
            <button id='logout'> Edit Profile</button>
          </div>
          
          <div className='bio'>
            <h5>About Me</h5>
            <p> I am a full stack cloud developer with a particular interest in making things simple and automating daily tasks. I try to keep up with security and best practices, and am always looking for new things to learn. </p>
          </div>
          <div className="post-logout">
           <button>Create Post</button>
            <button id='logout'> Logout</button>
          </div>
          
          </div>
           
        
      </div>
        
    </>
  );
}