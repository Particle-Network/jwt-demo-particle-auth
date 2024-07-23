/**
 * Makes a login request to the server with the provided username.
 * @param {string} username - The username to login with.
 * @returns {Promise<string|null>} - Returns the JWT token if login is successful, otherwise null.
 * @throws {Error} - Throws an error if the login request fails.
 */
export const loginRequest = async (username: string): Promise<string | null> => {
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
  
  /**
   * Decodes and verifies a JWT token.
   * @param {string} token - The JWT token to decode.
   * @returns {Promise<Object>} - Returns the decoded payload if the token is valid.
   * @throws {Error} - Throws an error if the token decoding fails.
   */
  export const decodeJWT = async (token: string): Promise<any> => {
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
  