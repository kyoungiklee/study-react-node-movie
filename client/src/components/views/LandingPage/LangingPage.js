import React, { useEffect } from 'react'
import axios from "axios";

function LangingPage() {
  useEffect(() => {
      axios.get('/api/hello').then((response) => {
        console.log(response.data);
    })
  }) 

  return (
    <div>LangingPage</div>
  )
}

export default LangingPage