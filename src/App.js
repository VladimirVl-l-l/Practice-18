import React, { useState } from 'react';
import Users from './components/users'
import SearchStatus from './components/searchStatus'
import api from './api';

function App() {
	const [users, setUser] = useState(api.users.fetchAll());
	const handleDelete = (userId) => {
      setUser((newState) => newState.filter((user) => user._id !== userId));
   };
	const handleToggleBookMark = (userId) => {
      const markUser = users.map((user) => {
         if (user._id === userId) {
            user.bookmark = !user.bookmark;
         }
         return user;
      });
      setUser(markUser);
   };
    
	return (
	<div>
		<h1>Fast company</h1>
		<h2>
         <SearchStatus length={users.length} />
      </h2>
		<Users users={users} onDelete={handleDelete} onToggleBookMark={handleToggleBookMark}/>
	</div>
	);
}

export default App;