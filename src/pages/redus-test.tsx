/* eslint-disable react-hooks/rules-of-hooks */
import { createJwt, verifyJwt } from "api/auth/jwt";
import { getUser } from "api/users/crud";
import { NextPage } from "next";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { decrement, increment, incrementByAmount } from "redux/counter/reduser";
import { RootState } from "redux/rootReducer";


const reduxTest: NextPage = () => {
  const dispatch = useDispatch();
  const count = useSelector((state: RootState) => state.counter.value)
  const [incrementAmount, setIncrementAmount] = useState('2');
  const [user, setUser] = useState<any>(null);
  const data = {
    email: 'test@testl.com',
    password: 'testpassword'
  }
  let jwt = ''

  const handleIncrement = () => {
    dispatch(increment());
  };

  const handleDecrement = () => {
    dispatch(decrement());
  };

  const handleIncrementByAmount = () => {
    dispatch(incrementByAmount(Number(incrementAmount) || 0));
  };

  const handleJwt = async() => {
    const test = await createJwt(data)
    // console.log(test.data.access);
    console.log(typeof test);
    if (typeof test?.data.access === "string") {
      jwt = test .data.access
    }
    console.log(jwt);  
  }

  const handleVerify = async() => {
    const test = await verifyJwt(jwt)
    console.log(test);  
  }
  const handleGetUser = async () => {
    const userData = await getUser(jwt);
    console.log(userData);
    setUser(userData);
  };

  return(
    <div>
      <div>
        <button onClick={handleIncrement}>+</button>
        <span>{count}</span>
        <button onClick={handleDecrement}>-</button>
      </div>
      <div>
        <input
          type="text"
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(e.target.value)}
        />
        <button onClick={handleIncrementByAmount}>Add Amount</button>
      </div>
      <div>
        <button onClick={handleJwt}>jwt</button>
        <button onClick={handleVerify}>verify</button>
        <button onClick={handleGetUser}>getUser</button>
      </div>
    </div>
  )
}

export default reduxTest;