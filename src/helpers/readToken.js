
// let configToken = {
//   headers: {
//     'x-token': this.token
//   }
// }

export const protectRoutes = (token) =>{
  let configToken = {
    headers: {
      'x-token': token
    }
  }
  return configToken;
}