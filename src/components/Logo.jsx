import React from "react";

function Logo({ width = "100px" }) {
  return (
    <div>
      <img
        src="https://alexharkness.com/wp-content/uploads/2020/06/logo-2.png"
        alt="logo"
        className="mr-3 h-12"
      />
    </div>
  );
}

export default Logo;
