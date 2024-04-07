const addFriend = async (userId, friendId) => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/users/friends/add/${userId}/${friendId}`,
      {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message);
    }
    return responseData.userFriends;
  } catch (error) {
    console.log(error);
  }
};

const removeFriend = async (userId, friendId) => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/users/friends/remove/${userId}/${friendId}`,
      {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message);
    }

    console.log(responseData.userFriends);

    return responseData.userFriends;
  } catch (error) {
    console.log(error);
  }
};

export { addFriend, removeFriend };
