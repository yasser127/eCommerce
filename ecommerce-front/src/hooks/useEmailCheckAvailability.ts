import axios from "axios";
import { useState } from "react";

type Tstatus = "idle" | "checking" | "available" | "notAvailable" | "failed";

const useEmailCheckAvailability = () => {
  const [emailAvailabilityStatus, setEmailAvailabilityStatus] =
    useState<Tstatus>("idle");
  const [enteredEmail, setEnteredEmail] = useState<string | null>(null);

  const checkEmailAvailability = async (email: string) => {
    setEnteredEmail(email);
    setEmailAvailabilityStatus("checking");
    try {
      const response = await axios.get(`users?email=${email}`);
      if (!response.data.length) {
        setEmailAvailabilityStatus("available");
      } else {
        setEmailAvailabilityStatus("notAvailable");
      }
    } catch (error) {
      setEmailAvailabilityStatus("failed");
    }
  };
  const resetCheckEmailAvailability = () => {
    setEmailAvailabilityStatus("idle");
    setEnteredEmail(null);
  }  
  return { checkEmailAvailability, emailAvailabilityStatus, enteredEmail, resetCheckEmailAvailability };
};

export default useEmailCheckAvailability;
