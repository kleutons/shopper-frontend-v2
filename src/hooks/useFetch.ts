// import axios, { AxiosError } from "axios";
import axios from "axios";
import { useEffect, useState } from "react";

const URL_API = import.meta.env.VITE_REACT_APP_API_URL;

const api = axios.create({
    baseURL: URL_API
})

export function useFetchGet<T = unknown>(url: string){
    
    const  [data, setData] = useState<{ return?: T, error?: string}>({}); 
    const [loading, setLoading] = useState<boolean>(true);
    
    

    useEffect( () => {
        setLoading(true);
        const abortController = new AbortController();

        const fetchUrl = URL_API+url;

        fetch(fetchUrl, { signal: abortController.signal })
        .then(response => {
            
            if (!response.ok){
                throw new Error('Network response was not ok');
            }
            return response.json();
        }).then((data) =>{
            setData({ return: data});
        }).catch((err) =>{
            
            if (err.name !== 'AbortError'){
                setData({ error: err.message});
            }
        }).finally(() =>{
            setLoading(false);
        });

        return () => {
            abortController.abort();
          };
    }, [url])

    return { data, loading  }
}

export function useFetchPostForm<T = unknown>(url: string, formData: FormData, method: 'post' | 'put' = 'post'){
      
    const [isSendRequest, sendRequest] = useState(false);
    const  [data, setData] = useState<{ return?: T, error?: string}>({}); 
    const [loading, setLoading] = useState<boolean>(false);

    useEffect( () => {
    
    if (isSendRequest) {
        setLoading(true);
        //Axios Methods
        let methodAxios;
        if(method == 'put' ){
            
            methodAxios = api.put(url, formData,{
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
        }else{

            methodAxios = api.post(url, formData,{
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

        }
        
        //Axios
        methodAxios
        .then(response => {
            if(response.data){
                setData({return: response.data});
            }
        })
        .catch(err => {        
            if(err.response){            
                setData({error: err.response.data});
            }else{                
                setData({error: err});
            }
                            
        }).finally(() =>{
            sendRequest(false);
            setLoading(false);
        })
    
        
    }
    }, [url, formData, loading, isSendRequest, method]);


    return { data, setData, sendRequest, loading }
}