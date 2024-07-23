// jwtUtils.js

export const loginRequest = async (username: string) => {
    const response = await fetch("http://localhost:4000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username }),
    });
  
    if (!response.ok) {
      if (response.status === 401) {
        alert("User does not exist.");
        return null;
      } else {
        throw new Error(`Login failed: ${response.statusText}`);
      }
    }
  
    const data = await response.json();
    return data.token;
  };
  
  export const decodeJWT = async (token: string) => { // Specify the type of token
    const response = await fetch("http://localhost:4000/decode", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });
  
    if (!response.ok) {
      throw new Error(`Decode failed: ${response.statusText}`);
    }
  
    const data = await response.json();
    return data.payload;
  };
  