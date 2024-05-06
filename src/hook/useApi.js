import axios from 'axios'
import { useState } from 'react'

const useApi = () => {

    const [data, setData]=useState([])
    const [loading, setLoading]=useState(false)

    const getData=async(url)=>{
        setLoading(false)

        const res=await axios.get(url)
        setData(res.data)

        setLoading(true)
    }

  return {
    getData,
    data,
    loading
  }
}

export default useApi
