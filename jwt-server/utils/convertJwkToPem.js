const jwkToPem = require('jwk-to-pem');
const fs = require('fs');

const jwk = {
    "kty": "RSA",
    "e": "AQAB",
    "use": "sig",
    "kid": "DW0vAZOpSfj0YUfR08fuYC6EhabU0Edo5vSDw1Y-EBk",
    "alg": "RS256",
    "n": "iUX6kGM6LpiXNthfCPCnwqQBoIvREv2SmVwicnCKPQJsJpYtRWG7zkIVDVhlxdnLJVzwzJ3f0tkMAi01Vod21WrPPSrBwRcmuiJszkUlZ6lSZx-U4ycVyzKL5j1Dr5y8QUKZzFkmNkBUzj-Dw6ku8cSAq8Vd9VtourjlqRIm3-UpxRtjiHvqbHbmOd0r-Tl1ds0zbViUwfHwLGlYOVmRE3XDArYhFfkTE0PYW8isSiQ36jWj74N2QqI0M4cWWNe_rPiC5rlilh-h8okc_Hk0ZXG74CA2Yh7DnarmWixrDxu4VYvKdlRGf4qdOkxDBs15CIsYLi5TSq5qYSVT8rN7NQ"
};

const pem = jwkToPem(jwk);
console.log(pem);

//fs.writeFileSync('public_key.pem', pem);
