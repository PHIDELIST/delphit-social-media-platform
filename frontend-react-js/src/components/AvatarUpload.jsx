import axios from 'axios';
import { presurl } from '../utilis';

export default function ProfileForm() {
  const s3upload = async () => {
    const inputElement = document.querySelector('input[name="avatarupload"]');
    const file = inputElement.files[0];
    const userID = 'data'; 

    if (file) {
      const extension = file.name.split('.').pop();
      const requestBody = {
        userID: userID,
        extension: extension,
      };

      try {
        console.log('Requesting presigned URL...');
        const response = await axios.post(presurl, requestBody);

        if (response.status === 200) {
          const presignedurl = response.data.url;
          console.log('Received presigned URL:', presignedurl);

           

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
              console.log('Upload failed:', uploadResponse);
            }
          } catch (err) {
            console.log('Error uploading file:', err);
          }
        } else {
          console.log('Failed to get presigned URL:', response);
        }
      } catch (err) {
        console.log('Error requesting presigned URL:', err);
      }
    } else {
      console.log('No file selected.');
    }
  };

  return (
    <div className="profile-form">
      <input type="file" name="avatarupload" />
      <button onClick={s3upload}>Upload</button>
    </div>
  );
}
