import type { NextPage } from "next";
import { useState } from "react";
import resume from "./mock/resume.json";
import latex from "./mock/latex.json";

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
          body: JSON.stringify({
            promptText: resume.promptText,
            tone: resume.tone,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        let latexContent = data.completion;
        if (!latexContent.startsWith("\\documentclass")) {
          const docClassIndex = latexContent.indexOf("\\documentclass");
          if (docClassIndex !== -1) {
            latexContent = latexContent.substring(docClassIndex);
          } else {
            // Handle the case where "\documentclass" is not found
            console.error(
              "The fetched LaTeX content does not contain '\\documentclass'."
            );
            setOutputValue("Error: LaTeX content is invalid.");
            return;
          }
        }

        console.log("Fetched prompt completion:", latexContent);
        // Submit to latexonline
        const latexResponse = await fetch(
          `https://cors-production-3929.up.railway.app/https://latexonline.cc/compile?text=${encodeURIComponent(
            latexContent
          )}`,
          {
            method: "GET",
            mode: "cors",
            headers: {
              "Access-Control-Allow-Origin": "*",
            },
          }
        );

        if (!latexResponse.ok) {
          console.log("error message", latexResponse.status);
          throw new Error(`HTTP error! status: ${latexResponse.status}`);
        }

        const blob = await latexResponse.blob();
        const downloadUrl = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = downloadUrl;
        a.download = "generated_resume.pdf";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(downloadUrl);
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
