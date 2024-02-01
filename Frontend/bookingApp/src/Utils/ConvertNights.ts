import axios from "axios";

export const convertNights = (date: any) => {
  if (date && date.length > 0) {
    const startDate = new Date(date[0]);
    const endDate = new Date(date[1]);
    const timeDifference = endDate.getTime() - startDate.getTime();
    const numberOfNights = Math.floor(timeDifference / (1000 * 3600 * 24));
    return numberOfNights;
  } else {
    console.error("Date is undefined or an empty array.");
  }
};

export const getUserDetails: any = async () => {
  const storedUserString: any = localStorage.getItem("token");
  const token: any = JSON.parse(storedUserString);
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  try {
    const res = await axios.get(
      "http://localhost:8080/api/auth/userDetails",
      config
    );
    return res.data;
  } catch (error) {
    return error;
  }
};
