import { useEffect } from 'react';

function Alert({ alert, removeAlert }) { // alert için propsları içe aktardık.

  useEffect(() => { //fonksiyonun çalışıp 2 sn sonra kapanması için useEffect içinde fonksiyon tanımladık
    const timeOut = setTimeout(() => {
      removeAlert()
    }, 2000)
    return () => clearTimeout(timeOut)
  })

  return ( // alert öğresini return ettik
    <div className={`alert alert-${alert.type}`}  role="alert">
      <p>{alert.msg}</p>
  </div>
  );

}

export default Alert;