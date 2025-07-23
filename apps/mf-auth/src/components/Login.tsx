import { Button, Colors, Textfield } from "@aj.dev/easylib-ui";
import RadioGroup, { RadioGroupVariants } from "@aj.dev/easylib-ui/RadioGroup";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("CUSTOMER");
  const [err, setErr] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${process.env.SERVICE_URL}/login`, {
        email,
        role,
        password,
      });
      if (res.data?.token) {
        localStorage.setItem("token", res.data?.token);
        localStorage.setItem("user", JSON.stringify(res.data?.user));
        navigate("/");
      }
    } catch (e: any) {
      e?.response?.data?.errors?.password &&
        setErr(e?.response?.data?.errors?.password);
      e?.response?.data?.err && setErr(e?.response?.data?.err);
    }
  };
  return (
    <div className="m-auto mt-[50px] p-4 flex flex-col gap-2 border-2 border-slate-200 rounded-lg w-[700px]">
      <h2 className="m-auto text-2xl font-bold text-indigo-500">Login here!</h2>
      {err && (
        <div className="border rounded-md text-red-800 border-red-800 p-4">
          {err}
        </div>
      )}
      <Textfield
        placeholder="Enter email"
        type="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <Textfield
        placeholder="Enter password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <RadioGroup
        variant={RadioGroupVariants.Inverse}
        color={Colors.Secondary}
        defaultValue="CUSTOMER"
        orientation="horizontal"
        className="w-fit"
        options={[
          {
            id: "ADMIN",
            label: {
              label: "Admin",
            },
            value: "ADMIN",
          },
          {
            id: "CUSTOMER",
            label: {
              label: "Customer",
            },
            value: "CUSTOMER",
          },
        ]}
        onValueChange={(value) => setRole(value)}
      />
      <Button color={Colors.Secondary} onClick={handleLogin}>
        Login
      </Button>
    </div>
  );
};

export default Login;
