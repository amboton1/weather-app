import React from 'react';

const UserInput = ({handleUserSubmit, onUserInputChange}) => {
        return (
            <div className="user-info">
                <form onSubmit={handleUserSubmit}>
                    <div className="input-field">
                        <input
                            type="text"
                            placeholder="Enter your name"
                            onChange={onUserInputChange}
                        />
                    </div>
                </form>
            </div>
        );
}

export default UserInput;