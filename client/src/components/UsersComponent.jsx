import { styled } from "styled-components";
import AdminSingleUserTasks from "./AdminSingleUserTasks";

const UsersComponent = ({
  _id,
  email,
  name,
  role,
  tasks,
  activeId,
  toggleId,
}) => {
  const isActive = _id === activeId;

  return (
    <Wrapper>
      <div className="top-cap" onClick={() => toggleId(_id)}>
        <h4 style={{ paddingLeft: "20px" }}>{name}</h4>
        <h4
          style={{
            textTransform: "lowercase",
            justifySelf: "end",
            paddingRight: "20px",
          }}
        >
          {email}
        </h4>
      </div>
      {/* style={ someCondition ? { textAlign:'center', paddingTop: '50%'} : {}} */}
      <div className="task" style={isActive ? {} : { display: "none" }}>
        {/* <Link to="admincreatetask" className="lnk">
          +
        </Link> */}
        {tasks.length === 0 ? (
          <h2>No Task</h2>
        ) : (
          tasks.map((task) => {
            return <AdminSingleUserTasks key={task._id} {...task} />;
          })
        )}
      </div>
      <div className="bottom-cap" onClick={() => toggleId(_id)}>
        <h4 style={{ justifySelf: "start", paddingLeft: "20px" }}>
          role: {role}
        </h4>
        <h4 style={{ paddingRight: "20px" }}>
          {tasks.length} {tasks.length > 1 ? "Tasks" : "Task"}
        </h4>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  background: var(--white);
  margin: auto;
  padding-top: 10px;
  padding-bottom: 10px;
  width: 100%;

  .top-cap {
    display: grid;
    grid-template-columns: auto 2fr;
    justify-items: center;
    width: 95%;
    margin: auto;
    padding: 0.3rem;
    background: var(--lightestVariation);
    border-top-right-radius: 50px;
    border-top-left-radius: 50px;
    overflow: hidden;
    cursor: pointer;
  }
  .task {
    width: 95%;
    margin: 0px auto;
    padding: 0px 0px;
  }

  .task h2 {
    text-align: center;
    background: var(--lightestVariation);
    margin-top: 2px;
    margin-bottom: 2px;
  }

  .bottom-cap {
    display: grid;
    grid-template-columns: 1fr auto;
    justify-items: center;
    width: 95%;
    margin: auto;
    padding: 0.3rem;
    background: var(--lightestVariation);
    border-bottom-right-radius: 50px;
    border-bottom-left-radius: 50px;
    overflow: hidden;
    cursor: pointer;
  }
  .bottom-cap:hover {
    box-shadow: var(--shadowMD);
  }
  .top-cap h4,
  .bottom-cap h4 {
    font-size: 1.3rem;
    margin-bottom: 0;
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
    /* position: fixed; */
    z-index: 5;
  }
  .lnk:hover {
    background: var(--darkVariation);
    box-shadow: var(--shadowXLG);
  }

  @media screen and (max-width: 400px) {
  }
`;

export default UsersComponent;
