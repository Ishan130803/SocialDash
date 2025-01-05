interface User {
  name : string
  email : string
  image : string
  id : string
}

type createdUser = {
  name : string,
  _id : string,
  email : string,
  image : string,
  friends : string[] 
  pending_requests : string[] 
  sent_requests : string[] 
}