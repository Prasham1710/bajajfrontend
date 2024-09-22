import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';

function App() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);

  const options = [
    { value: 'alphabets', label: 'Alphabets' },
    { value: 'numbers', label: 'Numbers' },
    { value: 'highest_lowercase_alphabet', label: 'Highest lowercase alphabet' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResponse(null);

    try {
      const parsedInput = JSON.parse(input);
      const result = await axios.post('https://bajajbackend-1-pj5s.onrender.com/bfhl', parsedInput);
      setResponse(result.data);
    } catch (err) {
      setError('Invalid JSON or API error');
    }
  };

  const filterResponse = (response) => {
    if (!response) return null;
    const filtered = {};
    selectedOptions.forEach(option => {
      filtered[option.value] = response[option.value];
    });
    return filtered;
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>JSON Data Input</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Enter JSON data'
          style={styles.textarea}
        />
        <button type="submit" style={styles.button}>Submit</button>
      </form>
      {error && <p style={styles.error}>{error}</p>}
      {response && (
        <div style={styles.responseContainer}>
          <h2 style={styles.responseTitle}>Filter Response</h2>
          <Select
            isMulti
            options={options}
            onChange={setSelectedOptions}
            value={selectedOptions}
            styles={customSelectStyles}
          />
          <pre style={styles.responseBox}>{JSON.stringify(filterResponse(response), null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "'Roboto', sans-serif",
    textAlign: 'center',
    padding: '20px',
    backgroundColor: '#f0f4f8',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  header: {
    color: '#333',
    fontSize: '2rem',
    marginBottom: '20px'
  },
  form: {
    width: '100%',
    maxWidth: '500px',
    marginBottom: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  textarea: {
    width: '100%',
    height: '150px',
    padding: '10px',
    fontSize: '1rem',
    borderRadius: '8px',
    border: '1px solid #ccc',
    marginBottom: '20px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem'
  },
  error: {
    color: 'red',
    fontSize: '1.2rem',
    margin: '20px 0'
  },
  responseContainer: {
    width: '100%',
    maxWidth: '600px',
    marginTop: '20px',
    textAlign: 'left',
  },
  responseTitle: {
    fontSize: '1.5rem',
    marginBottom: '10px',
    color: '#007bff',
    textAlign: 'center',
  },
  responseBox: {
    backgroundColor: '#fff',
    padding: '15px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    fontSize: '1rem',
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word',
    marginTop: '10px'
  }
};

const customSelectStyles = {
  control: (styles) => ({
    ...styles,
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '5px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    borderColor: '#ccc',
    fontSize: '1rem'
  }),
  multiValue: (styles) => ({
    ...styles,
    backgroundColor: '#007bff',
    color: 'white'
  }),
  multiValueLabel: (styles) => ({
    ...styles,
    color: 'white'
  }),
  multiValueRemove: (styles) => ({
    ...styles,
    color: 'white',
    ':hover': {
      backgroundColor: '#0056b3',
      color: 'white'
    }
  })
};

export default App;
