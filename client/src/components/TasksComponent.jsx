import { useState, useEffect, useRef, useCallback } from "react";
import { styled } from "styled-components";
import { useTasksContext } from "../pages/Tasks";
import NoTask from "./NoTask";

import SingleTask from "./SingleTask";
import { Link } from "react-router-dom";

const TasksComponent = () => {
  const { data } = useTasksContext();
  let { tasks } = data;
  const [windowWidth, setWindowWidth] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);
  const [contRight, setContRight] = useState(0);
  const contRightRef = useRef(null);

  let rightLoc = windowWidth > 676 ? contRight - 50 : contRight;
  let topLoc = windowWidth < 500 ? 375 : 390;

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
  useEffect(() => {
    window.addEventListener("resize", onResize);
    onResize();
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [onResize]);
  // LISTENING TO ELEMENT LEFT BOUNDING BOX LOCATION END

  // Sorting Tasks according to future time
  tasks = tasks.sort(function (x, y) {
    let a = new Date(x.updatedAt).getTime(),
      b = new Date(y.updatedAt).getTime();
    return b - a;
  });
  /////// end

  if (tasks.length === 0) {
    return <NoTask />;
  }

  return (
    <Wrapper>
      <div className='main'>
        <Link
          to='createtask'
          className='lnk'
          style={{ right: `${rightLoc}px`, top: `${topLoc}px` }}
        >
          +
        </Link>
        <div
          className='cont'
          ref={contRightRef}
        >
          {tasks.map((task) => {
            return (
              <SingleTask
                key={task._id}
                {...task}
              />
            );
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
    align-items: center;
    width: 50px;
    height: 50px;
    color: var(--lightestVariation);
    font-size: 1.8rem;
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

  @media screen and (max-width: 502px) {
    .lnk {
      width: 40px;
      height: 40px;
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
