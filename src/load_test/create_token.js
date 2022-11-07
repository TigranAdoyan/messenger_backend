[
   {
      username: 'tigran',
      password: 'passcode'
   },
   {
      username: 'ashot',
      password: 'passcode1'
   },
   {
      username: 'xachik',
      password: 'passcode2'
   },
   {
      username: 'john',
      password: 'passcode3'
   },
   {
      username: 'maria',
      password: 'passcode4'
   },
].forEach(loginData => {
   fetch(`http://localhost:3335/user/login`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(loginData)
   })
       .then(response => response.json())
       .then(response => console.log(response.token));
})