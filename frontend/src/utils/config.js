export function authHeader() {
  if (localStorage.getItem('access')) {
    return {
      Authorization: "JWT " + localStorage.getItem("access"),
      // accept: "application/json",
      // 'Content-Type': 'application/json'
    };
  } else {
    return {};
  }
}

// export const getConfig = () => {
//   const isAuthenticated = store.getState().auth.isAuthenticated;
//   if (isAuthenticated) {
//     //const token = store.getState().auth.token;
//     const config = {
//         headers: {
//             //'Authorization': `Token ${localStorage.getItem('access')}`,
//             'Authorization': sessionStorage.getItem('token')
//               ? "JWT" + sessionStorage.getItem('token')
//               : null,
//             'Content-Type': 'application/json',
//             'accept': 'application/json',
//         },
//       //'Content-Type': 'application/json'
//     };
//     return config;
//   }
//   return null;
// };