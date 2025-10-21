function Button() {
    const ButtonClick = () => alert('clicked');

    return (
        <button className="border bg-blue-300 m-5 rounded-md w-50 h-s" onClick={ButtonClick}> Click Me! </button>
    );
}

export default Button;