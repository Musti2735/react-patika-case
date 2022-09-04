import { useEffect } from 'react';
function Alert({ alert, todos, removeAlert }) {

  useEffect(() => {
    const timeOut = setTimeout(() => {
      removeAlert()
    }, 2000)
    return () => clearTimeout(timeOut)
  })

  return (
    <div className="Alert">
      <p>{alert.msg}</p>
    </div>
  );

}

export default Alert;