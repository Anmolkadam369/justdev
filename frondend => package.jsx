

import React from 'react';
import './Package.css'
import axios from 'axios';
import { useState , useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { useRecoilValue,useRecoilState } from 'recoil';
import { jwtTokenState ,paidUserState} from '../../auth/atoms';



function Package() {

  
  const navigate = useNavigate();
  const [isPaidUser, setIsPaidUser] = useRecoilState(paidUserState);
  const jwtToken = useRecoilValue(jwtTokenState);
  const [cardDetails, setCardDetails] = useState([])
  const [book, setbook] = useState({
    name: "The Road to be taken",
    author: "C.S Tylor",
    img: "https://th.bing.com/th?id=OIP.O8X2cM_d8XTou4d3_YlbgAHaLH&w=204&h=306&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2",
    price: 1500,
  });
  const initPayment = (data) => {
    const options = {
      key: "rzp_test_UH0rkDW0Rkm44R",
      amount: data.amount,
      currency: data.currency,
      name: book.name,
      description: "Test Transaction",
      img: book.img,
      order_id: data.id,
      handler: async (response) => {
        try {
          const verifyUrl = 'https://the-salt-legal-backend.onrender.com/verify';
          sessionStorage.setItem('paidUser', true);
          setIsPaidUser(true);
          console.log("i am paid user", paidUserState)
          navigate('/document')
          const { data } = await axios.post(verifyUrl, response);
          console.log("verifyData", data);
          if(response.ok) navigate('/document')
        } catch (error) {
          console.log(error)
        }
      },
      theme: {
        color: "#3399cc"
      },
    }
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  }

  const handlePayment = async (price) => {
    try {
      if (jwtToken) {
        console.log(jwtToken);
        console.log("order payment")
        const orderUrl = 'https://the-salt-legal-backend.onrender.com/orders';
        const { data } = await axios.post(orderUrl, {
          amount: price
        });
        console.log("orderData", data);
        initPayment(data.data);
      }
      else {
        navigate('/login');
        
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getCardDetails = async () => {
    try {
      //change getContactUs to getPaymentCard after pushing data in mongodb now there is no data in mongodb so 
      //you wont get any data
      const response = await fetch('https://the-salt-legal-backend.onrender.com/getContactUs');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      console.log("data",data);
      setCardDetails(data.data);
      console.log("carddetails",cardDetails)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getCardDetails();
  }, []);

  

  return (
    <div className='pakage-container'>

      <h2>Choose a <span>Right plan</span> for you</h2>
      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae quos nemo totam unde quaerat odit facere.</p>

       
      
      <div className="package">
        <div className="package-card">
          <h2>1 User</h2>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <FontAwesomeIcon icon={faCheckSquare} style={{ marginRight: '15px', color: 'black', marginTop: '5px' }} /><p>20 GB cloud storage Templates</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <FontAwesomeIcon icon={faCheckSquare} style={{ marginRight: '15px', color: 'black', marginTop: '5px' }} /><p>20 GB cloud storage Templates</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', textAlign: 'center' }}>
            <FontAwesomeIcon icon={faCheckSquare} style={{ marginRight: '15px', color: 'black', marginTop: '5px' }} /><p>20 GB cloud storage Templates</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <FontAwesomeIcon icon={faCheckSquare} style={{ marginRight: '15px', color: 'black', marginTop: '5px' }} /><p>20 GB cloud storage Templates</p>
          </div>
          {cardDetails.length!=0 &&
          <div>
          <h3>Title {cardDetails[0].name}</h3>
          <h3>Price {cardDetails[0].phone.substring(2, 5)} / month</h3>
          </div>
          }
          <button onClick={()=>handlePayment(cardDetails[0].phone.substring(2, 5))}>SELECT</button>
        </div>
        <div className=" package-card-2">
          <h2>5 Users</h2>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <FontAwesomeIcon icon={faCheckSquare} style={{ marginRight: '15px', color: 'white', marginTop: '5px' }} /><p>Ideal for small teams </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <FontAwesomeIcon icon={faCheckSquare} style={{ marginRight: '15px', color: 'white', marginTop: '5px' }} /><p>Ideal for small teams </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', textAlign: 'center' }}>
            <FontAwesomeIcon icon={faCheckSquare} style={{ marginRight: '15px', color: 'white', marginTop: '5px' }} /><p>Ideal for small teams </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <FontAwesomeIcon icon={faCheckSquare} style={{ marginRight: '15px', color: 'white', marginTop: '5px' }} /><p>Ideal for small teams </p>
          </div>

          {cardDetails.length!=0 &&
          <div>
          <h3>Title {cardDetails[1].name}</h3>
          <h3>Price {cardDetails[1].phone.substring(5, 8)}/ month</h3>
          </div>
          }

          
          <button onClick={()=>handlePayment(cardDetails[1].phone.substring(5, 8))}>SELECT</button>

        </div>
        <div className="package-card">
          <h2>Unlimited</h2>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <FontAwesomeIcon icon={faCheckSquare} style={{ marginRight: '15px', color: 'black', marginTop: '5px' }} /><p>Ideal for larger teams </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <FontAwesomeIcon icon={faCheckSquare} style={{ marginRight: '15px', color: 'black', marginTop: '5px' }} /><p>Ideal for larger teams </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', textAlign: 'center' }}>
            <FontAwesomeIcon icon={faCheckSquare} style={{ marginRight: '15px', color: 'black', marginTop: '5px' }} /><p>Ideal for larger teams </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <FontAwesomeIcon icon={faCheckSquare} style={{ marginRight: '15px', color: 'black', marginTop: '5px' }} /><p>Ideal for larger teams </p>

          </div>
          {cardDetails.length!=0 &&
          <div>
          <h3>Title {cardDetails[0].name}</h3>
          <h3>Price {cardDetails[0].phone.substring(0, 3)}/ month</h3>
          </div>
          }

          <button onClick={()=>handlePayment(cardDetails[0].phone.substring(0, 3))}>FULL ACCESS</button>
        </div>
      </div>
    </div>
  );
}

export default Package;




// import React from 'react';
// import './Package.css'
// import axios from 'axios';
// import { useState , useEffect} from 'react';
// import { useNavigate } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';
// import { useRecoilValue } from 'recoil';
// import { jwtTokenState } from '../../auth/atoms';


// function Package() {

  
//   const navigate = useNavigate();
//   const jwtToken = useRecoilValue(jwtTokenState);
//   const [cardDetails, setCardDetails] = useState([])
//   const [book, setbook] = useState({
//     name: "The Road to be taken",
//     author: "C.S Tylor",
//     img: "https://th.bing.com/th?id=OIP.O8X2cM_d8XTou4d3_YlbgAHaLH&w=204&h=306&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2",
//     price: 1500,
//   });
//   const initPayment = (data) => {
//     const options = {
//       key: "rzp_test_UH0rkDW0Rkm44R",
//       amount: data.amount,
//       currency: data.currency,
//       name: book.name,
//       description: "Test Transaction",
//       img: book.img,
//       order_id: data.id,
//       handler: async (response) => {
//         try {
//           const verifyUrl = 'https://the-salt-legal-backend.onrender.com/verify';
//           const { data } = await axios.post(verifyUrl, response);
//           console.log("verifyData", data);
//         } catch (error) {
//           console.log(error)
//         }
//       },
//       theme: {
//         color: "#3399cc"
//       },
//     }
//     const rzp1 = new window.Razorpay(options);
//     rzp1.open();
//   }

//   const handlePayment = async (price) => {
//     try {
//       if (jwtToken) {
//         console.log(jwtToken);
//         console.log("order payment")
//         const orderUrl = 'https://the-salt-legal-backend.onrender.com/orders';
//         const { data } = await axios.post(orderUrl, {
//           amount: price
//         });
//         console.log("orderData", data);
//         initPayment(data.data);
//       }
//       else {
//         navigate('/login');
//         console.log('User not logged in. Please login to download.');
//       }
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   const getCardDetails = async () => {
//     try {
//       //change getContactUs to getPaymentCard after pushing data in mongodb now there is no data in mongodb so 
//       //you wont get any data
//       const response = await fetch('https://the-salt-legal-backend.onrender.com/getContactUs');
//       if (!response.ok) {
//         throw new Error('Failed to fetch data');
//       }
//       const data = await response.json();
//       console.log("data",data);
//       setCardDetails(data.data);
//       console.log("carddetails",cardDetails)
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   useEffect(() => {
//     getCardDetails();
//   }, []);

  

//   return (
//     <div className='pakage-container'>
//       <h2>Choose a <span>Right plan</span> for you</h2>
//       <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae quos nemo totam unde quaerat odit facere.</p>

       
      
//       <div className="package">

//         <div className="package-card">
//           <h2>1 User</h2>

//           <div style={{ display: 'flex', flexDirection: 'row' }}>
//             <FontAwesomeIcon icon={faCheckSquare} style={{ marginRight: '15px', color: 'black', marginTop: '5px' }} /><p>20 GB cloud storage Templates</p>
//           </div>
//           <div style={{ display: 'flex', flexDirection: 'row' }}>
//             <FontAwesomeIcon icon={faCheckSquare} style={{ marginRight: '15px', color: 'black', marginTop: '5px' }} /><p>20 GB cloud storage Templates</p>
//           </div>
//           <div style={{ display: 'flex', flexDirection: 'row', textAlign: 'center' }}>
//             <FontAwesomeIcon icon={faCheckSquare} style={{ marginRight: '15px', color: 'black', marginTop: '5px' }} /><p>20 GB cloud storage Templates</p>
//           </div>
//           <div style={{ display: 'flex', flexDirection: 'row' }}>
//             <FontAwesomeIcon icon={faCheckSquare} style={{ marginRight: '15px', color: 'black', marginTop: '5px' }} /><p>20 GB cloud storage Templates</p>
//           </div>
//           {cardDetails.length!=0 &&
//           <div>
//           <h3>Title {cardDetails[0].name}</h3>
//           <h3>Price {cardDetails[0].phone.substring(2, 5)} / month</h3>
//           </div>
//           }
//           <button onClick={()=>handlePayment(cardDetails[0].phone.substring(2, 5))}>SELECT</button>
//         </div>
//         <div className=" package-card-2">
//           <h2>5 Users</h2>
//           <div style={{ display: 'flex', flexDirection: 'row' }}>
//             <FontAwesomeIcon icon={faCheckSquare} style={{ marginRight: '15px', color: 'white', marginTop: '5px' }} /><p>Ideal for small teams </p>
//           </div>
//           <div style={{ display: 'flex', flexDirection: 'row' }}>
//             <FontAwesomeIcon icon={faCheckSquare} style={{ marginRight: '15px', color: 'white', marginTop: '5px' }} /><p>Ideal for small teams </p>
//           </div>
//           <div style={{ display: 'flex', flexDirection: 'row', textAlign: 'center' }}>
//             <FontAwesomeIcon icon={faCheckSquare} style={{ marginRight: '15px', color: 'white', marginTop: '5px' }} /><p>Ideal for small teams </p>
//           </div>
//           <div style={{ display: 'flex', flexDirection: 'row' }}>
//             <FontAwesomeIcon icon={faCheckSquare} style={{ marginRight: '15px', color: 'white', marginTop: '5px' }} /><p>Ideal for small teams </p>
//           </div>

//           {cardDetails.length!=0 &&
//           <div>
//           <h3>Title {cardDetails[1].name}</h3>
//           <h3>Price {cardDetails[1].phone.substring(5, 8)}/ month</h3>
//           </div>
//           }

          
//           <button onClick={()=>handlePayment(cardDetails[1].phone.substring(5, 8))}>SELECT</button>

//         </div>
//         <div className="package-card">
//           <h2>Unlimited</h2>
//           <div style={{ display: 'flex', flexDirection: 'row' }}>
//             <FontAwesomeIcon icon={faCheckSquare} style={{ marginRight: '15px', color: 'black', marginTop: '5px' }} /><p>Ideal for larger teams </p>
//           </div>
//           <div style={{ display: 'flex', flexDirection: 'row' }}>
//             <FontAwesomeIcon icon={faCheckSquare} style={{ marginRight: '15px', color: 'black', marginTop: '5px' }} /><p>Ideal for larger teams </p>
//           </div>
//           <div style={{ display: 'flex', flexDirection: 'row', textAlign: 'center' }}>
//             <FontAwesomeIcon icon={faCheckSquare} style={{ marginRight: '15px', color: 'black', marginTop: '5px' }} /><p>Ideal for larger teams </p>
//           </div>
//           <div style={{ display: 'flex', flexDirection: 'row' }}>
//             <FontAwesomeIcon icon={faCheckSquare} style={{ marginRight: '15px', color: 'black', marginTop: '5px' }} /><p>Ideal for larger teams </p>

//           </div>
//           {cardDetails.length!=0 &&
//           <div>
//           <h3>Title {cardDetails[0].name}</h3>
//           <h3>Price {cardDetails[0].phone.substring(0, 3)}/ month</h3>
//           </div>
//           }

//           <button onClick={()=>handlePayment(cardDetails[0].phone.substring(0, 3))}>FULL ACCESS</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Package;
