import 'react-toastify/dist/ReactToastify.css';

import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :root {
    font-size: 62.5%;
    
    --toastify-text-color-warning: #ffd904; 
    --toastify-color-warning: #2b2a2a;

    --toastify-text-color-success: #07bc0c; 
    --toastify-color-success: #2b2a2a;

    -toastify-text-color-error : #e74c3c ; 
    --toastify-color-error: #2b2a2a;
  }

  body {
    background-color: ${({ theme }) => theme.COLORS.BACKGROUND_900};
    color: ${({ theme }) => theme.COLORS.WHITE};

    -webkit-font-smoothing: antialiased;
  }

  body, input, button, textarea {
    font-family: 'Roboto Slab', serif;
    font-size: 1.6rem;
    outline: none;
  }

  a {
    text-decoration: none;
  }

  button, a {
    cursor: pointer;
    transition: filter 0.2s;
  }

  button:hover, a:hover {
    filter: brightness(0.9);
  }
`;