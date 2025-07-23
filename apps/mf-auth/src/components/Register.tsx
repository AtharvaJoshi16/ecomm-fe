import { Colors } from "@aj.dev/easylib-ui";
import { Button } from "@aj.dev/easylib-ui/Button";
import { RadioGroup, RadioGroupVariants } from "@aj.dev/easylib-ui/RadioGroup";
import { Textfield } from "@aj.dev/easylib-ui/Textfield";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("CUSTOMER");
  const [userId, setUserId] = useState("");
  const [err, setErr] = useState("");

  const handleRegister = async () => {
    try {
      const res = await axios.post(`${process.env.SERVICE_URL}/register`, {
        email,
        password,
        role,
      });
      if (res.data?.userId) {
        setUserId(res.data?.userId);
        navigate("/auth/login");
      }
    } catch (e: any) {
      e?.response?.data?.errors?.password &&
        setErr(e?.response?.data?.errors?.password);
      e?.response?.data?.err && setErr(e?.response?.data?.err);
    }
  };

  return (
    <div className="m-auto mt-[50px] p-4 flex flex-col gap-2 border-2 border-slate-200 rounded-lg w-[700px]">
      <h2 className="m-auto text-2xl font-bold text-indigo-500">
        Welcome to Ecomm App! Register Here
      </h2>
      {userId && (
        <div className="border text-green-900 border-green-900 p-4">
          User created: {userId}
        </div>
      )}
      {err && (
        <div className="border text-red-800 border-red-800 p-4">{err}</div>
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
      <Button color={Colors.Secondary} onClick={handleRegister}>
        Register
      </Button>
    </div>
  );
};

export default Register;
