
import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";

const Users = () => {

    const loadedUsers = useLoaderData();
    const [users, setUsers] = useState(loadedUsers);


    const handleDeleteUser = _id => {
        console.log('delete', _id);
        fetch(`http://localhost:5000/users/${_id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.deletedCount > 0) {
                    alert('Deleted successfully');
                    const remaining = users.filter(user => user._id !== _id);
                    setUsers(remaining);
                }
            })
    }

    return (
        <div>
            <h2>users: {users.length}</h2>
            <div>
                {
                    users.map(user => <div key={user._id} style={{ border: '2px solid red', margin: 5 }}>
                        <p>Name: {user.name}</p>
                        <p>Email: {user.email}</p>
                        <Link to={`/update/${user._id}`}>
                            <button>Update</button>
                        </Link>
                        <button onClick={() => handleDeleteUser(user._id)}>Delete</button>
                    </div>)
                }
            </div>
        </div>
    );
};

export default Users;