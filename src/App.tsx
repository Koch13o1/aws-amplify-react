import { useState } from "react";

type FormData = {
  name: string;
  email: string;
  creditScore: number; // Making creditScore optional
  income: number; // Making income optional
};

function App() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    creditScore: undefined,
    income: undefined,
  });

  const formDataHandleFunc = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: name === 'creditScore' || name === 'income' ? Number(value) : value,
    }));
  };

  const formOnSubmitFunc = () => {
    if (formData.name === "" || formData.email === "") {
      return alert("Please fill the form.");
    }

    const requestHeaders = new Headers();
    requestHeaders.append("Content-Type", "application/json");

    const body = JSON.stringify({
      ...formData,
      creditScore: formData.creditScore ?? 0, // Set default value if not provided
      income: formData.income ?? 0, // Set default value if not provided
    });
    console.log("Checking here")
    console.log(body)

    const requestOptions = {
      method: "POST",
      headers: requestHeaders,
      body: body,
    };

    // Replace fetch endpoint with your actual API gateway endpoint
    fetch(
      "https://3ba6fm208f.execute-api.us-east-2.amazonaws.com/Dev",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        console.log(result)
        console.log(result.substring(1:10));
        //console.log(result.body.message + ". Therefore, " + result.body.approvalStatus);
        //alert(JSON.parse(result).message);
        alert(result.body);
      })
      .catch((error) => alert(`Error: ${error}`));
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-96">
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-lg">
            <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
              Our Banking App
            </h1>
            <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
              Welcome to the our app!
            </p>
            <div className="mt-10">
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <div className="relative">
                <input
                  className="w-full rounded-lg p-4 pe-12 text-sm shadow-sm"
                  placeholder="Name"
                  name="name"
                  onChange={formDataHandleFunc}
                />
              </div>
            </div>
            <div className="mt-6">
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  className="w-full rounded-lg  p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter email"
                  name="email"
                  onChange={formDataHandleFunc}
                />
              </div>
            </div>
            <div className="mt-6">
              <label htmlFor="creditScore" className="sr-only">
                Credit Score
              </label>
              <div className="relative">
                <input
                  type="number"
                  className="w-full rounded-lg p-4 pe-12 text-sm shadow-sm"
                  placeholder="Credit Score"
                  name="creditScore"
                  onChange={formDataHandleFunc}
                />
              </div>
            </div>
            <div className="mt-6">
              <label htmlFor="income" className="sr-only">
                Income
              </label>
              <div className="relative">
                <input
                  type="number"
                  className="w-full rounded-lg p-4 pe-12 text-sm shadow-sm"
                  placeholder="Income"
                  name="income"
                  onChange={formDataHandleFunc}
                />
              </div>
            </div>
            <button
              type="submit"
              className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white mt-6"
              onClick={formOnSubmitFunc}
            >
              Send Message
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
