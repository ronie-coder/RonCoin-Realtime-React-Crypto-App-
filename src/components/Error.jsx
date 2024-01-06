import React from 'react'


import 'bootstrap/dist/css/bootstrap.min.css'
const Error = () => {
  return (
    <div class="alert alert-warning alert-dismissible fade show" role="alert">
  <strong>Holy guacamole!</strong> You request was unable to process.
  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
</div>
  )
}

export default Error