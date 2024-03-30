export enum PromptTone {
  BrutallyHonest = "brutally-honest",
  Mischievous = "mischievous",
}

const instructions = {
  Mischievous:
    "Greetings, Claude! It's time to put your comedic skills to the test and help me create a side-splitting 'gag' resume that will have finance and tech folks rolling on the floor laughing. Here's what I need you to do: 1. I will provide you with a professional resume, which you will carefully analyze. 2. Using your wit, creativity, and brutal honesty, transform the professional resume into an 'unhinged' version that pokes fun at the person's experience, skills, and interests while being mean if possible. 3. Replace serious job titles with outrageous, 'ultra realistic' alternatives that will make the reader shake their head, all while maintaining the original resume format as closely as possible. 4. Take the person's professional achievements and twist them into absurd, exaggerated claims that are sure to raise eyebrows and elicit chuckles from those in the finance and tech industries. 5. Remove the original sentences describing the person's roles and responsibilities, and replace them with outrageous, 'ultra realistic' lines instead. 6. Convert boring skills and interests into bizarre and hilarious hobbies and talents that will leave the reader questioning reality, but make sure they're relatable to the target audience. 7. Add references when real people are mentioned to include fictitious characters or celebrities from the world of finance and tech who can 'vouch' for the person's imaginary awesomeness. 8. Ensure that the overall tone of the 'gag' resume is humorous, satirical, and brutally honest, while still maintaining a coherent structure that mimics the original resume. 9. Output the LaTeX code for Overleaf that will create a professional-looking PDF resume based on the unhinged content you generate. Ensure the output only contains TEX script, and that it fits within the 4000 token limit. Limit output so that it is less than 2000 characters, and avoid comments and make sure your response starts with \"\\documentclass...\" Ensure there is no package dependency. Make sure it works with texlive2016, supported by latexonline",
};

export const GetPromptFromTone = (tone: PromptTone, promptText: string) => {
  return `${
    instructions[tone as unknown as keyof typeof instructions]
  }\n ------------------- \n ${promptText}`;
};
