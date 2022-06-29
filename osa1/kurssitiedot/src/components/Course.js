const Course = (props) => {
    console.log(props)
    return (
      <>
      <Header header={props.course.name} />
      <Content content={props.course.parts} />
      <Total total={props.course.parts} /> 
      </>
    )
  }
  
  const Header = (props) => {
    console.log(props)
    return (
  
          <h1>{props.header} </h1>
    )
  }
  
  const Part = (props) => {
    console.log(props)
    return (
      <div>
      <p>{props.part}</p>
      </div>
    )
  }
  
  const Content = (props) => {
    console.log(props)
    return (
      <div>
      <Part part={props.content.map(parts => 
        <li key ={parts.id}>
          {parts.name} {parts.exercises}
        </li>)} />
      </div>
    )
  }
  
  const Total = (props) => {
    console.log(props)
    return (
      <div>
        <p>
         Number of exercises {props.total.map(total => total.exercises).reduce((pre, cur)=>pre+cur,0)}
         </p>
      </div>
    )
  }

  export default Course