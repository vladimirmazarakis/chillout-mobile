import React from 'react'

const useValidations = () => {
  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  const validateUsername = (userName) => {
      return userName.match(/^[A-Za-z-_.@!][A-Za-z0-9-_.@!]{7,29}$/);
  };

  const validatePass = (pass) => {
      return pass.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/);
  };

  return {validateEmail, validatePass, validateUsername}
}

export default useValidations