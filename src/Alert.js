import { useEffect } from 'react';
import {Row} from 'reactstrap'
function Alert({ alert, todos, removeAlert }) {

  useEffect(() => {
    const timeOut = setTimeout(() => {
      removeAlert()
    }, 2000)
    return () => clearTimeout(timeOut)
  })

  return (

    <div className={`alert alert-${alert.type}`}  role="alert">
      <p>{alert.msg}</p>
  </div>
  );

}

export default Alert;