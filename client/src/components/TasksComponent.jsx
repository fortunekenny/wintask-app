import { useState, useEffect, useRef, useCallback } from "react";
import { styled } from "styled-components";
import { useTasksContext } from "../pages/Tasks";
import SingleTask from "./SingleTask";
import { Link } from "react-router-dom";

const TasksComponent = () => {
  const [windowWidth, setWindowWidth] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);
  const [contRight, setContRight] = useState(0);
  const contRightRef = useRef(null);

  let rightLoc = windowWidth > 676 ? contRight - 50 : contRight;
  let topLoc = windowWidth < 502 ? 375 : 390;

  // LISTENING TO WINDOW SIZE
  let resizeWindow = () => {
    setWindowWidth(window.innerWidth);
    setWindowHeight(window.innerHeight);
  };

  useEffect(() => {
    resizeWindow();
    window.addEventListener("resize", resizeWindow);
    return () => window.removeEventListener("resize", resizeWindow);
  }, []);
  // LISTENING TO WINDOW SIZE END

  // LISTENING TO ELEMENT LEFT BOUNDING BOX LOCATION
  const onResize = useCallback(() => {
    if (contRightRef.current) {
      setContRight(contRightRef.current.getBoundingClientRect().left);
    }
  }, []);
  console.log(contRight, windowWidth);
  useEffect(() => {
    window.addEventListener("resize", onResize);
    onResize();
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [onResize]);
  // LISTENING TO ELEMENT LEFT BOUNDING BOX LOCATION END

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

  return (
    <Wrapper>
      <div className="main">
        <div
          className="lnk"
          style={{ right: `${rightLoc}px`, top: `${topLoc}px` }}
          // style={{ right: `${contRight - 30}px`, top: `${60}%` }}
        >
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
    width: 100%;
    /* min-width: 390px; */
    position: relative;
    margin: 1rem auto;
  }
  .cont {
    margin: auto;
    width: 90%;
  }
  .lnk {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: var(--primaryColor);
    box-shadow: var(--shadowLG);
    position: fixed;
    z-index: 5;
  }
  .lnk:hover {
    background: var(--darkVariation);
    box-shadow: var(--shadowXLG);
  }
  .icon {
    color: var(--lightestVariation);
    align-self: center;
    font-size: 2rem;
  }
  @media screen and (max-width: 502px) {
    .main {
      /* width: 100%; */
    }
    .lnk {
      width: 40px;
      height: 40px;
      /* top: 370px; */
    }
  }
  @media screen and (min-width: 676px) {
    .main {
      width: 600px;
      max-width: 600px;
    }
  }
`;

export default TasksComponent;
