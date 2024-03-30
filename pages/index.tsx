import type { NextPage } from "next";
import { useState } from "react";

const Home: NextPage = () => {
  const [inputValue, setInputValue] = useState("");
  const [outputValue, setOutputValue] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleButtonClick = () => {
    const fetchPromptCompletion = async () => {
      try {
        const response = await fetch("/api/prompt", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ promptText: inputValue }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setOutputValue(data.completion);
      } catch (error) {
        console.error("Failed to fetch prompt completion:", error);
        setOutputValue("Error fetching prompt completion.");
      }
    };

    fetchPromptCompletion();
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter text here"
      />
      <button onClick={handleButtonClick}>Submit</button>
      <textarea
        value={outputValue}
        readOnly
        placeholder="Output will appear here"
        style={{
          display: "block",
          marginTop: "10px",
          width: "100%",
          height: "100px",
        }}
      />
    </div>
  );
};

export default Home;
