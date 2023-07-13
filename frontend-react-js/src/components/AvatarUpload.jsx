import axios from 'axios';
import { presurl } from '../utilis';
import { useSelector } from 'react-redux';
export default function AvatarUpload() {
  const avatarname = useSelector(state => state.user.userID);
  const s3upload = async () => {
    const inputElement = document.querySelector('input[name="avatarupload"]');
    const file = inputElement.files[0];
    const userID = `${avatarname}`; 
    if (file) {
      const extension = file.name.split('.').pop();
      const requestBody = {
        userID: userID,
        extension: extension,
      };
      try {
        const response = await axios.post(presurl, requestBody);
        if (response.status === 200) {
          const presignedurl = response.data.url;
          try {
            console.log(file)
            const uploadResponse = await axios.put(presignedurl,file, {
              method: "PUT",
              body: file,
              headers: {
                'Content-Type': "application/octet-stream",
            }});
            if (uploadResponse.status === 200) {
              console.log('Upload successful');
            } else {  
            }
          } catch (err) {   
          }
        } else {       
        }
      } catch (err) {
      }
    } else {
    }
  };
  return (
    <div className="profile-form">
      <input type="file" name="avatarupload" />
      <button onClick={s3upload}>Upload</button>
    </div>
  );
}
