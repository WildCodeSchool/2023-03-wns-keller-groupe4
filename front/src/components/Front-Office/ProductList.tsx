const Product = ({name, skills, id}) => {
    return(
        <article className="card">
            <img src={blank_profile} alt="Jane Doe Profile" />
            <h3>{name}</h3>
            <button onClick={ () => {
                    axios.delete('http://localhost:5000/api/wilder/'+id);
                }
            }>SUPPRIMER</button>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
            </p>
            <h4>Wild Skills</h4>
            <ul className="skills">
                {skills.map((skill) => (
                    <Skill title={skill.skillname} votes={skill.rate} />
                ))}
            </ul>
        </article>
    );
}

export default Wilder;