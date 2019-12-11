import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from '../components/axiosWithAuth';
import styled from "styled-components";

const MainContainer = styled.div`
    width: 100%;
    display: flex;
    background: lightgreen;
  }
`;

const FriendsContainer = styled.div`
    width: 50%;
    flex-flow: row wrap
  }
`;

const FriendPanel = styled.div`
    width: 30%;
    margin: 10px;
    padding-left: 10px;
    background: yellow;
  }
`;

const NameHeader = styled.h3`

  }
`;

const Friends = () =>
{
    const [friends, setFriends] = useState([]);
    const [friend, setFriend] = useState({name: '', age: '', email: ''})

    useEffect(() => {
        axiosWithAuth()
        .get("/friends")
        .then(res => {
            setFriends(res.data);
        })
        .catch(err => console.log(err.message));
    });

    const handleChange = e => {
        setFriend({ ...friend, [e.target.name]: e.target.value});
    }



    const addFriend = e => {
        e.preventDefault();
            axiosWithAuth()
            .post("/friends", friend)
            .then(res => {
                setFriends(res.data);
            })
            .catch(err => console.log(err.message));
        };

return (
    <MainContainer>
        <FriendsContainer>
        {friends.map((friend) => (
            <>
            <FriendPanel>
                <NameHeader>{friend.name}</NameHeader>
                <div>{friend.age}</div>
                <span>{friend.email}</span>
            </FriendPanel>
            </>
          ))}
        </FriendsContainer>
        <div>
        <form onSubmit={addFriend}>
            <input
              type="text"
              name="name"
              value={friend.name}
              onChange={handleChange}
            />
            <input
              type="text"
              name="age"
              value={friend.age}
              onChange={handleChange}
            />
             <input
              type="text"
              name="email"
              value={friend.email}
              onChange={handleChange}
            />
            <button>Log in</button>
          </form>
        </div>
    </MainContainer>
)
        }

export default Friends;