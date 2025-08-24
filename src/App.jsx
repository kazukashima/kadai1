import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useForm, useWatch } from 'react-hook-form';
// クライアント読み込み
import {supabase} from './supabaseClient' 
import React from "react";

function App() {
  const [count, setCount] = useState(0)
  const [records, setRecords] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading]=useState(true);
  // useEffect(() => {
  //   const saved = localStorage.getItem('records');
  //   if (saved) {
  //     setRecords(JSON.parse(saved));
  //   }
  // }, []);
  // Supabaseようにローカルストレージを変える、l37まで追加
  useEffect(()=>{
    const fetchData=async()=>{
      const {data, error}= await supabase
      .from('study-record')
      .select('*')
      .order('created_at', {ascending: false});

      if (error){
        console.error(error);
        setError("データの取得に失敗しました")
      }else{
        setRecords(data);
      }
      setLoading(false);
    };
    fetchData();
  },[]);

    useEffect(() => {
    localStorage.setItem('records', JSON.stringify(records));
  }, [records]);
// if(loading){
//   return <p>loading..</p>;
// }



  const { register, handleSubmit, control, reset } = useForm({
    defaultValues: {
      email: "",
      password: 0
    }
  });

  const firstName = useWatch({
    control,
    name: "email",
    defaultValue: ""
  });

  const secondName = useWatch({
    control,
    name: "password",
    defaultValue: ""
  });


  const onSum = () => records.reduce((sum, item) => sum + Number(item.time||0), 0);
  

  const handleDelete=async (id)=>{
  setError("");
  try{
  const {error}=await supabase.from("study-record").delete().eq("id",id);
  if(error)
    throw error;
  
  const {data:updated,error:fetchError}=await supabase.from("study-record").select("*").order("created_at",{ascending:false});

if (fetchError)
  throw fetchError;

setRecords(updated||[]);
  }catch(e){
    console.error(e);
    setError("削除に失敗しました");
  }
};

  const onSubmit = async (data) => {
// 追加

    if (!data.email || !data.password || Number(data.password) < 0) {
      setError("学習内容と学習時間（0より大きい数字）を入力してください");
      return;
    }
    const newRecord = {
      title: data.email,
      time: Number(data.password),
    }; 

    const {error}= await supabase
    .from('study-record')
    .insert([newRecord]);

    if(error){
      console.error(error);
      setError("登録に失敗しました")
      return;
    }

    setError("");
    reset();

    const {data: updatedData}=await supabase
.from('study-record')
.select('*')
.order('created_at', {ascending:false});

setRecords(updatedData);
  


  };

return (
  <>
    <h1>「学習記録一覧!」</h1>
     <h1 data-testid="title">Hello Jest</h1>
    <div className="card">
      <div className="App">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label htmlFor="email">学習内容</label>
                <input id="email" {...register('email')} />
              </div>

              <div>
                <label htmlFor="password">学習時間</label>
                <input id="password" {...register('password')} type="number" />時間
              </div>

              {error && <p style={{ color: "red" }}>{error}</p>}
              <p>入力されている学習内容: {firstName}</p>
              <p>入力されている学習時間: {secondName}</p>
              <p>合計学習時間:{onSum()}時間/1000h</p>

              <div>
                <button type="submit">登録</button>
              </div>
            </form>

            <ul>
              {records.map((item) => (
                <li key={item.title}>
                  入力されている学習内容{item.title}
                  入力されている時間{item.time}時間
                  <button onClick={()=>handleDelete(item.id)} style={{marginLeft:8}}>削除</button>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  </>
);
}
export default App;
