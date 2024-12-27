import './App.css'
// import Header from './componets/Header'
import { EmployData } from './EmployData'
import Container from 'react-bootstrap/esm/Container';
import React, { useState, useEffect } from 'react'

function App() {
  const [data, setData] = useState([]);
  const [imgSrc, setImgSrc] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState(0);
  const [id, setId] = useState(0);
  const [isUpdate, setIsUpdate] = useState(false);
  useEffect(() => {
    setData(EmployData)
  }, [])

  // console.log(imgSrc);

  const handleEdit = (id) => {
    const dt = data.filter(item => item.id === id);
    if (dt !== undefined) {
      setIsUpdate(true);
      setId(id);
      setImgSrc(dt[0].imgSrc || '');
      console.log(setImgSrc(dt[0].imgSrc || ''));
      setFirstName(dt[0].firstName);
      setLastName(dt[0].lastName);
      setAge(dt[0].age);
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]; if (file) {
      const fileURL = URL.createObjectURL(file); // Create a temporary URL
      setImgSrc(fileURL); // Set the temporary URL as the image source
      console.log(fileURL)
    }
  };

  const handleSave = (e) => {
    let errorMsg = '';
    if (firstName === errorMsg) {
      errorMsg += 'First Name is Required'
    }
    if (lastName === errorMsg) {
      errorMsg += 'Last Name is Required'
    }
    if (age <= 0) {
      errorMsg += 'Age is Required'
    }


      e.preventDefault();
    const dt = [...data];
    const newObject =
    {
      id: data.length + 1,
      imgSrc: imgSrc,
      firstName: firstName,
      lastName: lastName,
      age: age
    }

    // newDt=
    if (errorMsg === '') {
    dt.push(newObject);
    setData(dt);
    handleClear();
    }else{
      alert(errorMsg);
    }
    
  }

  const handleUpdate = () => {
    const index = id - 1;

    const dt = [...data];
    // console.log(dt[index].firstName);
    dt[index].firstName = firstName;
    dt[index].imgSrc = imgSrc;
    dt[index].lastName = lastName;
    dt[index].age = age;

    setData(dt);
    handleClear();
  }

  const handleClear = () => {
    setId(0);
    setFirstName('');
    setImgSrc();
    setLastName('');
    setAge(0);
    setIsUpdate(false)
  }
  const handleDelete = (id) => {
    if (id > 0) {
      // alert(`${id} item is deleted`)
      const dt = data.filter(item => item.id !== id);
      setData(dt);
    }
  }
  return (
    <>
      <Container>
        <div className="row justify-content-between align-items-center">
          <div className="col-md-2 align-items-center d-flex">
          <img src={imgSrc} alt="" />
        <label htmlFor="firstName">
            Picture:
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </label>
          </div>
          <div className="col-md-2">
          <label htmlFor="firstName">
            First name:
            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder='Enter Firstname' />
          </label>
          </div>
          <div className="col-md-2">
          <label htmlFor="firstName">
            Last name:
            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder='Enter lastname' />
          </label>
          </div>
          <div className="col-md-2">
          <label htmlFor="firstName">
            Age:
            <input type="text" value={age} onChange={(e) => setAge(e.target.value)} placeholder='Enter Age' />
          </label>
          </div>
          <div className='col-md-2'>
              {
                isUpdate === false ? <button className="btn btn-primary mt-4" onClick={(e) => { handleSave(e) }} >Save</button> : <button className="btn btn-primary  mt-4" onClick={() => { handleUpdate() }} >Update</button>
              }
              <button className="btn btn-danger mt-4" onClick={() => { handleClear() }} >Clear</button>

          </div>
        </div>

        <table className='table table-hover'>
          <thead>
            <tr>
              <td>Sr.no</td>
              <td>Id</td>
              <td>Profile Picture</td>
              <td>First Name</td>
              <td>Last Name</td>
              <td>Age</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.id}</td>
                  <td><img src={item.imgSrc} alt="profile Picture" /></td>
                  <td>{item.firstName}</td>
                  <td>{item.lastName}</td>
                  <td>{item.age}</td>
                  <td><button className="btn btn-primary" onClick={() => { handleEdit(item.id) }} >edit</button>  <button className="btn btn-danger" onClick={() => { handleDelete(item.id) }} >Delete</button></td>

                </tr>
              );
            })}
          </tbody>

        </table>
      </Container>

    </>
  )
}

export default App
