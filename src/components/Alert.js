import React from 'react';

function Alert(props) {
  const capitalize = (word) => {  
    if (word === "danger") {
      word = "error";
    }
    if (word === "success") {
      word = "success";
    }
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };

  return (
    <div style={{ height: '40px' }}>
      {props.alert && (
        <div
          className={`alert alert-${props.alert.type} alert-dismissible fade show`}
          role="alert"
        >
          <strong>{capitalize(props.alert.type)}</strong>: {props.alert.message}
        </div>
      )}
    </div>
  );
}

export default Alert;
