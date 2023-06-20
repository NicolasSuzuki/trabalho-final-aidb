import * as React from 'react';
import { useEffect, useState } from 'react';

import HomeCMP from '../components/Home';
import { amIAlive, loginUser } from '../api/user';
import { Navigation, User } from '../types'
import { api } from '../api/api';
import Pets from './Pets';

const Home = ({ navigation }: Navigation) => {
  const [user, setUser] = useState<User>({name: "", email: "", password: "", token: null})

  useEffect(() => {
    amIAlive().then(r => r ? setUser(r) : null)
  }, []) 

  if(user.name) {
    return <HomeCMP navigation={navigation} user={user} /> 
    // return <Pets navigation={navigation} user={user} onLogin={loginUser} /> 
  }
  return <></>
}

export default Home;
