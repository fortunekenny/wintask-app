import { useState, useEffect, useRef, useCallback } from "react";
import { styled } from "styled-components";
import { useTasksContext } from "../pages/Tasks";
import SingleTask from "./SingleTask";
import { Link } from "react-router-dom";

const TasksComponent = () => {
  const [windowWidth, setWindowWidth] = useState(0);
  const [contRight, setContRight] = useState(0);
  const contRightRef = useRef(null);

  console.log(windowWidth);

  // const [windowHeight, setWindowHeight] = useState(0);
  let resizeWindow = () => {
    setWindowWidth(window.innerWidth);
    // setWindowHeight(window.innerHeight);
  };

  useEffect(() => {
    resizeWindow();
    window.addEventListener("resize", resizeWindow);
    return () => window.removeEventListener("resize", resizeWindow);
  }, []);

  // useEffect(() => {
  //   setContRight(contRightRef.current.getBoundingClientRect().left);
  // }, []);

  // const ref = React.useRef(null);
  // const [height, setHeight] = React.useState(0);

  const onResize = useCallback(() => {
    if (contRightRef.current)
      setContRight(contRightRef.current.getBoundingClientRect().left);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", onResize);
    onResize();
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [onResize]);
  console.log(contRight);

  const { data } = useTasksContext();
  let { tasks } = data;
  // Sorting Tasks according to future time
  tasks = tasks.sort(function (x, y) {
    let a = new Date(x.updatedAt).getTime(),
      b = new Date(y.updatedAt).getTime();
    return b - a;
  });

  if (tasks.length === 0) {
    return (
      <Wrapper>
        <h2>No tasks to display.</h2>
      </Wrapper>
    );
  }
  // style={{ width: `${300 - labelWidth}px` }}

  return (
    <Wrapper>
      {/* <h4>TasksComponent</h4> */}
      <div className="main">
        <div className="lnk" style={{ right: `${contRight}px` }}>
          <Link to="createtask" className="icon">
            +
          </Link>
        </div>
        <div className="cont" ref={contRightRef}>
          {tasks.map((task) => {
            return <SingleTask key={task._id} {...task} />;
          })}
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-bottom: 2rem;
  .main {
    width: 80vw;
    max-width: 600px;
    position: relative;
    margin: 1rem auto;
  }
  .cont {
    margin: auto;
  }
  .lnk {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    font-size: 4rem;
    /* margin: 0 auto; */
    background: var(--primaryColor);
    box-shadow: var(--shadowLG);
    position: fixed;
    top: 24.5rem;
    /* transform: translate(0rem 0rem); */
    z-index: 5;
  }
  .lnk:hover {
    background: var(--darkVariation);
    box-shadow: var(--shadowXLG);
  }
  .icon {
    color: var(--lightestVariation);
  }
  @media screen and (min-width: 676px) {
    .lnk {
      /*top: 496px;
      right: 102.4px;*/
      /* transform: translateY(-0.6rem);
      transform: translateX(17rem); */
      /* font-size: 2rem;
      width: 40px;
      height: 40px; */
    }
    .main {
      /* width: 80vw; */
      max-width: 700px;
      /* position: relative;
      margin: 1rem auto; */
    }
  }

  /*@media screen and (min-width: 768px) {
    .lnk {
      top: 496px;
      right: 115px;
    }
  }
  @media screen and (min-width: 992px) {
    .lnk {
      top: 496px;
      right: 190px;
    }
  }
  @media screen and (min-width: 1170px) {
    .lnk {
      top: 496px;
      right: 285px;
    }
  }*/
`;

export default TasksComponent;
