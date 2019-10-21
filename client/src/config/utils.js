export const isValidEmail = email => {
  const filter = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;

  return String(email).search(filter) != -1;
};

export const checkSecurePass = isSecure => {
  const data = {
    icEye: isSecure ? 'eye-slash' : 'eye',
    securePass: !isSecure,
  };

  return data;
};
