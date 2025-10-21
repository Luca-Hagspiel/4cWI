function PersonCard({ name, job, gender }: {name:string, job:string, gender:"male" | "female"}) {
    return (
        <div className="Border p-4 m-4 text-center w-60">
            {
                gender == "male" ? (<img src="/images/Male.png"/>)

                : (<img src="/images/Female.png" alt="female"/>)
            }
            <h2 className="font-bold">{name}</h2>
            <p>{job}</p>
        </div>
    );
}

export default PersonCard;
