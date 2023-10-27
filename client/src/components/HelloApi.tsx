import { useState } from 'react';
import Button from '../components/Button';
import Loader from '../components/Loader';
import Container from './Container';

export default function HelloApi() {
  const [msg, setMsg] = useState('... message from API ❓');
  const [loading, setLoading] = useState(false);

  async function fetchApiMsg() {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:4000/hello');
      const text = await response.json();
      setMsg(text);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      throw error;
    }
  }

  return (
    <Container>
      <h1>Hello from client 😃</h1>
      <Button onClick={fetchApiMsg}>
        <p className='uppercase'>Click to say hello to the api ...</p>
      </Button>
      {loading && <Loader />}
      {msg && <p>{msg}</p>}
    </Container>
  );
}
