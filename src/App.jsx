import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useForm, useWatch } from 'react-hook-form';


function App() {
  const [count, setCount] = useState(0)
  const [records, setRecords] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem('records');
    if (saved) {
      setRecords(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('records', JSON.stringify(records));
  }, [records]);

  const { register, handleSubmit, control, reset } = useForm({
    defaultValues: {
      email: "",
      password: 0
    }
  });
  const onSum = () => {
    return records.reduce((sum, item) => sum + parseFloat(item.time), 0);
  }

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

  const onSubmit = (data) => {

    if (!data.email || !data.password || Number(data.password) < 0) {
      setError("学習内容と学習時間（0より大きい数字）を入力してください");
      return;
    }
    const newRecord = {
      title: data.email,
      time: data.password
    }; setRecords([...records, newRecord]);

    setError("");
    reset({
      email: "",
      password: 0,
    });



  };

  return (
    <>

      <h1>「学習記録一覧」</h1>


      <div className="card">



        <div className="App">
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
            <p>入力されている学習内容: {secondName}</p>
            <p>合計学習時間:{onSum()}時間/1000h</p>
            <div>
              <button type="submit">登録</button>
            </div>

          </form>
        </div>

        <ul>
          {records
            .filter(item => false)
            .map((item) => (
              <li key={item.title}>
                入力されている学習内容{item.title}
                入力されている時間{item.time}時間
              </li>
            ))}
        </ul>



      </div>

    </>
  )
}

export default App
