import React from "react";
import ReactDOM from "react-dom";
import { HeaderProps, ContentProps, CoursePart } from "./types";

const Header: React.FC<HeaderProps> = ({name}) =>{
  return(
    <h1>{name}</h1>
  )
}

const Content: React.FC<ContentProps> = ({content}) =>{
  return(
    <>
      {content.map(c => 
        <p>
          {c.name} {c.exerciseCount}
        </p>
      )}
    </>
  )
}

const Total: React.FC<ContentProps> = ({content}) =>{
  return(
    <p>
        Number of exercises{" "}
        {content.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
  )
}

const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
    }
  ];

  return (
    <div>
      <Header name={courseName}/>
      <Content content={courseParts}/>
      <Total content={courseParts}/>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
