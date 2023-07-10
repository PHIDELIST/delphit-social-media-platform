import React from "react";
import process from "process";
import { getAccessToken } from "lib/CheckAuth";
import { API_GATEWAY_ENDPOINT_URL } from "../config"; // Update with your API Gateway URL

export default function ProfileForm(props) {
  const s3uploadkey = async (extension) => {
    try {
      const gateway_url = `${API_GATEWAY_ENDPOINT_URL}/avatars/key_upload`;
      await getAccessToken();
      const access_token = localStorage.getItem("access_token");
      const json = {
        extension: extension,
      };
      const res = await fetch(gateway_url, {
        method: "POST",
        body: JSON.stringify(json),
        headers: {
          Origin: process.env.REACT_APP_FRONTEND_URL,
          Authorization: `Bearer ${access_token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      let data = await res.json();
      if (res.status === 200) {
        return data.url;
      } else {
        console.log(res);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const s3upload = async (event) => {
    const file = event.target.files[0];
    const filename = file.name;
    const size = file.size;
    const type = file.type;
    const fileparts = filename.split(".");
    const extension = fileparts[fileparts.length - 1];
    const presignedurl = await s3uploadkey(extension);

    try {
      const res = await fetch(presignedurl, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": type,
        },
      });

      if (res.status === 200) {
        console.log("Upload successful");
      } else {
        console.log(res);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="profile-form">
      <input type="file" name="avatarupload" onChange={s3upload} />
    </div>
  );
}
