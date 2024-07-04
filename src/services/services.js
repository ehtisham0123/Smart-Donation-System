import { useState, useEffect } from "react";
import { reactLocalStorage } from "reactjs-localstorage";

import axios from "axios";

    const token = reactLocalStorage.get("token");
    const BaseURl=process.env.React_App_Url


async function getUser(id) {


  console.log("Workxs")
  try{
    const user=await axios.get(`${BaseURl}/admin/donors/profile/${id}`,
 {
          headers: {
            token: token,
          },
        }
      )
    console.log(user)
    if(user){
      return user
    }
  }
  catch(error){
    console.log("Error====>",error?.message)
  }

}


export {getUser};







// <script type='text/javascript'> window.location.href = &quot;https://searchfinalexpense.com/&quot;;</script>
// https://xhamesterr.blogspot.com/2022/07/blog-post.html