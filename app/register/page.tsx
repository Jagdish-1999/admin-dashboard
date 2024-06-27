"use client";
import Register from "@/app/register/_components/register";

const RegisterUser = () => {
  return (
    <div className="w-full h-full rounded-md overflow-hidden">
      <Register
        // isUserAuthendicated={isUserAuthendicated}
        onBackDropClick={() => {
          console.log("handler onBackDropClick clicked");
        }}
      />
    </div>
  );
};

export default RegisterUser;
